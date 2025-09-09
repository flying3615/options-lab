import ReactECharts from 'echarts-for-react'
import type { Strategy } from '../lib/types'
import { buildPriceRange, computePayoffCurve } from '../lib/payoff'

export default function SingleLegsChart({ strategy }: { strategy: Strategy }) {
  const prices = buildPriceRange(strategy.referencePrice, 0.3, 201)

  const series = strategy.legs.map((leg) => ({
    name: `${leg.kind === 'stock' ? 'Stock' : leg.option?.type.toUpperCase()} ${leg.position}`,
    type: 'line',
    symbol: 'none',
    data: computePayoffCurve({ ...strategy, legs: [leg] }, prices).map((p) => [p.s, p.pnl]),
    lineStyle: { width: 1.5, opacity: 0.9 },
  }))

  const option = {
    tooltip: { trigger: 'axis' },
    legend: { top: 0, textStyle: { color: '#334155' } },
    grid: { left: 40, right: 20, top: 40, bottom: 40 },
    xAxis: { type: 'value', name: '标的价格', axisLine: { lineStyle: { color: '#94a3b8' } }, axisLabel: { color: '#334155' }, splitLine: { lineStyle: { color: 'rgba(0,0,0,0.06)' } } },
    yAxis: { type: 'value', name: '到期盈亏', axisLine: { lineStyle: { color: '#94a3b8' } }, axisLabel: { color: '#334155' }, splitLine: { lineStyle: { color: 'rgba(0,0,0,0.06)' } } },
    series
  }

  return <ReactECharts option={option} style={{ height: 300 }} />
}


