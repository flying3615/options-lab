import { useEffect, useState } from 'react'
import ReactDOMServer from 'react-dom/server';
import { strategies as allStrategies, findStrategy } from '../../src/data/strategies'
import type { Strategy } from '../../src/lib/types'
import PayoffChart from '../../src/components/PayoffChart'
import CompositionSteps from '../../src/components/CompositionSteps'
import SingleLegsChart from '../../src/components/SingleLegsChart'
import MetricsPanel from '../../src/components/MetricsPanel'
import LegEditor from '../../src/components/LegEditor'
import styles from '../StrategyDetail.module.scss';

export default function StrategyDetail({ strategy, exampleHtml }: { strategy: Omit<Strategy, 'example'>, exampleHtml: string | null }) {
  const [draft, setDraft] = useState(strategy)
  useEffect(() => { setDraft(strategy) }, [strategy])
  const s = draft ?? strategy

  if (!s) {
    return (
      <section>
        <h1>策略未找到</h1>
      </section>
    )
  }

  return (
    <div className="detail-layout">
      <div className="main-content">
        <h2>到期盈亏图</h2>
        <PayoffChart strategy={s} />

        <MetricsPanel strategy={s} />

        <div className={styles.editHeader}>
          <h2 className={styles.editTitle}>即时编辑（临时）</h2>
          <div>
            <button onClick={() => setDraft(strategy!)} disabled={!strategy}>重置示例</button>
          </div>
        </div>
        <LegEditor strategy={s} onChange={setDraft} />

        <h2>单腿到期盈亏（对照学习）</h2>
        <SingleLegsChart strategy={s} />

        <h2>逐步叠加演示</h2>
        <CompositionSteps strategy={s} />
      </div>
      <div className="sidebar">
        <h1>{s.name}</h1>
        {s.description && <p>{s.description}</p>}

        {s.tags && (
          <p>
            {s.tags.map((t) => (
              <span key={t} className={`tag ${styles.tagMargin}`}>{t}</span>
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

        {(s.concept || s.formula || exampleHtml) && (
          <div className={styles.contentSection}>
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
            {exampleHtml && (
              <div>
                <h2>举例</h2>
                <div dangerouslySetInnerHTML={{ __html: exampleHtml }} />
              </div>
            )}
          </div>
        )}

        {s.stepNotes && s.stepNotes.length > 0 && (
          <div>
            <ul>
              {s.stepNotes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </div>
        )}

        <div className={`info-grid ${styles.infoGrid}`}>
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
      </div>
    </div>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export async function getStaticPaths({ locales }: { locales: string[] }) {
  const paths = [];
  for (const locale of locales) {
    for (const s of allStrategies) {
      paths.push({
        params: { id: s.id },
        locale,
      });
    }
  }

  return { paths, fallback: false }
}

// eslint-disable-next-line react-refresh/only-export-components
export async function getStaticProps({ params }: { params: { id: string }}) {
  const strategy = findStrategy(params.id)

  if (!strategy) {
    return {
      notFound: true,
    }
  }

  const exampleHtml = strategy.example ? ReactDOMServer.renderToString(strategy.example) : null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { example, ...rest } = strategy;
  return {
    props: {
      strategy: rest,
      exampleHtml,
    },
  }
}