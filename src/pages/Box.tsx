import { useMemo } from 'react'
import { findStrategy } from '../data/strategies'
import PayoffChart from '../components/PayoffChart'
import CompositionSteps from '../components/CompositionSteps'
import SingleLegsChart from '../components/SingleLegsChart'
import MetricsPanel from '../components/MetricsPanel'
import styles from './Box.module.scss'
import './StrategyDetail.module.scss'

export default function Box() {
  const strategy = useMemo(() => findStrategy('box-spread'), [])

  if (!strategy) {
    return (
      <section>
        <h1>策略未找到</h1>
        <p>无效的策略标识</p>
      </section>
    )
  }

  return (
    <div className="detail-layout">
      <div className="main-content">
        <h2>到期盈亏图</h2>
        <PayoffChart strategy={strategy} />

        <MetricsPanel strategy={strategy} />

        <h2>单腿到期盈亏（对照学习）</h2>
        <SingleLegsChart strategy={strategy} />

        <h2>逐步叠加演示</h2>
        <CompositionSteps strategy={strategy} />
      </div>
      <div className="sidebar">
        <h1>{strategy.name}</h1>
        {strategy.description && <p>{strategy.description}</p>}

        {strategy.tags && (
          <p>
            {strategy.tags.map((t) => (
              <span key={t} className={`tag ${styles.tagMargin}`}>{t}</span>
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
          <div className={styles.contentSection}>
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
                {strategy.example}
              </div>
            )}
          </div>
        )}

        <div className={`info-grid ${styles.infoGrid}`}>
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
        </div>

        <div className={styles.notesSection}>
          <h3>⚠️ 专业提示</h3>
          <ul>
            <li>箱形价差是高级策略，通常用于专业套利和对冲。</li>
            <li>理论上的"无风险"在实际交易中会受到交易成本、保证金要求和资金成本的影响。</li>
            <li>在高效市场中，真正的套利机会很少且稍纵即逝。</li>
            <li>需要同时管理多个期权腿，对执行和监控要求较高。</li>
          </ul>
        </div>
      </div>
    </div>
  )
}