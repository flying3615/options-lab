import { Link } from 'react-router-dom'
import GlossaryTooltip from '../components/GlossaryTooltip'

export default function Basics() {
  return (
    <section>
      <h1>欢迎来到期权的世界！</h1>
      <p style={{ color: 'var(--muted)' }}>
        别担心，期权没有那么复杂。在这里，我们将从最基础的概念出发，带你一步步揭开它的面纱。
      </p>

      <h2>第一步：理解核心概念</h2>
      <div className="card">
        <h3>什么是期权？</h3>
        <p>
          你可以把
          <GlossaryTooltip term="期权 (Option)">期权</GlossaryTooltip>
          想象成一张“优惠券”。这张优惠券给你在未来某个特定时间（
          <GlossaryTooltip term="到期日 (Expiration Date)">到期日</GlossaryTooltip>
          ），以一个特定价格（
          <GlossaryTooltip term="执行价 (Strike Price)">执行价</GlossaryTooltip>
          ），买入或卖出某样东西（比如股票）的“权利”，但不是“义务”。
        </p>
        <ul>
          <li>
            <strong><GlossaryTooltip term="看涨期权 (Call)">看涨期权 (Call)</GlossaryTooltip></strong>
            ：一张允许你“买入”的优惠券，当你认为价格会涨的时候使用。
          </li>
          <li>
            <strong><GlossaryTooltip term="看跌期权 (Put)">看跌期权 (Put)</GlossaryTooltip></strong>
            ：一张允许你“卖出”的优惠券，当你认为价格会跌的时候使用。
          </li>
        </ul>
        <p>就像优惠券有有效期一样，期权也有。理解这一点，你就已经掌握了期权最核心的秘密！</p>
      </div>

      <h2>第二步：从四个基础策略开始</h2>
      <p>所有复杂的期权策略，都是由四个基础操作演变而来的。我们为你准备了详细的入门解读：</p>
      <div className="grid">
        <div className="card">
          <h3><Link to={"/strategies/long-call"}>买入看涨期权 (Long Call)</Link></h3>
          <p>
            这是最纯粹的看涨方式。如果你坚信一支股票会大涨，这是一个用较小成本（
            <GlossaryTooltip term="权利金 (Premium)">权利金</GlossaryTooltip>
            ）博取巨大收益的理想工具。风险可控，收益无限。
          </p>
          <p><Link to={"/strategies/long-call"} className="button">学习 Long Call策略 &rarr;</Link></p>
        </div>
        <div className="card">
          <h3><Link to={"/strategies/long-put"}>买入看跌期权 (Long Put)</Link></h3>
          <p>最纯粹的看跌或保护方式。如果你认为一支股票会大跌，或者想为你的持仓买一份“保险”，它能帮你从价格下跌中获利。 </p>
          <p><Link to={"/strategies/long-put"} className="button">学习 Long Put策略 &rarr;</Link></p>
        </div>
        <div className="card">
          <h3><Link to={"/strategies/covered-call"}>备兑看涨期权 (Covered Call)</Link></h3>
          <p>如果你手里有股票，并觉得它短期内不会大涨，可以试试这个策略。它就像把股票“租”出去，帮你持续创造额外收入。</p>
          <p><Link to={"/strategies/covered-call"} className="button">学习 Covered Call策略 &rarr;</Link></p>
        </div>
        <div className="card">
          <h3><Link to={"/strategies/protective-put"}>保护性看跌期权 (Protective Put)</Link></h3>
          <p>担心你持有的股票会突然下跌？这个策略就是为你量身定做的“资产保险”，它能在不放弃未来上涨潜力的前提下，保护你的资产。</p>
          <p><Link to={"/strategies/protective-put"} className="button">学习 Protective Put策略 &rarr;</Link></p>
        </div>
      </div>

      <h2>第三步：探索更多</h2>
      <p>当你掌握了这四个基础后，就可以开始探索更广阔的期权世界了。</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
        <Link to="/strategies"><button>进入策略库</button></Link>
        <Link to="/compare"><button>对比不同策略</button></Link>
        <Link to="/builder"><button>自由构建你的策略</button></Link>
      </div>
    </section>
  )
}