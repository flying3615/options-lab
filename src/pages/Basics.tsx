import { Link } from 'react-router-dom'
import GlossaryTooltip from '../components/GlossaryTooltip'

export default function Basics() {
  return (
    <section>
      <h1>欢迎来到期权的世界！</h1>
      <p style={{ color: 'var(--muted)' }}>
        别担心，期权没有想象中那么复杂。在这里，我们将用最简单的比喻，带你一步步揭开它的面纱。
      </p>

      <h2>第一步：理解核心概念</h2>
      <div className="card">
        <h3>什么是期权？一张“未来的优惠券”</h3>
        <p>
          你可以把
          <GlossaryTooltip term="期权 (Option)">期权</GlossaryTooltip>
          想象成一张“优惠券”或“预售券”。这张券给你在未来某个特定时间（
          <GlossaryTooltip term="到期日 (Expiration Date)">到期日</GlossaryTooltip>
          ），以一个约定好的价格（
          <GlossaryTooltip term="执行价 (Strike Price)">执行价</GlossaryTooltip>
          ），买入或卖出某样东西（比如股票）的“权利”。
        </p>
        <p>
          关键在于，这仅仅是一个“权利”，而不是“义务”。就像你有一张汉堡优惠券，如果汉堡店的现价远高于你的券面价，你会很乐意使用它；但如果现价更便宜，你可以选择不用，优惠券过期作废，你损失的只是买券的钱。
        </p>
        <ul>
          <li>
            <strong><GlossaryTooltip term="看涨期权 (Call)">看涨期权 (Call)</GlossaryTooltip></strong>
            ：一张允许你“买入”的优惠券，当你认为价格会涨的时候使用。好比一张“低价购房券”。
          </li>
          <li>
            <strong><GlossaryTooltip term="看跌期权 (Put)">看跌期权 (Put)</GlossaryTooltip></strong>
            ：一张允许你“卖出”的优惠券，当你认为价格会跌的时候使用。好比一张“高价回收券”或“财产保险单”。
          </li>
        </ul>
        <p>理解“权利而非义务”这一点，你就已经掌握了期权最核心的秘密！</p>
      </div>

      <h2>第二步：认识交易双方：买方与卖方</h2>
      <div className="grid">
        <div className="card">
          <h3>买方 (Long)</h3>
          <p>支付一笔费用（<GlossaryTooltip term="权利金 (Premium)">权利金</GlossaryTooltip>），获得权利。他们是风险的承担者，但风险被锁定在所支付的权利金范围内。</p>
          <ul>
            <li><strong>最大亏损</strong>：已支付的权利金。</li>
            <li><strong>最大盈利</strong>：理论上无限（对于看涨）或巨大（对于看跌）。</li>
            <li><strong>心态</strong>：“我想用小成本博取大收益”。</li>
          </ul>
        </div>
        <div className="card">
          <h3>卖方 (Short)</h3>
          <p>收取买方支付的权利金，并承担在特定条件下履行合约的义务。他们是权利的授予者，通过承担风险来赚取时间价值。</p>
          <ul>
            <li><strong>最大盈利</strong>：收到的权利金。</li>
            <li><strong>最大亏损</strong>：理论上无限（特别是裸卖看涨）。</li>
            <li><strong>心态</strong>：“我认为市场不会像买方预期的那样波动，我想赚取这笔权利金”。</li>
          </ul>
        </div>
      </div>

      <h2>第三步：从四个基础策略开始</h2>
      <p>所有复杂的期权策略，都是由这四个基础操作（买入/卖出看涨/看跌）演变而来的。我们为你准备了详细的入门解读：</p>
      <div className="grid">
        <div className="card">
          <h3><Link to={"/strategies/long-call"}>买入看涨期权 (Long Call)</Link></h3>
          <p>
            最纯粹的看涨方式。如果你坚信一支股票会大涨，这是一个用较小成本博取巨大收益的理想工具。
          </p>
          <p><strong>适合场景：</strong>预期股价将有大幅上涨时。</p>
          <p><Link to={"/strategies/long-call"} className="button">学习 Long Call策略 &rarr;</Link></p>
        </div>
        <div className="card">
          <h3><Link to={"/strategies/long-put"}>买入看跌期权 (Long Put)</Link></h3>
          <p>最纯粹的看跌或保护方式。如果你认为一支股票会大跌，或者想为你的持仓买一份“保险”，它能帮你从价格下跌中获利。</p>
          <p><strong>适合场景：</strong>预期股价将有大幅下跌，或为已有持仓提供保护。</p>
          <p><Link to={"/strategies/long-put"} className="button">学习 Long Put策略 &rarr;</Link></p>
        </div>
        <div className="card">
          <h3><Link to={"/strategies/covered-call"}>备兑看涨期权 (Covered Call)</Link></h3>
          <p>如果你手里有股票，并觉得它短期内不会大涨，可以试试这个策略。它就像把股票“租”出去，帮你持续创造额外收入。</p>
          <p><strong>适合场景：</strong>持有股票，对后市温和看涨或中性，希望增加额外收益。</p>
          <p><Link to={"/strategies/covered-call"} className="button">学习 Covered Call策略 &rarr;</Link></p>
        </div>
        <div className="card">
          <h3><Link to={"/strategies/protective-put"}>保护性看跌期权 (Protective Put)</Link></h3>
          <p>担心你持有的股票会突然下跌？这个策略就是为你量身定做的“资产保险”，它能在不放弃未来上涨潜力的前提下，保护你的资产。</p>
          <p><strong>适合场景：</strong>持有股票，但担心短期内出现回调或黑天鹅事件。</p>
          <p><Link to={"/strategies/protective-put"} className="button">学习 Protective Put策略 &rarr;</Link></p>
        </div>
      </div>

      <h2>第四步：探索更多</h2>
      <p>当你掌握了这四个基础后，就可以开始探索更广阔的期权世界了。利用本站工具，你可以：</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
        <Link to="/strategies"><button>进入策略库</button></Link>
        <Link to="/compare"><button>对比不同策略</button></Link>
        <Link to="/builder"><button>自由构建你的策略</button></Link>
      </div>
    </section>
  )
}