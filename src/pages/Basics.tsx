import { Link } from 'react-router-dom'
import GlossaryTooltip from '../components/GlossaryTooltip'
import styles from './Basics.module.scss';

export default function Basics() {
  return (
    <section>
      <h1>欢迎来到期权的世界！</h1>
      <p className={styles.muted}>
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

      <h2>核心概念：价内 vs. 价外 (Moneyness)</h2>
      <p>“Moneyness”描述了期权的执行价（Strike）与标的资产当前价格的关系，这直接决定了期权是否具有内在价值。</p>
      <div className={styles.greeksGrid}>
        <div className={styles.greekCard}>
          <h3>IN THE MONEY (ITM) - 价内</h3>
          <p>
            如果立即行权，该期权具有内在价值。
            <ul>
              <li><strong>看涨期权:</strong> 执行价 &lt; 标的现价</li>
              <li><strong>看跌期权:</strong> 执行价 &gt; 标的现价</li>
            </ul>
          </p>
        </div>
        <div className={styles.greekCard}>
          <h3>AT THE MONEY (ATM) - 平价</h3>
          <p>
            执行价非常接近或等于标的现价。平价期权通常流动性最好，时间价值最高，对价格变动也最敏感。
          </p>
        </div>
        <div className={styles.greekCard}>
          <h3>OUT OF THE MONEY (OTM) - 价外</h3>
          <p>
            如果立即行权，该期权没有内在价值，其价值完全由时间价值组成。
            <ul>
              <li><strong>看涨期权:</strong> 执行价 &gt; 标的现价</li>
              <li><strong>看跌期权:</strong> 执行价 &lt; 标的现价</li>
            </ul>
          </p>
        </div>
      </div>

      <h2>核心概念：认识“希腊字母”(The Greeks)</h2>
      <p>“希腊字母”是衡量期权价格对不同因素变化的敏感度的指标，是风险管理和策略制定的核心工具。</p>
      <div className={styles.greeksGrid}>
        <div className={styles.greekCard}>
          <h3><span className={styles.greekSymbol}>Δ</span> Delta: 速度</h3>
          <p>
            衡量股价每变动 $1，期权价格会变动多少。可以看作是期权的“速度”。
            <br />
            一个 Delta 为 0.5 的看涨期权，意味着股价上涨 $1，期权价格大约上涨 $0.5。
          </p>
        </div>
        <div className={styles.greekCard}>
          <h3><span className={styles.greekSymbol}>Γ</span> Gamma: 加速度</h3>
          <p>
            衡量股价每变动 $1，Delta 会变动多少。可以看作是期权价格变动的“加速度”。
            <br />
            高 Gamma 意味着 Delta 对股价变化非常敏感，通常出现在临近到期的平值期权上。
          </p>
        </div>
        <div className={styles.greekCard}>
          <h3><span className={styles.greekSymbol}>Θ</span> Theta: 时间流逝</h3>
          <p>
            衡量每天时间流逝会导致期权价格损失多少价值，通常被称为“时间衰减”。
            <br />
            作为期权买方，Theta 是你的敌人；作为卖方，Theta 是你的朋友。
          </p>
        </div>
        <div className={styles.greekCard}>
          <h3><span className={styles.greekSymbol}>V</span> Vega: 波动率</h3>
          <p>
            衡量
            <GlossaryTooltip term="引申波幅 (IV)">引申波幅 (IV)</GlossaryTooltip>
            每变动 1%，期权价格会变动多少。
            <br />
            买入期权是“做多”波动率（Vega a为正），卖出期权是“做空”波动率（Vega 为负）。
          </p>
        </div>
      </div>

      <h2>核心概念：权利金与溢价率</h2>
      <div className="card">
        <h3>权利金的拆解</h3>
        <ul>
          <li>权利金（期权价格） = 内在价值（Intrinsic） + 时间价值（Time Value）。</li>
          <li>溢价（Premium，狭义）= 时间价值 = 权利金 - 内在价值。</li>
          <li>内在价值：买方“此刻行权”能获得的价值；其余为时间价值。</li>
          <li>到期越近，时间价值衰减（Theta）越快；远期合约时间价值通常更高。</li>
        </ul>
      </div>
      <div className="grid">
        <div className="card">
          <h3>溢价率（相对成本）</h3>
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
      
      <h2>核心概念：隐含波动率 (IV)</h2>
       <div className="card">
        <h3>IV 是什么？</h3>
        <ul>
          <li>隐含波动率（Implied Volatility, IV）是市场对“未来波动幅度”的预期，由期权价格通过定价模型反推得到。</li>
          <li>一般而言：IV 高 → 期权更贵；IV 低 → 期权更便宜（其他条件相同）。</li>
          <li>重大事件前（如财报、政策会议）IV 常上升；事件落地后常见“IV 回落”（IV Crush）。</li>
          <li>IV 并非方向判断，而是“未来可能波动程度”的预期强弱。</li>
        </ul>
      </div>
      <div className="grid">
        <div className="card">
          <h3>IV vs HV（历史波动率）</h3>
          <ul>
            <li><strong>历史波动率 (HV):</strong> 从历史价格序列计算得到，描述“过去”的波动强弱。</li>
            <li><strong>隐含波动率 (IV):</strong> 由当前期权价格反推，反映“未来”的市场预期。</li>
          </ul>
        </div>
        <div className="card">
          <h3>IV Rank &amp; Percentile</h3>
          <ul>
            <li><strong>IV Rank:</strong> 当前 IV 在过去一段时间（如 1 年）所处的相对位置（0-100）。</li>
            <li><strong>IV Percentile:</strong> 当前 IV 处在历史分布的百分位。</li>
          </ul>
        </div>
      </div>

       <h2>核心概念：如何阅读期权链 (Option Chain)</h2>
       <div className="card">
        <p>期权链是交易所提供的、展示所有可用期权合约的列表。它就像一张“菜单”，你需要学会如何阅读它。</p>
        <p>一个典型的期权链会包含以下关键信息：</p>
        <ul>
            <li><strong>到期日 (Expiration):</strong> 不同的到期日形成不同的“月份”合约。</li>
            <li><strong>执行价 (Strike):</strong> 每个到期日下，都有一系列从低到高的执行价可供选择。</li>
            <li><strong>看涨/看跌 (Calls/Puts):</strong> 通常，屏幕左侧是看涨期权，右侧是看跌期权。</li>
            <li><strong>买价/卖价 (Bid/Ask):</strong> 你可以卖出的价格（Bid）和你可以买入的价格（Ask）。</li>
            <li><strong>成交量/持仓量 (Volume/Open Interest):</strong> 反映合约的活跃程度和市场参与度，是流动性的重要指标。</li>
        </ul>
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
      <div className={styles.flexLinks}>
        <Link to="/strategies"><button>进入策略库</button></Link>
        <Link to="/compare"><button>对比不同策略</button></Link>
        <Link to="/builder"><button>自由构建你的策略</button></Link>
      </div>
    </section>
  )
}