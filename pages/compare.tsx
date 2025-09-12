import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { strategies } from '../src/data/strategies'
import type { Strategy } from '../src/lib/types'
import MultiPayoffChart from '../src/components/MultiPayoffChart'
import MetricsPanel from '../src/components/MetricsPanel'
import { useCompareIds, useInitFromSearch, useSetCompare, useSwapCompare } from '../src/lib/store'
import styles from './Compare.module.scss';

export default function Compare() {
  const router = useRouter()
  const initFromSearch = useInitFromSearch()
  const setCompare = useSetCompare()
  const swap = useSwapCompare()
  const [aId, bId] = useCompareIds()
  const allIds = useMemo(() => strategies.map((s) => s.id), [])

  // 初始化：从 URL ?a= & ?b= 读取
  useEffect(() => {
    if (router.isReady) {
      const search = '?' + new URLSearchParams(router.query as Record<string, string>).toString()
      initFromSearch(search, allIds)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, allIds.join('|')])

  // 若均为空，默认选择前两个策略
  useEffect(() => {
    if (aId === null && bId === null && strategies.length >= 2) {
      setCompare(0, strategies[0].id)
      setCompare(1, strategies[1].id)
    }
  }, [aId, bId, setCompare])

  // 选择变更时同步 URL
  useEffect(() => {
    const query = { ...router.query }
    if (aId) {
      query.a = aId
    } else {
      delete query.a
    }
    if (bId) {
      query.b = bId
    } else {
      delete query.b
    }
    router.push({ query }, undefined, { shallow: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aId, bId])

  const a = useMemo(() => strategies.find((s) => s.id === aId) || null, [aId])
  const b = useMemo(() => strategies.find((s) => s.id === bId) || null, [bId])

  const selected = useMemo(
    () => [a, b].filter(Boolean) as Strategy[],
    [a, b]
  )

  return (
    <section>
      <h1>策略对比</h1>
      <div className="controls">
        <label>策略 A：</label>
        <select
          value={aId ?? ''}
          onChange={(e) => setCompare(0, e.target.value || null)}
        >
          <option value="">未选择</option>
          {strategies.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <label>策略 B：</label>
        <select
          value={bId ?? ''}
          onChange={(e) => setCompare(1, e.target.value || null)}
        >
          <option value="">未选择</option>
          {strategies.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <button onClick={() => swap()}>交换 A/B</button>
        <button onClick={() => setCompare(1, null)}>清空 B</button>
        <button onClick={() => {
          setCompare(0, strategies[0]?.id ?? null)
          setCompare(1, strategies[1]?.id ?? null)
        }}>重置</button>
      </div>

      <MultiPayoffChart strategies={selected} />

      <div className={`metrics-grid ${styles.metricsGrid}`}>
        {a && <MetricsPanel strategy={a} title="A：关键指标" />}
        {b && <MetricsPanel strategy={b} title="B：关键指标" />}
      </div>
    </section>
  )
}
