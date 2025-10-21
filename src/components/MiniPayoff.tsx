import ReactECharts from 'echarts-for-react'
import type { Strategy } from '../lib/types'
import { buildPriceRange, computePayoffCurve } from '../lib/payoff'
import styles from './MiniPayoff.module.scss';

export default function MiniPayoff({ strategy }: { strategy: Strategy }) {
  const prices = buildPriceRange(strategy.referencePrice, 0.25, 101)
  const curve = computePayoffCurve(strategy, prices)
  const option = {
    animation: false,
    grid: { left: 2, right: 2, top: 2, bottom: 2 },
    xAxis: { type: 'value', show: false },
    yAxis: { type: 'value', show: false },
    series: [
      {
        type: 'line', symbol: 'none', lineStyle: { width: 1.5, color: '#2563eb' }, areaStyle: { color: 'rgba(37,99,235,0.10)' },
        data: curve.map((p) => [p.s, p.pnl])
      }
    ]
  }
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ReactECharts 
        option={option} 
        className={styles.chart} 
        style={{ 
          height: '100%', 
          width: '100%',
          maxWidth: '140px',
          margin: '0 auto'
        }} 
      />
    </div>
  )
}
