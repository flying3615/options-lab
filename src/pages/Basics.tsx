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
      <div className={styles.greekCard}>
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
      <div className={styles.greeksGrid}>
        <div className={styles.greekCard}>
          <h3>买方 (Long)</h3>
          <p>支付一笔费用（<GlossaryTooltip term="权利金 (Premium)">权利金</GlossaryTooltip>），获得权利。他们是风险的承担者，但风险被锁定在所支付的权利金范围内。</p>
          <ul>
            <li><strong>最大亏损</strong>：已支付的权利金。</li>
            <li><strong>最大盈利</strong>：理论上无限（对于看涨）或巨大（对于看跌）。</li>
            <li><strong>心态</strong>：“我想用小成本博取大收益”。</li>
          </ul>
        </div>
        <div className={styles.greekCard}>
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
      <p  className={styles.muted}>“Moneyness”描述了期权的执行价（Strike）与标的资产当前价格的关系，这直接决定了期权是否具有内在价值。</p>
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

      <h2>核心概念：认识"希腊字母"(The Greeks)</h2>
      <p  className={styles.muted}>"希腊字母"是衡量期权价格对不同因素变化的敏感度的指标，是风险管理和策略制定的核心工具。</p>
      <div className={styles.greeksRow}>
        <div className={styles.greekCard}>
          <h3><span className={styles.greekSymbol}>Δ</span> Delta: 速度</h3>
          <p>
            衡量股价每变动 $1，期权价格会变动多少。可以看作是期权的"速度"。
            <br />
            一个 Delta 为 0.5 的看涨期权，意味着股价上涨 $1，期权价格大约上涨 $0.5。
          </p>
        </div>
        <div className={styles.greekCard}>
          <h3><span className={styles.greekSymbol}>Γ</span> Gamma: 加速度</h3>
          <p>
            衡量股价每变动 $1，Delta 会变动多少。可以看作是期权价格变动的"加速度"。
            <br />
            高 Gamma 意味着 Delta 对股价变化非常敏感，通常出现在临近到期的平值期权上。
          </p>
        </div>
        <div className={styles.greekCard}>
          <h3><span className={styles.greekSymbol}>Θ</span> Theta: 时间流逝</h3>
          <p>
            衡量每天时间流逝会导致期权价格损失多少价值，通常被称为"时间衰减"。
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
            买入期权是"做多"波动率（Vega a为正），卖出期权是"做空"波动率（Vega 为负）。
          </p>
        </div>
        <div className={styles.greekCard}>
          <h3><span className={styles.greekSymbol}>ρ</span> Rho: 利率</h3>
          <p>
            衡量利率每变动 1%，期权价格会变动多少。
            <br />
            看涨期权的 Rho 通常为正（利率上升有利于买方），看跌期权的 Rho 通常为负。
            <br />
            对长期期权影响更大，短期期权影响相对较小。
          </p>
        </div>
      </div>

      <h2>核心概念：权利金与溢价率</h2>
      <div className={styles.greekCard}>
        <h3>权利金的拆解</h3>
        <ul>
          <li>权利金（期权价格） = 内在价值（Intrinsic） + 时间价值（Time Value）。</li>
          <li>溢价（Premium，狭义）= 时间价值 = 权利金 - 内在价值。</li>
          <li>内在价值：买方“此刻行权”能获得的价值；其余为时间价值。</li>
          <li>到期越近，时间价值衰减（Theta）越快；远期合约时间价值通常更高。</li>
        </ul>
      </div>

      <br/>

      <div className={styles.greeksGrid}>
        <div className={styles.greekCard}>
          <h3>溢价率（相对成本）</h3>
          <ul>
            <li>溢价率 ≈ 权利金 / 标的价格 × 100%（用于不同执行价/到期的相对成本比较）。</li>
            <li>溢价率越高，买方需要更大的波动或更长的时间才“划算”。</li>
            <li>卖方收取的权利金占用更高比例时（其他条件相同）相对更“丰厚”，但也意味着更高的被指派/突破风险。</li>
          </ul>
        </div>
        <div className={styles.greekCard}>
          <h3>年化溢价率（粗估）</h3>
          <ul>
            <li>年化溢价率 ≈ 收到保费 / 占用资金 × 年化（仅做粗估）。</li>
            <li>“占用资金”需结合保证金或名义金额实际情况；不同券商/品种差异显著。</li>
            <li>仅看年化不够：还需结合方向风险、IV、事件、流动性与滑点等因素。</li>
          </ul>
        </div>
      </div>
      
      <h2>核心概念：隐含波动率 (IV)</h2>
      <div className={styles.greekCard}>
        <h3>IV 是什么？</h3>
        <ul>
          <li>隐含波动率（Implied Volatility, IV）是市场对“未来波动幅度”的预期，由期权价格通过定价模型反推得到。</li>
          <li>一般而言：IV 高 → 期权更贵；IV 低 → 期权更便宜（其他条件相同）。</li>
          <li>重大事件前（如财报、政策会议）IV 常上升；事件落地后常见“IV 回落”（IV Crush）。</li>
          <li>IV 并非方向判断，而是“未来可能波动程度”的预期强弱。</li>
        </ul>
      </div>

      <br/>

      <div className={styles.greeksGrid}>
        <div className={styles.greekCard}>
          <h3>IV vs HV（历史波动率）</h3>
          <ul>
            <li><strong>历史波动率 (HV):</strong> 从历史价格序列计算得到，描述“过去”的波动强弱。</li>
            <li><strong>隐含波动率 (IV):</strong> 由当前期权价格反推，反映“未来”的市场预期。</li>
          </ul>
        </div>
        <div className={styles.greekCard}>
          <h3>IV Rank &amp; Percentile</h3>
          <ul>
            <li><strong>IV Rank:</strong> 当前 IV 在过去一段时间（如 1 年）所处的相对位置（0-100）。</li>
            <li><strong>IV Percentile:</strong> 当前 IV 处在历史分布的百分位。</li>
          </ul>
        </div>
      </div>

       <h2>核心概念：如何阅读期权链 (Option Chain)</h2>
       <div className={styles.greekCard}>
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

      <h2>核心概念：保证金与行权</h2>
      <div className={styles.greeksGrid}>
        <div className={styles.greekCard}>
          <h3>保证金 (Margin)</h3>
          <p>保证金是卖出期权时需要存入的资金，作为履约的担保。</p>
          <ul>
            <li><strong>卖方保证金：</strong>确保你有能力履行义务的资金要求。</li>
            <li><strong>计算方式：</strong>根据风险程度，通常为期权价值的一定比例或固定金额。</li>
            <li><strong>保证金催缴：</strong>当账户资金不足时，券商会要求追加资金。</li>
          </ul>
        </div>
        <div className={styles.greekCard}>
          <h3>行权与指派 (Exercise & Assignment)</h3>
          <p>行权是买方行使权利，指派是卖方被要求履行义务。</p>
          <ul>
            <li><strong>美式期权：</strong>可在到期前任何时间行权。</li>
            <li><strong>欧式期权：</strong>只能在到期日行权。</li>
            <li><strong>自动行权：</strong>价内期权通常会在到期时自动行权。</li>
            <li><strong>提前指派风险：</strong>卖方可能在到期前被要求履约。</li>
          </ul>
        </div>
      </div>

      <h2>核心概念：交易成本与税务</h2>
      <div className={styles.greeksGrid}>
        <div className={styles.greekCard}>
          <h3>交易成本</h3>
          <p>期权交易涉及多种成本，了解这些成本对策略盈利至关重要。</p>
          <ul>
            <li><strong>佣金：</strong>每笔交易收取的费用，通常按合约数量计算。</li>
            <li><strong>买卖价差 (Bid-Ask Spread)：</strong>买入价和卖出价之间的差额。</li>
            <li><strong>交易所费用：</strong>交易所收取的少量费用。</li>
            <li><strong>影响：</strong>高频交易或小价差策略对成本更敏感。</li>
          </ul>
        </div>
        <div className={styles.greekCard}>
          <h3>税务考虑</h3>
          <p>期权交易的税务处理相对复杂，需要特别注意。</p>
          <ul>
            <li><strong>资本利得：</strong>期权交易通常按资本利得税处理。</li>
            <li><strong>持有期：</strong>短期和长期资本利得税率不同。</li>
            <li><strong>洗卖规则：</strong>亏损卖出后30天内回购可能不能抵税。</li>
            <li><strong>专业建议：</strong>税务情况复杂，建议咨询专业税务顾问。</li>
          </ul>
        </div>
      </div>

      <h2>核心概念：风险管理原则</h2>
      <div className={styles.greekCard}>
        <h3>期权交易的风险管理黄金法则</h3>
        <div className={styles.greeksGrid}>
          <div className={styles.riskCard}>
            <h4>🛡️ 1. 仓位管理</h4>
            <ul>
              <li>单笔交易风险不超过总资金的1-2%</li>
              <li>分散投资，避免过度集中</li>
              <li>留有足够资金应对保证金催缴</li>
            </ul>
          </div>
          <div className={styles.riskCard}>
            <h4>📊 2. 策略理解</h4>
            <ul>
              <li>完全理解策略的最大风险和潜在收益</li>
              <li>了解希腊字母对你仓位的影响</li>
              <li>知道在什么情况下应该平仓</li>
            </ul>
          </div>
          <div className={styles.riskCard}>
            <h4>⏰ 3. 时间管理</h4>
            <ul>
              <li>注意到期日，避免意外行权</li>
              <li>了解时间衰减对不同策略的影响</li>
              <li>避免持有即将到期的高风险仓位</li>
            </ul>
          </div>
          <div className={styles.riskCard}>
            <h4>🔄 4. 持续监控</h4>
            <ul>
              <li>定期检查仓位表现</li>
              <li>关注市场变化和重大事件</li>
              <li>准备好应对计划的退出策略</li>
            </ul>
          </div>
        </div>
      </div>

      <h2>第三步：从四个基础策略开始</h2>
      <p className={styles.muted}>所有复杂的期权策略，都是由这四个基础操作（买入/卖出看涨/看跌）演变而来的。我们为你准备了详细的入门解读：</p>
      <div className={styles.greeksGrid}>
        <div className={styles.greekCard}>
          <h3><Link to={"/strategies/long-call"}>买入看涨期权 (Long Call)</Link></h3>
          <p>
            最纯粹的看涨方式。如果你坚信一支股票会大涨，这是一个用较小成本博取巨大收益的理想工具。
          </p>
          <p><strong>适合场景：</strong>预期股价将有大幅上涨时。</p>
          <p><Link to={"/strategies/long-call"} className="button">学习 Long Call策略 &rarr;</Link></p>
        </div>
        <div className={styles.greekCard}>
          <h3><Link to={"/strategies/long-put"}>买入看跌期权 (Long Put)</Link></h3>
          <p>最纯粹的看跌或保护方式。如果你认为一支股票会大跌，或者想为你的持仓买一份"保险"，它能帮你从价格下跌中获利。</p>
          <p><strong>适合场景：</strong>预期股价将有大幅下跌，或为已有持仓提供保护。</p>
          <p><Link to={"/strategies/long-put"} className="button">学习 Long Put策略 &rarr;</Link></p>
        </div>
        <div className={styles.greekCard}>
          <h3><Link to={"/strategies/covered-call"}>备兑看涨期权 (Covered Call)</Link></h3>
          <p>如果你手里有股票，并觉得它短期内不会大涨，可以试试这个策略。它就像把股票"租"出去，帮你持续创造额外收入。</p>
          <p><strong>适合场景：</strong>持有股票，对后市温和看涨或中性，希望增加额外收益。</p>
          <p><Link to={"/strategies/covered-call"} className="button">学习 Covered Call策略 &rarr;</Link></p>
        </div>
        <div className={styles.greekCard}>
          <h3><Link to={"/strategies/protective-put"}>保护性看跌期权 (Protective Put)</Link></h3>
          <p>担心你持有的股票会突然下跌？这个策略就是为你量身定做的"资产保险"，它能在不放弃未来上涨潜力的前提下，保护你的资产。</p>
          <p><strong>适合场景：</strong>持有股票，但担心短期内出现回调或黑天鹅事件。</p>
          <p><Link to={"/strategies/protective-put"} className="button">学习 Protective Put策略 &rarr;</Link></p>
        </div>
      </div>

      <h2>进阶策略概览</h2>
      <p className={styles.muted}>掌握了基础策略后，你可以探索这些常见的进阶策略，它们能帮助你应对更复杂的市场情况：</p>
      <div className={styles.greeksGrid}>
        <div className={styles.greekCard}>
          <h3><Link to={"/strategies/bull-call-spread"}>牛市看涨价差 (Bull Call Spread)</Link></h3>
          <p>降低成本的同时参与上涨行情，适合温和看涨的市场预期。</p>
          <p><strong>特点：</strong>风险有限，收益也有限，权利金支出较少。</p>
        </div>
        <div className={styles.greekCard}>
          <h3><Link to={"/strategies/bear-put-spread"}>熊市看跌价差 (Bear Put Spread)</Link></h3>
          <p>在下跌市场中获利，同时限制最大风险。</p>
          <p><strong>特点：</strong>适合温和看跌，比单纯买入看跌期权成本更低。</p>
        </div>
        <div className={styles.greekCard}>
          <h3><Link to={"/strategies/iron-condor"}>铁鹰价差 (Iron Condor)</Link></h3>
          <p>在震荡市场中获利，期待价格在特定区间内波动。</p>
          <p><strong>特点：</strong>方向中性，从时间价值衰减中获利。</p>
        </div>
        <div className={styles.greekCard}>
          <h3><Link to={"/calendar"}>日历价差 (Calendar Spread)</Link></h3>
          <p>利用不同到期期权的时间价值衰减差异获利。</p>
          <p><strong>特点：</strong>适合波动率上升的环境，对时间敏感。</p>
        </div>
      </div>

      <h2>第四步：探索更多</h2>
      <p className={styles.muted}>当你掌握了这些基础和进阶策略后，就可以开始探索更广阔的期权世界了。利用本站工具，你可以：</p>
      <div className={styles.flexLinks}>
        <Link to="/strategies"><button>进入策略库</button></Link>
        <Link to="/compare"><button>对比不同策略</button></Link>
        <Link to="/builder"><button>自由构建你的策略</button></Link>
      </div>

      <div className={styles.tipsSection}>
        <h2>💡 新手常见问题</h2>
        <div className={styles.faqs}>
          <div className={styles.faqItem}>
            <h4>Q: 期权交易需要多少资金开始？</h4>
            <p>A: 这取决于你的交易策略。买入期权最低可能只需几百元，但建议至少准备5000-10000元作为初始资金，以便分散风险和支付保证金。</p>
          </div>
          <div className={styles.faqItem}>
            <h4>Q: 期权交易比股票风险更大吗？</h4>
            <p>A: 期权可以比股票风险更高，也可以是风险管理工具。买入期权最大损失限于权利金，而卖出期权可能面临无限风险。关键在于理解你使用的策略。</p>
          </div>
          <div className={styles.faqItem}>
            <h4>Q: 我应该从哪种策略开始？</h4>
            <p>A: 建议从买入看涨或看跌期权开始，它们风险有限且容易理解。有了经验后，可以尝试备兑看涨等更复杂的策略。</p>
          </div>
          <div className={styles.faqItem}>
            <h4>Q: 如何选择合适的执行价和到期日？</h4>
            <p>A: 执行价选择取决于你的市场预期和风险承受能力。到期日要给足够时间让预期实现，但不要太远以免时间价值衰减过快。新手建议从距离到期1-2个月的合约开始。</p>
          </div>
        </div>
      </div>
    </section>
  )
}