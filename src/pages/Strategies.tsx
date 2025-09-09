import { useMemo } from 'react'
import { strategies } from '../data/strategies'
import StrategyCard from '../components/StrategyCard'

type Group = { name: string; items: typeof strategies }

/** 仅按方向分组：看多 / 看空 / 中性 */
function classify(name: string, tags?: string[]): '看多' | '看空' | '中性' {
  const text = `${name} ${(tags ?? []).join(' ')}`
  const has = (kw: string) => text.includes(kw)
  // 优先命中显式方向词与常见别名
  if (has('看多') || has('牛市')) return '看多'
  if (has('看空') || has('熊市')) return '看空'
  // 其余默认归为中性（含中性/区间/波动率/收权利金等）
  return '中性'
}

export default function Strategies() {
  const groups = useMemo<Group[]>(() => {
    const map = new Map<string, typeof strategies>()
    for (const s of strategies) {
      const g = classify(s.name, s.tags)
      if (!map.has(g)) map.set(g, [] as any)
      map.get(g)!.push(s)
    }
    const order: Array<'看多' | '看空' | '中性'> = ['看多', '看空', '中性']
    return order.filter((g) => map.has(g)).map((g) => ({ name: g, items: map.get(g)! }))
  }, [])

  return (
    <section>
      <h1>策略库</h1>

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


