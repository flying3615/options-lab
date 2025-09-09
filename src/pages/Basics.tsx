import { Link } from 'react-router-dom'

export default function Basics() {
  return (
    <section>
      <h1>期权基础</h1>
      <p style={{ color: 'var(--muted)' }}>
        从“什么是期权”与常见术语出发，形成对期权定价要素与风险/收益结构的直觉认识。
      </p>

      <h2>什么是期权</h2>
      <div className="card">
        <ul>
          <li>期权是一种“权利”，到期前（或到期时）按约定价格买入/卖出标的。</li>
          <li>看涨（Call）：看多上行；看跌（Put）：看空下行或作为下方保险。</li>
          <li>买方支付权利金，最大亏损为保费；卖方收取权利金，承担相应义务与风险。</li>
          <li>一张合约常对应 100 股（合约乘数 100）。</li>
        </ul>
      </div>

      <h2>基本术语</h2>
      <div className="grid">
        <div className="card">
          <h3>执行价（Strike）与到期（Expiry）</h3>
          <ul>
            <li>执行价：行权所用的价格（K）。</li>
            <li>到期：合约失效时间，越近时间价值衰减越快。</li>
          </ul>
        </div>
        <div className="card">
          <h3>内在/时间价值</h3>
          <ul>
            <li>内在价值（Intrinsic）：对买方“立刻行权”的价值。</li>
            <li>时间价值：权利金减去内在价值的部分，随时间流逝（Theta）衰减。</li>
          </ul>
        </div>
        <div className="card">
          <h3>多头/空头（Long/Short）</h3>
          <ul>
            <li>Long：买入权利，支付保费，风险有限。</li>
            <li>Short：卖出权利，收取保费，承担义务与潜在较大风险。</li>
          </ul>
        </div>
        <div className="card">
          <h3>合约乘数与名义金额</h3>
          <ul>
            <li>多数股票期权乘数为 100，名义金额 = 价格 × 乘数 × 张数。</li>
            <li>报价常为“每股”的权利金，结算需乘以乘数与张数。</li>
          </ul>
        </div>
      </div>

      <h2>四种基本单腿（到期维度）</h2>
      <div className="card" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid var(--panel-border)' }}>策略</th>
              <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid var(--panel-border)' }}>方向/暴露</th>
              <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid var(--panel-border)' }}>现金流（开仓）</th>
              <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid var(--panel-border)' }}>最大盈利</th>
              <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid var(--panel-border)' }}>最大亏损</th>
              <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid var(--panel-border)' }}>盈亏平衡点（到期）</th>
              <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid var(--panel-border)' }}>直觉</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: 8, borderBottom: '1px solid var(--panel-border)' }}><strong>买入看涨（Long Call）</strong></td>
              <td style={{ padding: 8, borderBottom: '1px solid var(--panel-border)' }}>看多上行、正 Vega、负 Theta</td>
              <td style={{ padding: 8, borderBottom: '1px solid var(--panel-border)' }}>支付保费</td>
              <td style={{ padding: 8, borderBottom: '1px solid var(--panel-border)' }}>理论无限</td>
              <td style={{ padding: 8, borderBottom: '1px solid var(--panel-border)' }}>保费（有限）</td>
              <td style={{ padding: 8, borderBottom: '1px solid var(--panel-border)' }}>执行价 + 保费/股</td>
              <td style={{ padding: 8, borderBottom: '1px solid var(--panel-border)' }}>用有限成本参与上涨；需足够上行覆盖保费</td>
            </tr>
            <tr>
              <td style={{ padding: 8, borderBottom: '1px solid var(--panel-border)' }}><strong>卖出看涨（Short Call）</strong></td>
              <td style={{ padding: 8, borderBottom: '1px solid var(--panel-border)' }}>看空/中性、负 Vega、正 Theta</td>
              <td style={{ padding: 8, borderBottom: '1px solid var(--panel-border)' }}>收取保费</td>
              <td style={{ padding: 8, borderBottom: '1px solid var(--panel-border)' }}>保费（有限）</td>
              <td style={{ padding: 8, borderBottom: '1px solid var(--panel-border)' }}>理论无限</td>
              <td style={{ padding: 8, borderBottom: '1px solid var(--panel-border)' }}>执行价 + 保费/股</td>
              <td style={{ padding: 8, borderBottom: '1px solid var(--panel-border)' }}>赚时间价值但承受上行无限风险（裸卖风险高）</td>
            </tr>
            <tr>
              <td style={{ padding: 8, borderBottom: '1px solid var(--panel-border)' }}><strong>买入看跌（Long Put）</strong></td>
              <td style={{ padding: 8, borderBottom: '1px solid var(--panel-border)' }}>看空/保护、正 Vega、负 Theta</td>
              <td style={{ padding: 8, borderBottom: '1px solid var(--panel-border)' }}>支付保费</td>
              <td style={{ padding: 8, borderBottom: '1px solid var(--panel-border)' }}>趋近于执行价 − 保费（到 0 时）</td>
              <td style={{ padding: 8, borderBottom: '1px solid var(--panel-border)' }}>保费（有限）</td>
              <td style={{ padding: 8, borderBottom: '1px solid var(--panel-border)' }}>执行价 − 保费/股</td>
              <td style={{ padding: 8, borderBottom: '1px solid var(--panel-border)' }}>为下跌买保险；大跌收益可观，上涨损失保费</td>
            </tr>
            <tr>
              <td style={{ padding: 8 }}><strong>卖出看跌（Short Put）</strong></td>
              <td style={{ padding: 8 }}>看多/中性、负 Vega、正 Theta</td>
              <td style={{ padding: 8 }}>收取保费</td>
              <td style={{ padding: 8 }}>保费（有限）</td>
              <td style={{ padding: 8 }}>执行价 − 0 − 保费（至 0 的下行，有限）</td>
              <td style={{ padding: 8 }}>执行价 − 保费/股</td>
              <td style={{ padding: 8 }}>用承担下行风险换取现金流；可能被指派买入标的</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>继续学习</h2>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
        <Link to="/"><button>返回首页</button></Link>
        <Link to="/strategies"><button>进入策略库</button></Link>
        <Link to="/compare"><button>策略对比</button></Link>
      </div>
    </section>
  )
}