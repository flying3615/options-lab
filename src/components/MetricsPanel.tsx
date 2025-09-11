import type { Strategy } from '../lib/types'
import { buildPriceRange, computeMetrics } from '../lib/payoff'
import { useChartPrefs } from '../lib/store'

interface Props {
  strategy: Strategy
  title?: string
}

function formatMoney(n?: number): string {
  if (n === undefined) return '—'
  return new Intl.NumberFormat('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)
}

export default function MetricsPanel({ strategy, title = '策略核心指标' }: Props) {
  const { spanPct, steps } = useChartPrefs()
  const prices = buildPriceRange(strategy.referencePrice, spanPct, steps)
  const { breakEvens, maxProfit, maxLoss, netPremium } = computeMetrics(strategy, prices)

  return (
    <div className="card" style={{ padding: 12 }}>
      <h3 style={{ margin: '0 0 12px' }}>{title}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <div style={{ fontSize: 14, color: 'var(--text-primary)' }}>建仓成本/收入</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>负数为支出, 正数为收入</div>
          <div style={{ fontWeight: 700, fontSize: 16, color: netPremium >= 0 ? 'var(--accent)' : 'var(--danger)' }}>
            {formatMoney(netPremium)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 14, color: 'var(--text-primary)' }}>最大利润</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>理论上的收益上限</div>
          <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--accent)' }}>{formatMoney(maxProfit)}</div>
        </div>
        <div>
          <div style={{ fontSize: 14, color: 'var(--text-primary)' }}>最大亏损</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>你最多可能损失的金额</div>
          <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--danger)' }}>{formatMoney(maxLoss)}</div>
        </div>
        <div>
          <div style={{ fontSize: 14, color: 'var(--text-primary)' }}>盈亏平衡点</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>到期时打平的价格</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {breakEvens.length === 0 ? (
              <span style={{ color: 'var(--muted)', fontSize: 14 }}>—</span>
            ) : (
              breakEvens.map((x) => (
                <span key={x} className="tag" style={{ fontSize: 14 }}>{x}</span>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}