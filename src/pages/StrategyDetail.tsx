import { useMemo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { findStrategy } from '../data/strategies'
import PayoffChart from '../components/PayoffChart'
import CompositionSteps from '../components/CompositionSteps'
import SingleLegsChart from '../components/SingleLegsChart'
import MetricsPanel from '../components/MetricsPanel'
import LegEditor from '../components/LegEditor'


// 重构 StrategyDetail.tsx： 创建一个名为 detail-layout 的外层容器。 在该容器内，创建左右两个子容器：main-content 和 sidebar。 左侧 main-content 将包含：到期盈亏图、指标面板、参数编辑器、单腿分解图和叠加步骤图。 右侧 sidebar 将包含：策略名称、标签、描述、组成腿、概念、示例、优缺点、风险提示等所有文字说明内容。 更新 App.css： 我会添加新的CSS规则来支持这个 detail-layout 布局，确保左右分栏能正确显示。
export default function StrategyDetail() {
  const { id } = useParams()
  const strategy = useMemo(() => (id ? findStrategy(id) : undefined), [id])
  const [draft, setDraft] = useState(strategy)
  useEffect(() => { setDraft(strategy) }, [strategy])
  const s = draft ?? strategy

  if (!s) {
    return (
      <section>
        <h1>策略未找到</h1>
        <p>无效的策略标识：{id}</p>
      </section>
    )
  }

  return (
    <section>
      <h1>{s.name}</h1>
      {s.description && <p>{s.description}</p>}

      {s.tags && (
        <p>
          {s.tags.map((t) => (
            <span key={t} className="tag" style={{ marginRight: 8 }}>{t}</span>
          ))}
        </p>
      )}

      <h2>组成腿</h2>
      <ul>
        {s.legs.map((leg) => (
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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
        <h2 style={{ margin: 0 }}>即时编辑（临时）</h2>
        <div>
          <button onClick={() => setDraft(strategy!)} disabled={!strategy}>重置示例</button>
        </div>
      </div>
      <LegEditor strategy={s} onChange={setDraft} />

      {(s.concept || s.formula || s.example) && (
        <div style={{ marginTop: 16 }}>
          {s.concept && (
            <div>
              <h2>概念易懂版</h2>
              <p>{s.concept}</p>
            </div>
          )}
          {s.formula && s.formula.length > 0 && (
            <div>
              <h2>关键公式/逻辑</h2>
              <ul>
                {s.formula.map((f) => (
                  <li key={f}><strong>{f}</strong></li>
                ))}
              </ul>
            </div>
          )}
          {s.example && (
            <div>
              <h2>举例</h2>
              {s.example}
            </div>
          )}
        </div>
      )}

      <h2>到期盈亏图</h2>
      <PayoffChart strategy={s} />

      <MetricsPanel strategy={s} />

      <h2>单腿到期盈亏（对照学习）</h2>
      <SingleLegsChart strategy={s} />

      <h2>逐步叠加演示</h2>
      <CompositionSteps strategy={s} />

      {s.stepNotes && s.stepNotes.length > 0 && (
        <div>
          <ul>
            {s.stepNotes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
        {s.suitableFor && (
          <div>
            <h3>适用场景</h3>
            <ul>{s.suitableFor.map((x) => (<li key={x}>{x}</li>))}</ul>
          </div>
        )}
        {s.pros && (
          <div>
            <h3>优点</h3>
            <ul>{s.pros.map((x) => (<li key={x}>{x}</li>))}</ul>
          </div>
        )}
        {s.cons && (
          <div>
            <h3>缺点</h3>
            <ul>{s.cons.map((x) => (<li key={x}>{x}</li>))}</ul>
          </div>
        )}
        {s.risks && (
          <div>
            <h3>风险提示</h3>
            <ul>{s.risks.map((x) => (<li key={x}>{x}</li>))}</ul>
          </div>
        )}
      </div>
    </section>
  )
}


