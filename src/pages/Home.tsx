import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section>
      <h1>期权策略演示</h1>
      <p>聚焦组合策略的讲解与可视化演示。进入策略库以浏览常见模板与到期盈亏图，或在对比页叠加观察形状差异。</p>

      <div style={{ display: 'flex', gap: 8, margin: '8px 0 16px', flexWrap: 'wrap' }}>
        <Link to="/strategies"><button>进入策略库</button></Link>
        <Link to="/compare"><button>策略对比</button></Link>
      </div>

      <h2>期权基础</h2>
      <div className="grid">
        <Link to="/basics" style={{ textDecoration: 'none' }}>
          <div className="card" style={{ cursor: 'pointer' }}>
            <h3>期权基础入门</h3>
            <p style={{ marginTop: 8, color: 'var(--muted)' }}>
              点击进入：什么是期权、基本术语、定价要素与直觉。
            </p>
          </div>
        </Link>
        <Link to="/volatility" style={{ textDecoration: 'none' }}>
          <div className="card" style={{ cursor: 'pointer' }}>
            <h3>隐含波动率（IV）</h3>
            <p style={{ marginTop: 8, color: 'var(--muted)' }}>
              点击进入：IV 与 HV 区别、IV Rank/Percentile、期限结构与偏斜、IV Crush 等。
            </p>
          </div>
        </Link>
        <Link to="/premium" style={{ textDecoration: 'none' }}>
          <div className="card" style={{ cursor: 'pointer' }}>
            <h3>溢价与溢价率</h3>
            <p style={{ marginTop: 8, color: 'var(--muted)' }}>
              点击进入：权利金拆解、溢价率/年化溢价率、与 IV 的关系及实务要点。
            </p>
          </div>
        </Link>
      </div>



      <h2>希腊字母速览（直觉版）</h2>
      <div className="grid">
        <div className="card">
          <h3>Delta（方向敏感度）</h3>
          <p>标的价格每变动 1 单位，期权价格平均变动多少。看涨 Delta 为正、看跌为负；接近平值时变化最快。</p>
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>直觉：Delta 越大，越“像持有标的”。</p>
        </div>
        <div className="card">
          <h3>Gamma（Delta 的变化率）</h3>
          <p>标的再变动一点点，Delta 会增加/减少多少。平值附近 Gamma 最大，远实值/虚值较小。</p>
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>直觉：Gamma 决定曲线的“弯曲程度”。</p>
        </div>
        <div className="card">
          <h3>Theta（时间价值衰减）</h3>
          <p>在其他不变时，每过 1 天期权价格期望减少多少。买方通常 Theta 为负、卖方为正。</p>
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>直觉：时间就是成本，越接近到期衰减越快。</p>
        </div>
        <div className="card">
          <h3>Vega（对隐含波动率的敏感度）</h3>
          <p>隐含波动率每上升 1%，期权价格期望变化多少。买波动（Long Vega）受益于波动率上升。</p>
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>直觉：波动率越高，“彩票越贵”。</p>
        </div>
        <div className="card">
          <h3>Rho（对利率的敏感度）</h3>
          <p>利率每上升 1%，期权价格期望变化多少。通常利率上升有利于看涨、相对不利于看跌。</p>
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>直觉：资金成本的变化对期权有边际影响。</p>
        </div>
      </div>

      <p style={{ marginTop: 16, color: 'var(--muted)' }}>
        注：本网站的可视化目前聚焦“到期盈亏”示意（忽略时间价值的动态变化），用于直观看形状与风险边界。
      </p>
    </section>
  )
}
