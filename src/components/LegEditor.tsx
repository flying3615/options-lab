import { useCallback } from 'react'
import type { Strategy, Leg } from '../lib/types'

function toNumber(v: string, fallback = 0) {
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
    <div className="card" style={{ padding: 12 }}>
      <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>
        本页临时调整（不保存，刷新后恢复示例）。可编辑数量、执行价与权利金/成本。
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {strategy.legs.map((leg, i) => (
          <div key={leg.id} style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', border: '1px dashed var(--border)', padding: 8, borderRadius: 6 }}>
            <span className="tag">{leg.kind === 'stock' ? '股票' : `${leg.option?.type.toUpperCase()} 期权`}</span>
            <span className="tag">{leg.position}</span>
            <label style={{ display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}>
              数量
              <input
                type="number"
                step={1}
                min={0}
                value={leg.qty}
                onChange={(e) =>
                  updateLegAt(i, (l) => ({ ...l, qty: Math.max(0, Math.round(toNumber(e.target.value, l.qty))) }))
                }
                style={{ width: 80 }}
              />
            </label>
            {leg.kind === 'option' && (
              <label style={{ display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}>
                执行价
                <input
                  type="number"
                  step={1}
                  value={leg.option?.strike ?? 0}
                  onChange={(e) =>
                    updateLegAt(i, (l) =>
                      l.kind === 'option'
                        ? { ...l, option: { ...l.option!, strike: toNumber(e.target.value, l.option?.strike ?? 0), type: l.option!.type } }
                        : l
                    )
                  }
                  style={{ width: 100 }}
                />
              </label>
            )}
            <label style={{ display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}>
              {leg.kind === 'stock' ? '成本' : '权利金'}
              <input
                type="number"
                step={0.5}
                value={leg.entryPrice ?? 0}
                onChange={(e) =>
                  updateLegAt(i, (l) => ({ ...l, entryPrice: toNumber(e.target.value, l.entryPrice ?? 0) }))
                }
                style={{ width: 100 }}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}