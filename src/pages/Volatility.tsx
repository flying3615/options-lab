import { Link } from 'react-router-dom'

export default function Volatility() {
  return (
    <section>
      <h1>隐含波动率（IV）知识库</h1>
      <p style={{ color: 'var(--muted)' }}>
        本页系统整理 IV 的定义、与历史波动率（HV）的区别、常用衡量指标（IV Rank/Percentile）、期限结构与偏斜（Skew），以及实务中的常见用法与风险提示。
      </p>

      <h2>IV 是什么？</h2>
      <div className="card">
        <ul>
          <li>隐含波动率（Implied Volatility, IV）是市场对“未来波动幅度”的预期，由期权价格通过定价模型反推得到。</li>
          <li>一般而言：IV 高 → 期权更贵；IV 低 → 期权更便宜（其他条件相同）。</li>
          <li>重大事件前（如财报、政策会议）IV 常上升；事件落地后常见“IV 回落”（IV Crush）。</li>
          <li>IV 并非方向判断，而是“未来可能波动程度”的预期强弱。</li>
        </ul>
      </div>

      <h2>IV vs HV（历史波动率）</h2>
      <div className="grid">
        <div className="card">
          <h3>历史波动率（HV）</h3>
          <ul>
            <li>从历史价格序列计算得到，描述“过去”的波动强弱。</li>
            <li>常见口径：过去 20/30/60 天的年化波动率。</li>
          </ul>
        </div>
        <div className="card">
          <h3>隐含波动率（IV）</h3>
          <ul>
            <li>由当前期权价格反推，反映“未来”的市场预期。</li>
            <li>IV 与 HV 的差值可作为“定价偏贵/偏便宜”的直觉参考，但不能单独作为买卖依据。</li>
          </ul>
        </div>
      </div>

      <h2>常用衡量指标</h2>
      <div className="grid">
        <div className="card">
          <h3>IV Rank</h3>
          <ul>
            <li>定义：当前 IV 在过去一段时间（如 1 年）所处的相对位置（0-100）。</li>
            <li>直觉：IV Rank 高 → 当前 IV 相对历史偏高；IV Rank 低 → 相对偏低。</li>
          </ul>
        </div>
        <div className="card">
          <h3>IV Percentile</h3>
          <ul>
            <li>定义：当前 IV 处在历史分布的百分位。</li>
            <li>差别：Percentile 考察“有多少历史样本低于当前值”，与 Rank 口径略不同。</li>
          </ul>
        </div>
      </div>

      <h2>期限结构与偏斜（Term Structure & Skew）</h2>
      <div className="grid">
        <div className="card">
          <h3>期限结构（Term Structure）</h3>
          <ul>
            <li>不同到期日的 IV 通常不同，可能呈现“短期高、长期低”的结构（事件前常见）。</li>
            <li>事件落地后，短期 IV 可能快速回落，长期端相对平稳。</li>
          </ul>
        </div>
        <div className="card">
          <h3>波动率偏斜（Skew/Smile）</h3>
          <ul>
            <li>同一到期日，不同执行价的 IV 常不同，形成“偏斜/微笑”形状。</li>
            <li>股指/单股常见下侧（看跌）IV 更高，因为投资者普遍对下行风险更敏感。</li>
          </ul>
        </div>
      </div>

      <h2>IV Crush（回落）与实务要点</h2>
      <div className="card">
        <ul>
          <li>事件（如财报）前：IV 抬升 → 权利金偏贵；事件后：不确定性消退 → IV 回落，权利金被压缩。</li>
          <li>买方：IV 高时买入可能付出较高时间价值；除非后续波动/IV 继续上升，否则不利。</li>
          <li>卖方：IV 高时卖出更有“价格优势”，但需严格风控以防方向性突破。</li>
          <li>组合策略（如铁鹰/铁蝶）：更依赖时间价值与 IV 回落的收益，但需要合理的保护与止损计划。</li>
        </ul>
      </div>

      <h2>与溢价/溢价率的关系</h2>
      <div className="card">
        <ul>
          <li>IV 越高，期权时间价值越高，通常溢价与溢价率也越高。</li>
          <li>IV 回落会压缩时间价值，使权利金下降（买方不利、卖方有利）。</li>
        </ul>
      </div>

      <h2>继续学习</h2>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
        <Link to="/"><button>返回首页</button></Link>
        <Link to="/basics"><button>期权基础</button></Link>
        <Link to="/strategies"><button>进入策略库</button></Link>
        <Link to="/compare"><button>策略对比</button></Link>
      </div>
    </section>
  )
}