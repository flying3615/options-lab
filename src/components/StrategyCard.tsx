import { useNavigate } from 'react-router-dom'
import type { Strategy } from '../lib/types'
import MiniPayoff from './MiniPayoff'

export default function StrategyCard({ s }: { s: Strategy }) {
  const navigate = useNavigate()
  const target = s.knowledgeOnly && s.linkTo ? s.linkTo : `/strategies/${s.id}`
  const goto = () => navigate(target)

  return (
    <div
      className="card strategy-card"
      role="button"
      tabIndex={0}
      onClick={goto}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          goto()
        }
      }}
      aria-label={`查看策略：${s.name}`}
    >
      <h3 className="title">{s.name}</h3>

      {!s.knowledgeOnly && (
        <div className="mini-chart">
          <div className="mini-inner">
            <MiniPayoff strategy={s} />
          </div>
        </div>
      )}

      {s.summary && <p className="summary">{s.summary}</p>}

      {s.tags && (
        <div className="tags">
          {s.tags.slice(0, 3).map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      )}
    </div>
  )
}


