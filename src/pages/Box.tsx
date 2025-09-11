import { Link } from 'react-router-dom';

export default function Box() {
  return (
    <section>
      <h1>箱形价差 / 转换（Box Spread / Conversion）</h1>
      <p style={{ color: 'var(--muted)' }}>
        由看涨/看跌价差组合而成，到期价值理论上等于两执行价差距（忽略成本与资金利率）。常见于锁定价差或做套利的专业应用。
      </p>

      <h2>构成方式（到期维度）</h2>
      <div className="card">
        <ul>
          <li><strong>多头箱形（Long Box）：</strong>买入牛市价差（Call Bull） + 买入熊市价差（Put Bear）。到期价值 ≈ K<sub>high</sub> − K<sub>low</sub>。</li>
          <li><strong>空头箱形（Short Box）：</strong>相反构成。到期价值 ≈ −(K<sub>high</sub> − K<sub>low</sub>)。</li>
          <li><strong>转换 / 反向转换（Conversion / Reverse Conversion）：</strong>通过持有标的 + 期权腿复制同等现金流（本站以期权教学为主，侧重 box 直觉）。</li>
        </ul>
      </div>

      <h2>直觉</h2>
      <div className="card">
        <ul>
          <li>Box 到期价值与标的最终价格无关，仅与执行价差有关。</li>
          <li>当实际建仓现金流与理论价值偏离，可能存在“锁定”空间（实务需考虑交易成本、资金成本、保证金与流动性）。</li>
          <li>策略用于套利/对冲/锁定敞口的专业场景，通常不作为普通方向性交易工具。</li>
        </ul>
      </div>

      <h2>示例（教学数值，仅演示形态）</h2>
      <div className="card">
        <ul>
          <li>K<sub>low</sub>=100，K<sub>high</sub>=105，理论到期价值≈5×乘数；若建仓净现金支出 &lt; 5×乘数（含成本），理论存在锁定空间。</li>
          <li>本站“策略库”中该卡片为知识卡片，不绘制到期盈亏图。</li>
        </ul>
      </div>

      <h2>注意事项</h2>
      <div className="card">
        <ul>
          <li>忽略佣金/滑点/借贷利率的“理论等值”在实盘中未必成立；需严谨评估实际资金成本与保证金。</li>
          <li>不同市场与到期结构下，腿的可得性与流动性差异较大。</li>
        </ul>
      </div>

      <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Link to="/strategies"><button>返回策略库</button></Link>
        <Link to="/"><button>返回首页</button></Link>
      </div>
    </section>
  )
}