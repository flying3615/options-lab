import { useMemo, useState } from 'react'
import { strategies } from '../data/strategies'
import StrategyCard from '../components/StrategyCard'
import { loadUserStrategies } from '../lib/userStrategies'

type Group = { name: string; items: typeof strategies }
type GroupingMode = 'outlook' | 'difficulty'

/** 按方向分组 */
function classifyByOutlook(name: string, tags?: string[]): '看多' | '看空' | '中性' {
  const text = `${name} ${(tags ?? []).join(' ')}`
  const has = (kw: string) => text.includes(kw)
  if (has('看多') || has('牛市')) return '看多'
  if (has('看空') || has('熊市')) return '看空'
  return '中性'
}

/** 按难度分组 */
function classifyByDifficulty(tags?: string[]): '新手入门' | '中级策略' | '高级策略' {
  const text = (tags ?? []).join(' ')
  const has = (kw: string) => text.includes(kw)
  if (has('新手入门')) return '新手入门'
  if (has('高级')) return '高级策略'
  return '中级策略'
}

export default function Strategies() {
  const [groupingMode, setGroupingMode] = useState<GroupingMode>('outlook')

  const groups = useMemo<Group[]>(() => {
    const map = new Map<string, typeof strategies>()

    if (groupingMode === 'outlook') {
      for (const s of strategies) {
        const g = classifyByOutlook(s.name, s.tags)
        if (!map.has(g)) map.set(g, [] as any)
        map.get(g)!.push(s)
      }
      const order: Array<'看多' | '看空' | '中性'> = ['看多', '看空', '中性']
      const out: Group[] = order
        .filter((g) => map.has(g))
        .map((g) => ({ name: g as string, items: map.get(g)! } as Group))
      return out
    } else {
      for (const s of strategies) {
        const g = classifyByDifficulty(s.tags)
        if (!map.has(g)) map.set(g, [] as any)
        map.get(g)!.push(s)
      }
      const order: Array<'新手入门' | '中级策略' | '高级策略'> = ['新手入门', '中级策略', '高级策略']
      const out: Group[] = order
        .filter((g) => map.has(g))
        .map((g) => ({ name: g as string, items: map.get(g)! } as Group))
      return out
    }
  }, [groupingMode])

  // 用户自定义策略（始终显示在最前）
  const userStrategiesGroup = useMemo<Group | null>(() => {
    const mine = loadUserStrategies()
    if (mine.length) {
      return { name: '我的策略', items: mine as any }
    }
    return null
  }, [])

  return (
    <section>
      <h1>策略库</h1>
      <p style={{ margin: '8px 0 16px', color: '#667085', fontSize: 13 }}>
        说明：本页所有策略示例均以标的当前价格 100 元为基准（S0=100），用于统一展示与对比。
      </p>

      <div className="tabs" style={{ marginBottom: 16 }}>
        <button className={groupingMode === 'outlook' ? 'active' : ''} onClick={() => setGroupingMode('outlook')}>按方向分组</button>
        <button className={groupingMode === 'difficulty' ? 'active' : ''} onClick={() => setGroupingMode('difficulty')}>按难度分组</button>
      </div>

      {userStrategiesGroup && (
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ marginTop: 8 }}>{userStrategiesGroup.name}</h2>
          <div className="grid">
            {userStrategiesGroup.items.map((s) => (
              <StrategyCard key={s.id} s={s} />
            ))}
          </div>
        </div>
      )}

      {groups.map((g) => (
        <div key={g.name} style={{ marginBottom: 16 }}>
          <h2 style={{ marginTop: 8 }}>{g.name}</h2>
          <div className="grid">
            {g.items.map((s) => (
              <StrategyCard key={s.id} s={s} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}