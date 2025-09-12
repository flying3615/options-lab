import ReactECharts from 'echarts-for-react'
import type { Strategy } from '../lib/types'
import { buildPriceRange, computeMetrics } from '../lib/payoff'
import styles from './PayoffChart.module.scss';

interface Props {
  strategy: Strategy
}

export default function PayoffChart({ strategy }: Props) {
  const prices = buildPriceRange(strategy.referencePrice, 0.3, 201)
  const { curve, breakEvens } = computeMetrics(strategy, prices)

  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: function(params: { value: [number, number] }[]) {
        const point = params[0];
        const price = point.value[0].toFixed(2);
        const pnlValue = point.value[1];
        const color = pnlValue >= 0 ? '#22c55e' : '#ef4444';
        const pnl = pnlValue.toFixed(2);
        return `
          <div style="font-size: 12px;">
            <div>股价: <strong>${price}</strong></div>
            <div>盈亏: <strong style="color: ${color};">${pnl}</strong></div>
          </div>
        `;
      }
    },
    grid: { left: 40, right: 20, top: 30, bottom: 40 },
    xAxis: { type: 'value', name: '标的价格', axisLine: { lineStyle: { color: '#94a3b8' } }, axisLabel: { color: '#334155' }, splitLine: { lineStyle: { color: 'rgba(0,0,0,0.06)' } } },
    yAxis: { type: 'value', name: '到期盈亏', axisLine: { lineStyle: { color: '#94a3b8' } }, axisLabel: { color: '#334155' }, splitLine: { lineStyle: { color: 'rgba(0,0,0,0.06)' } } },
    series: [
      {
        name: '组合到期盈亏',
        type: 'line',
        symbol: 'none',
        data: curve.map((p) => [p.s, p.pnl]),
        lineStyle: { width: 2, color: '#2563eb' },
        areaStyle: {
          color: 'rgba(37,99,235,0.10)'
        }
      },
      ...breakEvens.map((x) => ({
        name: '盈亏平衡点',
        type: 'line',
        markLine: {
          silent: true,
          symbol: 'none',
          lineStyle: { type: 'dashed', color: 'rgba(0,0,0,0.35)' },
          data: [{ xAxis: x }]
        }
      }))
    ]
  }

  return <ReactECharts option={option} className={styles.chart} />
}


