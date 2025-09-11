import { useState } from 'react'
import type { Strategy, Leg, LegKind, Position, OptionType } from '../lib/types'
import PayoffChart from '../components/PayoffChart'
import SingleLegsChart from '../components/SingleLegsChart'
import MetricsPanel from '../components/MetricsPanel'
import { upsertUserStrategy, loadUserStrategies, removeUserStrategy } from '../lib/userStrategies'
import styles from './Builder.module.scss';

function genLegId(prefix = 'leg'): string {
  return prefix + '-' + Math.random().toString(36).slice(2, 8)
}

const defaultRef = 100

function emptyStrategy(): Strategy {
  return {
    id: 'user-temp',
    name: '自定义策略',
    referencePrice: defaultRef,
    legs: []
  }
}

export default function Builder() {
  const [draft, setDraft] = useState<Strategy>(emptyStrategy())
  const [message, setMessage] = useState<string | null>(null)
  const [saved, setSaved] = useState<Strategy[]>(loadUserStrategies())


  function addStock(position: Position = 'long') {
    setDraft((d) => ({
      ...d,
      legs: [
        ...d.legs,
        { id: genLegId('stk'), kind: 'stock', position, qty: position === 'long' ? 100 : 100, entryPrice: defaultRef }
      ]
    }))
  }

  function addOption(position: Position, type: OptionType, strike = defaultRef, entryPrice = 1, qty = 1) {
    setDraft((d) => ({
      ...d,
      legs: [
        ...d.legs,
        {
          id: genLegId('opt'),
          kind: 'option',
          position,
          qty,
          multiplier: 100,
          entryPrice,
          option: { type, strike }
        }
      ]
    }))
  }

  function updateLeg(idx: number, updater: (l: Leg) => Leg) {
    setDraft((d) => ({ ...d, legs: d.legs.map((l, i) => (i === idx ? updater(l) : l)) }))
  }

  function removeLeg(idx: number) {
    setDraft((d) => ({ ...d, legs: d.legs.filter((_, i) => i !== idx) }))
  }

  function reset() {
    setDraft(emptyStrategy())
    setMessage(null)
  }

  function refreshSaved() {
    setSaved(loadUserStrategies())
  }

  function save() {
    const savedOne = upsertUserStrategy(draft)
    setDraft(savedOne)
    setMessage('已保存到本地（localStorage），ID：' + savedOne.id)
    refreshSaved()
    setTimeout(() => setMessage(null), 3000)
  }

  return (
    <section>
      <h1>策略构建器</h1>
      <p className={styles.muted}>说明：此处可自由组合“股票腿/期权腿”，实时预览到期盈亏。保存仅写入浏览器 localStorage（不上传）。</p>

      <div className={`card ${styles.cardPadding}`}>
        <div className={styles.controls}>
          <label>
            名称：
            <input
              type="text"
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              className={styles.inputName}
            />
          </label>
          <label>
            基准价（S0）：
            <input
              type="number"
              step={1}
              value={draft.referencePrice}
              onChange={(e) => setDraft({ ...draft, referencePrice: Number(e.target.value) || defaultRef })}
              className={styles.inputRef}
            />
          </label>
          <div className={styles.controlsRight}>
            <button onClick={reset}>重置</button>
            <button onClick={save} className="primary">保存</button>
          </div>
        </div>
        {message && <div className={styles.message}>{message}</div>}

        <div className={styles.savedSection}>
          <h3 className={styles.savedTitle}>已保存的策略（本地）</h3>
          {saved.length === 0 ? (
            <p className={styles.savedEmpty}>暂无已保存策略。</p>
          ) : (
            <div className={styles.savedGrid}>
              {saved.map((it) => (
                <div key={it.id} className={`card ${styles.savedCard}`}>
                  <div>
                    <div className={styles.savedName}>{it.name}</div>
                    <div className={styles.savedId}>ID: {it.id}</div>
                  </div>
                  <div className={styles.savedButtons}>
                    <button onClick={() => setDraft(it)}>载入</button>
                    <button onClick={() => { removeUserStrategy(it.id); refreshSaved(); }} className={styles.savedDelete}>删除</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={`card ${styles.cardPadding}`}>
        <div className={styles.addButtons}>
          <button onClick={() => addStock('long')}>添加 股票 多头</button>
          <button onClick={() => addStock('short')}>添加 股票 空头</button>
          <span className={styles.divider} />
          <button onClick={() => addOption('long', 'call', draft.referencePrice, 3)}>添加 买入 看涨</button>
          <button onClick={() => addOption('short', 'call', draft.referencePrice + 5, 2)}>添加 卖出 看涨</button>
          <button onClick={() => addOption('long', 'put', draft.referencePrice, 3)}>添加 买入 看跌</button>
          <button onClick={() => addOption('short', 'put', draft.referencePrice - 5, 2)}>添加 卖出 看跌</button>
        </div>
      </div>

      <h2>组成腿</h2>
      {draft.legs.length === 0 ? (
        <p className={styles.legsEmpty}>尚未添加腿。使用上方按钮快速添加，或在此处编辑每条腿的参数。</p>
      ) : (
        <div className={styles.legsSection}>
          {draft.legs.map((leg, i) => (
            <div key={leg.id} className={`card ${styles.legCard}`}>
              <label className={styles.label}>
                类型
                <select
                  value={leg.kind}
                  onChange={(e) => {
                    const nextKind = e.target.value as LegKind
                    updateLeg(i, (l) => {
                      if (nextKind === 'stock') {
                        return { id: l.id, kind: 'stock', position: l.position, qty: l.qty || 100, entryPrice: l.entryPrice ?? draft.referencePrice }
                      }
                      // option
                      return {
                        id: l.id,
                        kind: 'option',
                        position: l.position,
                        qty: l.qty || 1,
                        multiplier: l.multiplier ?? 100,
                        entryPrice: l.entryPrice ?? 1,
                        option: { type: (l.kind === 'option' ? l.option?.type : 'call') as OptionType, strike: l.kind === 'option' ? (l.option?.strike ?? draft.referencePrice) : draft.referencePrice }
                      }
                    })
                  }}
                >
                  <option value="stock">股票</option>
                  <option value="option">期权</option>
                </select>
              </label>

              <label className={styles.label}>
                方向
                <select
                  value={leg.position}
                  onChange={(e) => updateLeg(i, (l) => ({ ...l, position: e.target.value as Position }))}
                >
                  <option value="long">long（买入）</option>
                  <option value="short">short（卖出）</option>
                </select>
              </label>

              <label className={styles.label}>
                数量
                <input
                  type="number"
                  step={1}
                  min={0}
                  value={leg.qty}
                  onChange={(e) => updateLeg(i, (l) => ({ ...l, qty: Math.max(0, Math.round(Number(e.target.value) || 0)) }))}
                />
              </label>

              {leg.kind === 'option' && (
                <label className={styles.label}>
                  类型
                  <select
                    value={leg.option?.type ?? 'call'}
                    onChange={(e) => updateLeg(i, (l) => (l.kind === 'option' ? { ...l, option: { ...(l.option ?? { strike: draft.referencePrice, type: 'call' as OptionType }), type: e.target.value as OptionType } } : l))}
                  >
                    <option value="call">Call（看涨）</option>
                    <option value="put">Put（看跌）</option>
                  </select>
                </label>
              )}

              {leg.kind === 'option' && (
                <label className={styles.label}>
                  执行价
                  <input
                    type="number"
                    step={1}
                    value={leg.option?.strike ?? draft.referencePrice}
                    onChange={(e) => updateLeg(i, (l) => (l.kind === 'option' ? { ...l, option: { ...(l.option as any), strike: Number(e.target.value) || draft.referencePrice } } : l))}
                  />
                </label>
              )}

              <label className={styles.label}>
                {leg.kind === 'stock' ? '成本' : '权利金'}
                <input
                  type="number"
                  step={0.5}
                  value={leg.entryPrice ?? 0}
                  onChange={(e) => updateLeg(i, (l) => ({ ...l, entryPrice: Number(e.target.value) || 0 }))}
                />
              </label>

              {leg.kind === 'option' && (
                <label className={styles.label}>
                  乘数
                  <input
                    type="number"
                    step={1}
                    min={1}
                    value={leg.multiplier ?? 100}
                    onChange={(e) => updateLeg(i, (l) => (l.kind === 'option' ? { ...l, multiplier: Math.max(1, Math.round(Number(e.target.value) || 100)) } : l))}
                  />
                </label>
              )}

              <div className={styles.deleteButton}>
                <button onClick={() => removeLeg(i)} className={styles.savedDelete}>删除此腿</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2>到期盈亏图</h2>
      <PayoffChart strategy={draft} />

      <div className={`metrics-grid ${styles.metricsGrid}`}>
        <MetricsPanel strategy={draft} title="关键指标（预览）" />
      </div>

      <h2>单腿到期盈亏（辅助学习）</h2>
      <SingleLegsChart strategy={draft} />
    </section>
  )
}