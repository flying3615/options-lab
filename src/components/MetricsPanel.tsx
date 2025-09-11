import type { Strategy } from '../lib/types'
import { buildPriceRange, computeMetrics } from '../lib/payoff'
import { useChartPrefs } from '../lib/store'
import styles from './MetricsPanel.module.scss';

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
    <div className={`card ${styles.card}`}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.grid}>
        <div>
          <div className={styles.label}>建仓成本/收入</div>
          <div className={styles.subLabel}>负数为支出, 正数为收入</div>
          <div className={`${styles.value} ${netPremium >= 0 ? styles.netPremium : styles.netPremiumLoss}`}>
            {formatMoney(netPremium)}
          </div>
        </div>
        <div>
          <div className={styles.label}>最大利润</div>
          <div className={styles.subLabel}>理论上的收益上限</div>
          <div className={`${styles.value} ${styles.maxProfit}`}>{formatMoney(maxProfit)}</div>
        </div>
        <div>
          <div className={styles.label}>最大亏损</div>
          <div className={styles.subLabel}>你最多可能损失的金额</div>
          <div className={`${styles.value} ${styles.maxLoss}`}>{formatMoney(maxLoss)}</div>
        </div>
        <div>
          <div className={styles.label}>盈亏平衡点</div>
          <div className={styles.subLabel}>到期时打平的价格</div>
          <div className={styles.breakEven}>
            {breakEvens.length === 0 ? (
              <span className={styles.breakEvenNone}>—</span>
            ) : (
              breakEvens.map((x) => (
                <span key={x} className={`tag ${styles.breakEvenTag}`}>{x}</span>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}