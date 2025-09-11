import ReactECharts from 'echarts-for-react'
import type { Strategy } from '../lib/types'
import { buildPriceRange, computeMetrics } from '../lib/payoff'
import { useChartPrefs } from '../lib/store'
import styles from './MultiPayoffChart.module.scss';

export default function MultiPayoffChart({ strategies }: { strategies: Strategy[] }) {
  const { spanPct, steps } = useChartPrefs()
  if (!strategies || strategies.length === 0) return null

  const center =
    strategies.reduce((sum, s) => sum + (s.referencePrice ?? 0), 0) / strategies.length || 100
  const prices = buildPriceRange(center, spanPct, steps)

  const colors = ['#2563eb', '#7c3aed']
  const area = ['rgba(37,99,235,0.10)', 'rgba(124,58,237,0.10)']

  const series = strategies.map((s, idx) => {
    const { curve } = computeMetrics(s, prices)
    return {
      name: s.name,
      type: 'line',
      symbol: 'none',
      data: curve.map((p) => [p.s, p.pnl]),
      lineStyle: { width: 2, color: colors[idx % colors.length] },
      areaStyle: { color: area[idx % area.length] }
    }
  })

  const option = {
    tooltip: { trigger: 'axis' },
    legend: { top: 0, textStyle: { color: '#334155' } },
    grid: { left: 40, right: 20, top: 40, bottom: 40 },
    xAxis: {
      type: 'value',
      name: '标的价格',
      axisLine: { lineStyle: { color: '#94a3b8' } },
      axisLabel: { color: '#334155' },
      splitLine: { lineStyle: { color: 'rgba(0,0,0,0.06)' } }
    },
    yAxis: {
      type: 'value',
      name: '到期盈亏',
      axisLine: { lineStyle: { color: '#94a3b8' } },
      axisLabel: { color: '#334155' },
      splitLine: { lineStyle: { color: 'rgba(0,0,0,0.06)' } }
    },
    series
  }

  return <ReactECharts option={option} className={styles.chart} />
}