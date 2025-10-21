import { useCallback } from 'react'
import type { Strategy, Leg } from '../lib/types'
import styles from './LegEditor.module.scss';

function toNumber(v: string, fallback = 0) {
  if (v === '' || v === undefined) return NaN
  const n = parseFloat(v)
  return Number.isFinite(n) ? n : fallback
}

interface Props {
  strategy: Strategy
  onChange: (next: Strategy) => void
}

export default function LegEditor({ strategy, onChange }: Props) {
  const updateLegAt = useCallback((idx: number, fn: (l: Leg) => Leg) => {
    const nextLegs = strategy.legs.map((l, i) => (i === idx ? fn(l) : l))
    onChange({ ...strategy, legs: nextLegs })
  }, [strategy, onChange])

  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.note}>
        本页临时调整（不保存，刷新后恢复示例）。可编辑数量、执行价与权利金/成本。
      </div>
      <div className={styles.legsContainer}>
        {strategy.legs.map((leg, i) => (
          <div key={leg.id} className={styles.legRow}>
            <span className="tag">{leg.kind === 'stock' ? '股票' : `${leg.option?.type.toUpperCase()} 期权`}</span>
            <span className="tag">{leg.position}</span>
            <label className={styles.label}>
              数量
              <input
                type="number"
                step={1}
                min={0}
                value={leg.qty}
                onFocus={(e) => e.target.select()}
                onChange={(e) =>
                  updateLegAt(i, (l) => ({ ...l, qty: Math.max(0, Math.round(toNumber(e.target.value, l.qty))) }))
                }
                className={styles.qtyInput}
              />
            </label>
            {leg.kind === 'option' && (
              <label className={styles.label}>
                执行价
                <input
                  type="number"
                  step={1}
                  value={leg.option?.strike ?? 0}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) =>
                    updateLegAt(i, (l) =>
                      l.kind === 'option'
                        ? { ...l, option: { ...l.option!, strike: toNumber(e.target.value, l.option?.strike ?? 0), type: l.option!.type } }
                        : l
                    )
                  }
                  className={styles.strikeInput}
                />
              </label>
            )}
            <label className={styles.label}>
              {leg.kind === 'stock' ? '成本' : '权利金'}
              <input
                type="number"
                step={0.5}
                value={leg.entryPrice ?? 0}
                onFocus={(e) => e.target.select()}
                onChange={(e) =>
                  updateLegAt(i, (l) => ({ ...l, entryPrice: toNumber(e.target.value, l.entryPrice ?? 0) }))
                }
                className={styles.premiumInput}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}