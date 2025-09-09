import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { findStrategy } from '../data/strategies'
import PayoffChart from '../components/PayoffChart'
import CompositionSteps from '../components/CompositionSteps'
import SingleLegsChart from '../components/SingleLegsChart'
import MetricsPanel from '../components/MetricsPanel'

export default function StrategyDetail() {
  const { id } = useParams()
  const strategy = useMemo(() => (id ? findStrategy(id) : undefined), [id])

  if (!strategy) {
    return (
      <section>
        <h1>策略未找到</h1>
        <p>无效的策略标识：{id}</p>
      </section>
    )
  }

  return (
    <section>
      <h1>{strategy.name}</h1>
      {strategy.description && <p>{strategy.description}</p>}

      {strategy.tags && (
        <p>
          {strategy.tags.map((t) => (
            <span key={t} className="tag" style={{ marginRight: 8 }}>{t}</span>
          ))}
        </p>
      )}

      <h2>组成腿</h2>
      <ul>
        {strategy.legs.map((leg) => (
          <li key={leg.id}>
            {leg.kind === 'stock' ? (
              <span>
                股票 | {leg.position} | 数量 <strong>{leg.qty}</strong> | 成本 <strong>{leg.entryPrice}</strong>
              </span>
            ) : (
              <span>
                期权 | {leg.position} {leg.option?.type.toUpperCase()} | 执行价 {leg.option?.strike} | 数量 <strong>{leg.qty}</strong> | 权利金 <strong>{leg.entryPrice}</strong>
              </span>
            )}
          </li>
        ))}
      </ul>

      

      

      {(strategy.concept || strategy.formula || strategy.example) && (
        <div style={{ marginTop: 16 }}>
          {strategy.concept && (
            <div>
              <h2>概念易懂版</h2>
              <p>{strategy.concept}</p>
            </div>
          )}
          {strategy.formula && strategy.formula.length > 0 && (
            <div>
              <h2>关键公式/逻辑</h2>
              <ul>
                {strategy.formula.map((f) => (
                  <li key={f}><strong>{f}</strong></li>
                ))}
              </ul>
            </div>
          )}
          {strategy.example && (
            <div>
              <h2>举例</h2>
              <p><strong>{strategy.example}</strong></p>
            </div>
          )}
        </div>
      )}

      <h2>到期盈亏图</h2>
      <PayoffChart strategy={strategy} />

      <MetricsPanel strategy={strategy} />

      <h2>单腿到期盈亏（对照学习）</h2>
      <SingleLegsChart strategy={strategy} />

      <h2>逐步叠加演示</h2>
      <CompositionSteps strategy={strategy} />

      {strategy.stepNotes && strategy.stepNotes.length > 0 && (
        <div>
          <ul>
            {strategy.stepNotes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
        {strategy.suitableFor && (
          <div>
            <h3>适用场景</h3>
            <ul>{strategy.suitableFor.map((x) => (<li key={x}>{x}</li>))}</ul>
          </div>
        )}
        {strategy.pros && (
          <div>
            <h3>优点</h3>
            <ul>{strategy.pros.map((x) => (<li key={x}>{x}</li>))}</ul>
          </div>
        )}
        {strategy.cons && (
          <div>
            <h3>缺点</h3>
            <ul>{strategy.cons.map((x) => (<li key={x}>{x}</li>))}</ul>
          </div>
        )}
        {strategy.risks && (
          <div>
            <h3>风险提示</h3>
            <ul>{strategy.risks.map((x) => (<li key={x}>{x}</li>))}</ul>
          </div>
        )}
      </div>
    </section>
  )
}


