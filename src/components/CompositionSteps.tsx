import { useMemo, useState, useEffect } from 'react'
import ReactECharts from 'echarts-for-react'
import type { Strategy } from '../lib/types'
import { buildPriceRange, computePayoffCurve } from '../lib/payoff'
import styles from './CompositionSteps.module.scss';

interface Props {
  strategy: Strategy
}

export default function CompositionSteps({ strategy }: Props) {
  const [step, setStep] = useState(1)
  const [mode, setMode] = useState<'single' | 'cumulative'>('single')
  const prices = useMemo(() => buildPriceRange(strategy.referencePrice, 0.3, 201), [strategy.referencePrice])
  const partials = useMemo(
    () => strategy.legs.map((_, i) => ({ name: `Step ${i + 1}`, legs: strategy.legs.slice(0, i + 1) })),
    [strategy.legs]
  )

  // 保证 step 在腿数量变化时被夹在 [1, legs.length]，避免回退/前进后无法恢复
  useEffect(() => {
    setStep((s) => Math.min(Math.max(1, s), strategy.legs.length || 1))
  }, [strategy.legs.length])

  const series = useMemo(() => {
    if (mode === 'single') {
      const p = partials[step - 1]
      return [
        {
          name: p.name,
          type: 'line',
          symbol: 'none',
          data: computePayoffCurve({ ...strategy, legs: p.legs }, prices).map((x) => [x.s, x.pnl]),
          lineStyle: { width: 2, color: '#2563eb' },
          areaStyle: { color: 'rgba(37,99,235,0.08)' }
        }
      ]
    }
    // cumulative
    return partials.slice(0, step).map((p, idx) => ({
      name: p.name,
      type: 'line',
      symbol: 'none',
      data: computePayoffCurve({ ...strategy, legs: p.legs }, prices).map((x) => [x.s, x.pnl]),
      lineStyle: { width: idx === step - 1 ? 2 : 1, opacity: idx === step - 1 ? 1 : 0.6 }
    }))
  }, [mode, step, partials, prices, strategy])

  const option = useMemo(
    () => ({
      tooltip: { trigger: 'axis' },
      legend: { top: 0, textStyle: { color: '#334155' }, show: mode !== 'single' },
      grid: { left: 40, right: 20, top: 40, bottom: 40 },
      xAxis: { type: 'value', name: '标的价格', axisLine: { lineStyle: { color: '#94a3b8' } }, axisLabel: { color: '#334155' }, splitLine: { lineStyle: { color: 'rgba(0,0,0,0.06)' } } },
      yAxis: { type: 'value', name: '到期盈亏', axisLine: { lineStyle: { color: '#94a3b8' } }, axisLabel: { color: '#334155' }, splitLine: { lineStyle: { color: 'rgba(0,0,0,0.06)' } } },
      series
    }),
    [mode, series]
  )

  const note = strategy.stepNotes && strategy.stepNotes[step - 1]

  return (
    <div>
      <div className={styles.controls}>
        <button onClick={() => setStep((s) => Math.max(1, s - 1))}>上一步</button>
        <button onClick={() => setStep((s) => Math.min(strategy.legs.length, s + 1))}>下一步</button>
        <span>步骤：{step} / {strategy.legs.length}</span>
        <span className={styles.stepInfo}>显示模式：</span>
        <button onClick={() => setMode('single')} className={mode === 'single' ? styles.modeButton : ''}>单步</button>
        <button onClick={() => setMode('cumulative')} className={mode === 'cumulative' ? styles.modeButton : ''}>累积</button>
      </div>
      {note && <p className={styles.note}>{note}</p>}
      <ReactECharts
        option={option}
        className={styles.chart}
        notMerge={true}
        key={`${mode}-${step}-${strategy.legs.length}`}
      />
    </div>
  )
}


