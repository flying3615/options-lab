import { Link } from 'react-router-dom'

export default function Premium() {
  return (
    <section>
      <h1>溢价与溢价率</h1>
      <p style={{ color: 'var(--muted)' }}>
        本页梳理期权“权利金”的组成与如何用“溢价率/年化溢价率”做横向比较，并结合隐含波动率（IV）给出实务提示。
      </p>

      <h2>权利金的拆解</h2>
      <div className="card">
        <ul>
          <li>权利金（期权价格） = 内在价值（Intrinsic） + 时间价值（Time Value）。</li>
          <li>溢价（Premium，狭义）= 时间价值 = 权利金 - 内在价值。</li>
          <li>内在价值：买方“此刻行权”能获得的价值；其余为时间价值。</li>
          <li>到期越近，时间价值衰减（Theta）越快；远期合约时间价值通常更高。</li>
        </ul>
      </div>

      <h2>溢价率（相对成本）</h2>
      <div className="grid">
        <div className="card">
          <h3>定义与直觉</h3>
          <ul>
            <li>溢价率 ≈ 权利金 / 标的价格 × 100%（用于不同执行价/到期的相对成本比较）。</li>
            <li>溢价率越高，买方需要更大的波动或更长的时间才“划算”。</li>
            <li>卖方收取的权利金占用更高比例时（其他条件相同）相对更“丰厚”，但也意味着更高的被指派/突破风险。</li>
          </ul>
        </div>
        <div className="card">
          <h3>年化溢价率（粗估）</h3>
          <ul>
            <li>年化溢价率 ≈ 收到保费 / 占用资金 × 年化（仅做粗估）。</li>
            <li>“占用资金”需结合保证金或名义金额实际情况；不同券商/品种差异显著。</li>
            <li>仅看年化不够：还需结合方向风险、IV、事件、流动性与滑点等因素。</li>
          </ul>
        </div>
      </div>

      <h2>与 IV 的关系</h2>
      <div className="grid">
        <div className="card">
          <h3>IV ↑ → 溢价率往往 ↑</h3>
          <ul>
            <li>IV 越高，时间价值越高，权利金与溢价率通常也更高。</li>
            <li>事件落地后“IV Crush”会压缩溢价，买方受损、卖方受益（若未被方向性突破）。</li>
          </ul>
        </div>
        <div className="card">
          <h3>搭配指标</h3>
          <ul>
            <li>IV Rank/Percentile 用于判断当前 IV 相对历史高低位置。</li>
            <li>结合期限结构与 Skew：短期事件前高 IV、下侧看跌偏斜常见。</li>
          </ul>
        </div>
      </div>

      <h2>实务要点</h2>
      <div className="card">
        <ul>
          <li>买方：倾向选择较低溢价率/较低 IV 的时段或合约；若判断 IV 将上升，Vega 正暴露受益。</li>
          <li>卖方：倾向在 IV 较高、溢价率较高时收取保费，但需有风控（保护腿、止损、仓位控制）。</li>
          <li>期限与执行价：到期时间、价内/价外程度都会显著影响溢价与溢价率。</li>
          <li>实盘需考虑：手续费、滑点、融资/保证金、流动性与指派风险等。</li>
        </ul>
      </div>

      <h2>继续学习</h2>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
        <Link to="/"><button>返回首页</button></Link>
        <Link to="/volatility"><button>隐含波动率（IV）</button></Link>
        <Link to="/basics"><button>期权基础</button></Link>
        <Link to="/strategies"><button>进入策略库</button></Link>
      </div>
    </section>
  )
}