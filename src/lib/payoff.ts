import type { Leg, PayoffPoint, Strategy } from './types'

function getMultiplier(leg: Leg): number {
  if (leg.kind === 'option') return leg.multiplier ?? 100
  return leg.multiplier ?? 1
}

function roundTo(value: number, decimals = 2): number {
  const p = Math.pow(10, decimals)
  const n = Math.round((value + Number.EPSILON) * p) / p
  return Object.is(n, -0) ? 0 : n
}

function payoffLegAtExpiry(leg: Leg, s: number): number {
  const m = getMultiplier(leg)
  const sign = leg.position === 'long' ? 1 : -1

  if (leg.kind === 'stock') {
    const cost = leg.entryPrice ?? 0
    // 多头：收益 = (S - 成本)；空头：收益 = (成本 - S)
    const perShare = leg.position === 'long' ? s - cost : cost - s
    return perShare * leg.qty * m
  }

  // option
  const k = leg.option!.strike
  const premium = leg.entryPrice ?? 0

  if (leg.option!.type === 'call') {
    const intrinsic = Math.max(s - k, 0)
    return (sign * intrinsic - premium * sign) * leg.qty * m
  } else {
    const intrinsic = Math.max(k - s, 0)
    return (sign * intrinsic - premium * sign) * leg.qty * m
  }
}

export function payoffStrategyAtExpiry(strategy: Strategy, s: number): number {
  return strategy.legs.reduce((acc, leg) => acc + payoffLegAtExpiry(leg, s), 0)
}

export function buildPriceRange(center: number, spanPct = 0.3, steps = 201): number[] {
  const min = Math.max(0, center * (1 - spanPct))
  const max = center * (1 + spanPct)
  const arr: number[] = []
  for (let i = 0; i < steps; i++) {
    arr.push(min + (i * (max - min)) / (steps - 1))
  }
  return arr
}

export function computePayoffCurve(strategy: Strategy, prices: number[]): PayoffPoint[] {
  return prices.map((s) => ({ s: roundTo(s, 2), pnl: roundTo(payoffStrategyAtExpiry(strategy, s), 2) }))
}

export function estimateBreakEvens(curve: PayoffPoint[]): number[] {
  const results: number[] = []
  const eps = 1e-8
  const sign = (x: number) => (Math.abs(x) <= eps ? 0 : x > 0 ? 1 : -1)

  for (let i = 1; i < curve.length; i++) {
    const a = curve[i - 1]
    const b = curve[i]
    const sa = sign(a.pnl)
    const sb = sign(b.pnl)

    // 同号或都为 0：不产生新的盈亏平衡点
    if (sa === sb) continue

    // 其中一个恰好为 0，另一个非 0：记录该 0 点的价格
    if (sa === 0 && sb !== 0) {
      results.push(roundTo(a.s, 2))
      continue
    }
    if (sb === 0 && sa !== 0) {
      results.push(roundTo(b.s, 2))
      continue
    }

    // 一正一负：线性插值寻找交点
    const t = Math.abs(a.pnl) / (Math.abs(a.pnl) + Math.abs(b.pnl))
    const x = a.s + (b.s - a.s) * t
    results.push(roundTo(x, 2))
  }
  return dedupeSorted(results)
}

function dedupeSorted(arr: number[], eps = 1e-6): number[] {
  const out: number[] = []
  for (const x of arr) {
    if (out.length === 0 || Math.abs(out[out.length - 1] - x) > eps) out.push(x)
  }
  return out
}

export function computeMetrics(strategy: Strategy, prices: number[]): { curve: PayoffPoint[]; breakEvens: number[]; maxProfit?: number; maxLoss?: number; netPremium: number } {
  const curve = computePayoffCurve(strategy, prices)
  let min = Infinity
  let max = -Infinity
  for (const p of curve) {
    if (p.pnl < min) min = p.pnl
    if (p.pnl > max) max = p.pnl
  }
  // 估算净权利金：把所有 option leg 的 entryPrice * qty * multiplier 汇总（多头为支出，空头为收入）
  const netPremium = strategy.legs.reduce((sum, leg) => {
    const m = leg.kind === 'option' ? getMultiplier(leg) : 1
    const price = leg.entryPrice ?? 0
    const dir = leg.position === 'long' ? -1 : 1 // 购买支出为负，卖出收入为正
    return sum + dir * price * leg.qty * m
  }, 0)
  const breakEvens = estimateBreakEvens(curve)
  // 有些策略风险无限，max/min 仅在观察区间内。
  return { curve, breakEvens, maxProfit: isFinite(max) ? max : undefined, maxLoss: isFinite(min) ? min : undefined, netPremium }
}


