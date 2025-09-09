import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { buildPriceRange } from '../lib/payoff'

type OptType = 'call' | 'put'

function intrinsic(opt: OptType, s: number, k: number): number {
  return opt === 'call' ? Math.max(s - k, 0) : Math.max(k - s, 0)
}

/**
 * 示意模型（近月到期时点 T1 的可视化）：
 * - 近月：到期价值 = intrinsicNear(s)
 * - 远月：以“下界/上界/自定义”三种近似绘制：
 *   下界 r=0：V_far = intrinsicFar(s)
 *   上界 r=1：V_far = intrinsicFar(s) + farPrem
 *   自定义 r∈[0,1]：V_far = intrinsicFar(s) + r * farPrem
 * - 初始净成本 = farPrem - nearPrem（默认 1 张 × 100 乘数）
 * - PnL_r(s) = V_far_r(s)*m - intrinsicNear(s)*m - (farPrem - nearPrem)*m
 */
function buildCurves(
  opt: OptType,
  k: number,
  nearPrem: number,
  farPrem: number,
  r: number,
  sCenter: number,
  m = 100,
  span = 0.3,
  steps = 201
) {
  const xs = buildPriceRange(sCenter, span, steps)
  const series = {
    r0: [] as [number, number][],
    r1: [] as [number, number][],
    r: [] as [number, number][],
  }
  const netDebit = (farPrem - nearPrem) * m
  for (const s of xs) {
    const near = intrinsic(opt, s, k)
    const far_intr = intrinsic(opt, s, k)
    const V0 = far_intr // r=0
    const V1 = far_intr + farPrem // r=1
    const Vr = far_intr + r * farPrem // custom r

    const pnl0 = V0 * m - near * m - netDebit
    const pnl1 = V1 * m - near * m - netDebit
    const pnlr = Vr * m - near * m - netDebit

    series.r0.push([s, pnl0])
    series.r1.push([s, pnl1])
    series.r.push([s, pnlr])
  }
  return { xs, series }
}

export default function Calendar() {
  const [opt, setOpt] = useState<OptType>('call')
  const [k, setK] = useState(100)
  const [s0, setS0] = useState(100)
  const [nearPrem, setNearPrem] = useState(2)
  const [farPrem, setFarPrem] = useState(4)
  const [r, setR] = useState(0.5)
  const [m, setM] = useState(100)

  const { series } = useMemo(
    () => buildCurves(opt, k, nearPrem, farPrem, r, s0, m),
    [opt, k, nearPrem, farPrem, r, s0, m]
  )

  const option = useMemo(
    () => ({
      tooltip: { trigger: 'axis' },
      legend: { top: 0, textStyle: { color: '#334155' } },
      grid: { left: 40, right: 20, top: 40, bottom: 40 },
      xAxis: {
        type: 'value',
        name: '标的价格（近月到期时）',
        axisLine: { lineStyle: { color: '#94a3b8' } },
        axisLabel: { color: '#334155' },
        splitLine: { lineStyle: { color: 'rgba(0,0,0,0.06)' } },
      },
      yAxis: {
        type: 'value',
        name: '组合盈亏（近月到期时）',
        axisLine: { lineStyle: { color: '#94a3b8' } },
        axisLabel: { color: '#334155' },
        splitLine: { lineStyle: { color: 'rgba(0,0,0,0.06)' } },
      },
      series: [
        {
          name: '下界 r=0（仅内在）',
          type: 'line',
          symbol: 'none',
          lineStyle: { width: 1.5, color: '#9ca3af' },
          areaStyle: { color: 'rgba(156,163,175,0.10)' },
          data: series.r0,
        },
        {
          name: `自定义 r=${r.toFixed(2)}`,
          type: 'line',
          symbol: 'none',
          lineStyle: { width: 2, color: '#2563eb' },
          areaStyle: { color: 'rgba(37,99,235,0.08)' },
          data: series.r,
        },
        {
          name: '上界 r=1（内在+初始远月保费）',
          type: 'line',
          symbol: 'none',
          lineStyle: { width: 1.5, color: '#7c3aed' },
          areaStyle: { color: 'rgba(124,58,237,0.08)' },
          data: series.r1,
        },
      ],
    }),
    [series.r0, series.r, series.r1, r]
  )

  return (
    <section>
      <h1>日历价差（Calendar Spread）</h1>
      <p style={{ color: 'var(--muted)' }}>
        示例：同一执行价、不同到期。此处演示“近月到期时”的组合盈亏示意。
        远月在近月到期时仍有剩余时间价值，使用 r∈[0,1] 作为“剩余时间价值系数”进行简化可视化。
      </p>

      <div className="card" style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <label>方向：</label>
          <select value={opt} onChange={(e) => setOpt(e.target.value as OptType)}>
            <option value="call">看涨日历（Call Calendar）</option>
            <option value="put">看跌日历（Put Calendar）</option>
          </select>

          <label>执行价 K：</label>
          <input type="number" value={k} onChange={(e) => setK(Number(e.target.value))} style={{ width: 90 }} />

          <label>参考价 S0：</label>
          <input type="number" value={s0} onChange={(e) => setS0(Number(e.target.value))} style={{ width: 90 }} />

          <label>近月保费：</label>
          <input type="number" value={nearPrem} onChange={(e) => setNearPrem(Number(e.target.value))} style={{ width: 90 }} />

          <label>远月保费：</label>
          <input type="number" value={farPrem} onChange={(e) => setFarPrem(Number(e.target.value))} style={{ width: 90 }} />

          <label>乘数：</label>
          <input type="number" value={m} onChange={(e) => setM(Number(e.target.value))} style={{ width: 90 }} />

          <label>剩余时间价值 r：</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={r}
            onChange={(e) => setR(Number(e.target.value))}
            style={{ width: 160 }}
          />
          <span>{r.toFixed(2)}</span>
        </div>
      </div>

      <ReactECharts option={option} style={{ height: 360 }} />

      <div className="grid" style={{ marginTop: 12 }}>
        <div className="card">
          <h3>解释与假设</h3>
          <ul>
            <li>自定义曲线（蓝色）：V_far ≈ 内在 + r × 远月初始保费；r=0 为“仅内在”，r=1 为“内在+远月初始保费”。</li>
            <li>初始净成本 = 远月保费 − 近月保费（默认 1 张 × 乘数）。</li>
            <li>该模型用于教学可视化，非定价模型；真实结果依赖于到期结构与隐含波动率变化。</li>
          </ul>
        </div>
        <div className="card">
          <h3>继续学习</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
            <Link to="/volatility"><button>隐含波动率</button></Link>
            <Link to="/premium"><button>溢价与溢价率</button></Link>
            <Link to="/strategies"><button>策略库</button></Link>
          </div>
        </div>
      </div>
    </section>
  )
}