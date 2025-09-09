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

export default function MetricsPanel({ strategy, title = '关键指标' }: Props) {
  const { spanPct, steps } = useChartPrefs()
  const prices = buildPriceRange(strategy.referencePrice, spanPct, steps)
  const { breakEvens, maxProfit, maxLoss, netPremium } = computeMetrics(strategy, prices)

  return (
    <div className="card" style={{ padding: 12 }}>
      <h3 style={{ margin: '0 0 8px' }}>{title}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>净权利金（仅期权）</div>
          <div style={{ fontWeight: 700, color: netPremium >= 0 ? 'var(--accent)' : 'var(--danger)' }}>
            {formatMoney(netPremium)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>盈亏平衡点</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {breakEvens.length === 0 ? (
              <span style={{ color: 'var(--muted)', fontSize: 12 }}>—</span>
            ) : (
              breakEvens.map((x) => (
                <span key={x} className="tag" style={{ fontSize: 12 }}>{x}</span>
              ))
            )}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>区间内最大盈利</div>
          <div style={{ fontWeight: 700, color: 'var(--accent)' }}>{formatMoney(maxProfit)}</div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>区间内最大亏损</div>
          <div style={{ fontWeight: 700, color: 'var(--danger)' }}>{formatMoney(maxLoss)}</div>
        </div>
      </div>
    </div>
  )
}