import { useMemo, useState } from 'react'
import { strategies } from '../data/strategies'
import StrategyCard from '../components/StrategyCard'
import { loadUserStrategies } from '../lib/userStrategies'
import styles from './Strategies.module.scss';

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

/** 按策略内在复杂度（期权腿数量）进行分组 */
function classifyByDifficulty(s: { id: string; legs: any[] }): '新手入门' | '中级策略' | '高级策略' {
  // 特例：某些策略虽然腿数不多，但概念上属于高级
  if (s.id === 'box-spread' || s.id === 'calendar-spread') {
    return '高级策略'
  }

  const legs = s.legs?.length ?? 0
  if (legs <= 1) return '新手入门'
  if (legs === 2) return '中级策略'
  return '高级策略'
}

export default function Strategies() {
  const [groupingMode, setGroupingMode] = useState<GroupingMode>('outlook')

  const groups = useMemo<Group[]>(() => {
    const map = new Map<string, typeof strategies>()

    if (groupingMode === 'outlook') {
      for (const s of strategies) {
        const g = classifyByOutlook(s.name, s.tags)
        if (!map.has(g)) map.set(g, [])
        map.get(g)!.push(s)
      }
      const order: Array<'看多' | '看空' | '中性'> = ['看多', '看空', '中性']
      const out: Group[] = order
        .filter((g) => map.has(g))
        .map((g) => ({ name: g as string, items: map.get(g)! } as Group))
      return out
    } else {
      for (const s of strategies) {
        const g = classifyByDifficulty(s)
        if (!map.has(g)) map.set(g, [])
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
      return { name: '我的策略', items: mine }
    }
    return null
  }, [])

  return (
    <section>
      <h1>策略库</h1>
      <p className={styles.description}>浏览我们精心挑选和分类的多种期权策略，或创建并保存您自己的策略。</p>

      <div className={`tabs ${styles.tabs}`}>
        <button className={groupingMode === 'outlook' ? 'active' : ''} onClick={() => setGroupingMode('outlook')}>按方向分组</button>
        <button className={groupingMode === 'difficulty' ? 'active' : ''} onClick={() => setGroupingMode('difficulty')}>按难度分组</button>
      </div>

      {userStrategiesGroup && (
        <div className={styles.userGroupContainer}>
          <h2 className={styles.groupHeader}>{userStrategiesGroup.name}</h2>
          <div className="grid">
            {userStrategiesGroup.items.map((s) => (
              <StrategyCard key={s.id} s={s} />
            ))}
          </div>
        </div>
      )}

      {groups.map((g) => (
        <div key={g.name} className={styles.groupContainer}>
          <h2 className={styles.groupHeader}>{g.name}</h2>
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