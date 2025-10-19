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
          <h3><span className={styles.greekSymbol}>Δ</span> Delta: 速度/速度表</h3>
          <p>衡量股价每变动 $1，期权价格会变动多少。可以看作是期权的"速度"。</p>
          <p>看涨期权 (Call Option) 的 Delta 是正数（0 到 1 之间）。比如 Delta 是 0.6，就意味着股票每涨 1 美元，你的看涨期权价格大约会上涨 0.6 美元。</p>
          <p>看跌期权 (Put Option) 的 Delta 是负数（-1 到 0 之间）。比如 Delta 是 -0.4，就意味着股票每涨 1 美元，你的看跌期权价格反而会下跌 0.4 美元。</p>
          <p>Delta 的数值，还可以被看作是期权在到期时成为实值期权（In-the-Money）的近似概率。比如，一个 Delta 为 0.6 的看涨期权，可以粗略地理解为它有大约 60% 的可能性在到期时是赚钱的（即股价高于行权价）。</p>
          <p>* 想象一个深度实值 (Deep ITM) 的看涨期权：比如，行权价是 $50，而现在股价是 $100。它到期时成为实值的概率是不是非常非常高？几乎是 100% 吧？你看它的 Delta，也几乎就是 1。两者高度吻合。</p>
          <p>* 想象一个深度虚值 (Deep OTM) 的看涨期权：比如，行权价是 $150，而股价是 $100。它需要股价暴涨 50% 才能成为实值，这个概率是不是非常非常低？几乎是 0% 吧？你看它的 Delta，也几乎就是 0。两者再次吻合。</p>
          <p>* 想象一个平值 (ATM) 的看涨期权：行权价和股价都是 $100。股价上涨或下跌的概率就像抛硬币，一半一半，也就是大约 50% 的机会成为实值。你看它的 Delta，正好就在 0.5 左右。</p>
        </div>
        <div className={styles.greekCard}>
          <h3><span className={styles.greekSymbol}>Γ</span> Gamma: 加速度/油门</h3>
          <p>衡量股价每变动 $1，Delta 会变动多少。可以看作是期权价格变动的"加速度"。</p>
          <p>如果现在股票价格从 100 美元上涨到 101 美元：你新的 Delta 就约等于：旧 Delta + Gamma = 0.60 + 0.05 = 0.65。你的"速度"变快了！</p>
          <p>如果股票价格从 100 美元下跌到 99 美元：你新的 Delta 就约等于：旧 Delta - Gamma = 0.60 - 0.05 = 0.55。你的"速度"变慢了。</p>
          <p>一个高 Gamma 的期权，意味着它的 Delta 会随着股价变化而剧烈变动，这会让你的持仓盈亏波动非常大，就像一辆油门特别灵敏的跑车，轻轻一点就窜出去很远。对于新手来说，管理起来难度更大。</p>
        </div>
        <div className={styles.greekCard}>
          <h3><span className={styles.greekSymbol}>Θ</span> Theta: 时间流逝/油箱</h3>
          <p>衡量每天时间流逝会导致期权价格损失多少价值，通常被称为"时间衰减"。</p>
          <p>Theta 通常是一个负数。比如一个期权的 Theta 是 -0.05，就意味着在其他所有条件（比如股价、波动率）都不变的情况下，每过一天，这个期权的价值就会自动减少 0.05 美元。</p>
          <p>一个关键点：时间衰减不是线性的！离到期日越近，衰减的速度就越快。就像冰淇淋，最后那一小块融化得最快。</p>
          <p>作为期权买方，Theta 是你的敌人；作为卖方，Theta 是你的朋友。</p>
        </div>
        <div className={styles.greekCard}>
          <h3><span className={styles.greekSymbol}>V</span> Vega: 波动率/兴奋度指示器</h3>
          <p>衡量<GlossaryTooltip term="隐含波幅 (IV)">隐含波幅 (IV)</GlossaryTooltip>每变动 1%，期权价格会变动多少。</p>
          <p>通常，市场越恐慌、越不确定，波动率就越高，就像天气预报说未来有暴风雨，大家都很紧张，相反，如果市场风平浪静，没什么大新闻，波动率就会降低。</p>
          <p>无论是看涨期权还是看跌期权，Vega 通常都是正数。这意味着，波动率上升，期权价格也会上涨（因为未来的不确定性变大了，期权这种"选择权"就更有价值了）。反之，波动率下降，期权价格就会下跌。</p>
          <p>离到期日越远的期权，其 Vega 值通常越高，因为它包含了更多的不确定性时间。</p>
          <p>买入期权是"做多"波动率（Vega 为正），卖出期权是"做空"波动率（Vega 为负）。</p>
          <p>如果 Vega 值很高（比如是 0.20），当波动率上升 10% 的时候，期权价格光是因为这一项就会上涨 0.20 * 10 = 2 美元。如果 Vega 值很低（比如是 0.05），同样是波动率上升 10%，期权价格只会因此上涨 0.05 * 10 = 0.5 美元。</p>
          <p>在财报公布前，当市场还相对平静（此时引申波幅可能还没飙升，期权价格相对"便宜"）的时候，买入一个 Vega 值高的期权（比如稍远月一些的平值期权）。这样，当财报一公布，市场情绪激动，波动率飙升时，你的期权价值就会随之"水涨船高"。</p>
          <p>高 Vega 才更是我们的好朋友！</p>
        </div>
        <div className={styles.greekCard}>
          <h3><span className={styles.greekSymbol}>ρ</span> Rho: 利率</h3>
          <p>衡量利率每变动 1%，期权价格会变动多少。</p>
          <p>看涨期权的 Rho 通常为正（利率上升有利于买方），看跌期权的 Rho 通常为负。</p>
          <p>对长期期权影响更大，短期期权影响相对较小。</p>
        </div>
      </div>

      <h3>近月期权 vs. 远月期权：选择你的战场</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem', backgroundColor: 'var(--panel)', borderRadius: '8px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--accent)', color: 'white', borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid var(--border-color)' }}>特征</th>
            <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid var(--border-color)' }}>近月期权 (Near-Term)</th>
            <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid var(--border-color)' }}>远月期权 (Long-Term)</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>交易含义</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderBottom: '1px solid var(--border-color)' }}>
            <td style={{ padding: '12px', borderRight: '1px solid var(--border-color)' }}>Gamma (Γ)</td>
            <td style={{ padding: '12px', borderRight: '1px solid var(--border-color)' }}>高</td>
            <td style={{ padding: '12px', borderRight: '1px solid var(--border-color)' }}>低</td>
            <td style={{ padding: '12px' }}>追求短期、爆炸性行情的"赌徒”之选</td>
          </tr>
          <tr style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
            <td style={{ padding: '12px', borderRight: '1px solid var(--border-color)' }}>Theta (Θ)</td>
            <td style={{ padding: '12px', borderRight: '1px solid var(--border-color)' }}>高 (负)</td>
            <td style={{ padding: '12px', borderRight: '1px solid var(--border-color)' }}>低 (负)</td>
            <td style={{ padding: '12px' }}>时间是最大的敌人，持仓成本极高</td>
          </tr>
          <tr style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderBottom: '1px solid var(--border-color)' }}>
            <td style={{ padding: '12px', borderRight: '1px solid var(--border-color)' }}>Vega (ν)</td>
            <td style={{ padding: '12px', borderRight: '1px solid var(--border-color)' }}>低</td>
            <td style={{ padding: '12px', borderRight: '1px solid var(--border-color)' }}>高</td>
            <td style={{ padding: '12px' }}>对整体市场波动率更敏感的"趋势”之选</td>
          </tr>
          <tr style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
            <td style={{ padding: '12px', borderRight: '1px solid var(--border-color)' }}>成本</td>
            <td style={{ padding: '12px', borderRight: '1px solid var(--border-color)' }}>便宜</td>
            <td style={{ padding: '12px', borderRight: '1px solid var(--border-color)' }}>昂贵</td>
            <td style={{ padding: '12px' }}>前者是"彩票"，后者是"投资"</td>
          </tr>
        </tbody>
      </table>

      <p>如果你认为"就在这周！" -》 你应该选择近月的虚值看涨期权。你是在用高昂的Theta成本，去赌它高Gamma带来的爆炸性回报。这是一场闪电战。</p>
      <p>如果你认为"未来半年内会到" -》 你应该选择远月的看涨期权。你支付了更高的权利金，换来了低Theta损耗和更长的等待时间。这是一场持久战。你更关心的是趋势（Vega也会帮你），而不是一两天的波动。</p>

      <h3>波动率策略选择表</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem', backgroundColor: 'var(--panel)', borderRadius: '8px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--accent)', color: 'white', borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid var(--border-color)' }}>市场情景</th>
            <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid var(--border-color)' }}>核心特征</th>
            <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid var(--border-color)' }}>黄金法则</th>
            <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid var(--border-color)' }}>如果你温和看涨...</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>如果你看跌...</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderBottom: '1px solid var(--border-color)' }}>
            <td style={{ padding: '12px', borderRight: '1px solid var(--border-color)' }}>大跌之后</td>
            <td style={{ padding: '12px', borderRight: '1px solid var(--border-color)' }}>IV 高 (期权贵)</td>
            <td style={{ padding: '12px', borderRight: '1px solid var(--border-color)' }}>做卖方 (收钱)</td>
            <td style={{ padding: '12px', borderRight: '1px solid var(--border-color)' }}>牛市看跌价差 (Bull Put)</td>
            <td style={{ padding: '12px' }}>(不推荐买入策略)</td>
          </tr>
          <tr style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
            <td style={{ padding: '12px', borderRight: '1px solid var(--border-color)' }}>大涨之后</td>
            <td style={{ padding: '12px', borderRight: '1px solid var(--border-color)' }}>IV 低 (期权便宜)</td>
            <td style={{ padding: '12px', borderRight: '1px solid var(--border-color)' }}>做买方 (花钱)</td>
            <td style={{ padding: '12px', borderRight: '1px solid var(--border-color)' }}>牛市看涨价差 (Bull Call)</td>
            <td style={{ padding: '12px' }}>熊市看跌价差 (Bear Put)</td>
          </tr>
        </tbody>
      </table>

      <h2>核心概念：移仓 (Rolling)</h2>
      <div className={styles.greekCard}>
        <h3>什么是移仓 (Rolling)？</h3>
        <p>"移仓"听起来很复杂，但本质上就是一个组合操作：你平掉 (Close) 当前的仓位，然后立刻建立 (Open) 一个新的、对你更有利的仓位。</p>
        <p>移仓主要有两个方向：</p>
        <ul>
          <li><strong>向未来移 (Rolling Out/Forward)：</strong>你平掉本月的仓位，重新建立一个下个月到期的、相同行权价的仓位。</li>
          <li><strong>目的：</strong>用时间换空间。这就像足球比赛里，你把球往后场回传一下，重新组织进攻。你给了自己更多的时间，让股价"浪子回头"。通常，这个操作还能让你额外再收到一点权利金。</li>
        </ul>
        <ul>
          <li><strong>向下方移 (Rolling Down)：</strong>你保持到期日不变，平掉当前的仓位（比如 $95/$90 的价差），重新建立一个行权价更低的仓位（比如 $90/$85 的价差）。</li>
          <li><strong>目的：</strong>降低你的防线。你承认之前的防线位置太高了，现在你把阵地向后移动，设置一个新的、更安全的防线。这个操作通常需要你付出一点成本，或者收到的权利金会变少。</li>
        </ul>
        <p>当然，你也可以把两者结合起来：向未来且向下方移 (Rolling Out and Down)，这是最强的防守姿态。</p>
      </div>

      <h2>仓位管理：当走势与你的预期相同时 (How to Play Offense)</h2>
      <div className={styles.greekCard}>
        <p>假设你买入了一个看涨期权 (Long Call)，然后股价如你所料，一路上涨，你的期权现在已经有了可观的浮动盈利。</p>
        <p>你的内心可能会出现两个声音：</p>
        <ul>
          <li><strong>贪婪的小魔鬼说：</strong>"让利润奔跑！它可能会涨到天上去！"</li>
          <li><strong>恐惧的小天使说：</strong>"快跑！现在就锁定利润，万一它跌回去了怎么办？"</li>
        </ul>
        <p>如何在这两者之间找到平衡，实现利润最大化呢？这里有几个常用的进攻性管理策略：</p>
        <ul>
          <li><strong>设定目标，分批止盈 (Scaling Out)：</strong>这是最常用也最稳健的方法。在入场前就设定好你的盈利目标。比如，当利润达到 50% 时，先平掉一半的仓位，锁定一部分利润，让你的成本变得更低甚至为零。剩下的一半仓位，你就可以毫无压力地"让利润奔跑"，去博取更高的收益。</li>
          <li><strong>向上移仓，锁定利润 (Rolling Up)：</strong>当你买的 Call 从虚值变成了深度实值 (Deep-in-the-Money)，它的 Delta 已经接近 1，Gamma 和 Theta 的作用都变小了，它越来越像一只股票，失去了期权的灵活性。这时，你可以把它平仓，然后用获得的利润，去买入一个新的、行权价更高、更便宜的看涨期权。</li>
          <li><strong>目的：</strong>这相当于你从银行取出了大部分的利润存起来，只用一小部分"零钱"继续参与接下来的牌局。既锁定了大部分胜利果实，又保留了继续盈利的可能性。</li>
          <li><strong>组合成价差，由攻转守 (Converting to a Spread)：</strong>你手上有一个盈利的 Long Call。现在你觉得上涨可能接近尾声了。你可以卖出一个更高行权价的 Call，把你原来的单腿策略，转换成一个牛市看涨价差 (Bull Call Spread)。</li>
          <li><strong>目的：</strong>卖出 Call 收到的权利金，等于你提前锁定了一部分利润。这个操作降低了你的时间衰减 (Theta) 风险，让你能更安心地持有到期。</li>
        </ul>
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

      <h2>核心概念：IV Crush (引申波幅骤降) - "派对结束了"</h2>
      <div className={styles.greekCard}>
        <p>还记得我们把引申波幅 (IV) 比作"市场情绪晴雨表"或"飓风预警等级"吗？</p>
        <p><strong>事件发生前：</strong>比如财报公布、重要会议、药物审批结果公布前，市场充满了不确定性。大家不知道结果是好是坏，只知道会有大事发生。这种强烈的不确定性预期，会把 IV 推得非常高。就像飓风来临前，所有人都抢着买保险，导致保险费（期权权利金）变得异常昂贵。</p>
        <p><strong>事件发生后：</strong>一旦财报数据公布，或者会议结果出炉，无论结果是好是坏，最大的不确定性本身消失了。谜底揭晓了，靴子落地了，市场的恐慌或期待情绪瞬间释放。</p>
        <p><strong>IV Crush 发生：</strong>引申波幅 (IV) 会在短时间内急剧下降，恢复到正常水平。这就像飓风警报解除，保险费立刻大幅跳水，恢复原价。这个 IV 从高位迅速回落的过程，就叫做 IV Crush。</p>
        <p><strong>对交易者意味着什么？</strong></p>
        <p>这对期权买方是致命一击！</p>
        <p>想象一下，你在财报前买了一个跨式策略 (Straddle)，赌股价会大涨或大跌。财报公布后，股价确实如你所料上涨了 5%，但 IV 从 150% 骤降到了 40%。</p>
        <p>结果你可能会惊讶地发现，你的期权仓位竟然是亏钱的！为什么？因为股价上涨带来的利润（Delta/Gamma 收益），完全不足以抵消掉 IV Crush 带来的巨大损失（Vega 亏损）。你"猜对了方向，却输给了波动率"。</p>
        <p><strong>简单来说：</strong>IV Crush 就是不确定性消失后，期权价格因为 IV 的骤降而发生的价值崩塌。</p>
      </div>

      <h2>核心概念：Gamma Squeeze (Gamma 挤压) - "火上浇油的连锁反应"</h2>
      <div className={styles.greekCard}>
        <p>这个概念要复杂一些，它是一种市场极端情绪和期权机制共同作用下产生的正反馈循环，经常发生在那些被大量做空的股票上。</p>
        <p>我们一步步来拆解这个连锁反应是如何发生的：</p>
        <p><strong>背景设定：</strong>市场上有一只被大量做空的股票（比如游戏驿站 GME）。同时，有很多散户投资者不买股票，而是去大量买入这只股票的短期、虚值 (OTM) 看涨期权 (Call)。</p>
        <p><strong>卖方是谁？</strong> 谁把这些 Call 卖给散户的？通常是做市商 (Market Makers)。做市商不赌方向，他们的任务是保持风险中性。</p>
        <p><strong>Delta 中性对冲：</strong>做市商卖出一张 Call，他的手里就是空头头寸（负 Delta）。为了对冲风险，他必须立刻去市场上买入一些正股，让自己的综合头寸恢复到 Delta 中性。比如，他卖了一张 Delta 为 0.20 的 Call，他就会立刻买入 20 股股票来对冲。</p>
        <p><strong>挤压开始 (股价上涨)：</strong>由于散户的大量买盘，或者其他原因，股价开始上涨。</p>
        <p><strong>Gamma 登场：</strong>股价上涨，那些 OTM Call 的 Delta 会加速变大（还记得吗？Gamma 就是 Delta 的加速度）。原来 Delta 是 0.20，现在可能变成了 0.40。</p>
        <p><strong>连锁反应：</strong></p>
        <ul>
          <li>做市商的 Delta 对冲被打破了！他现在需要持有 40 股股票才能保持中性，但他手里只有 20 股。</li>
          <li>他该怎么办？ 他必须被迫回到市场上，再买入 20 股股票来重新对冲！</li>
          <li>这种被迫的买入行为，进一步推高了股价！</li>
          <li>股价被推高后，Call 的 Delta 因为 Gamma 的作用变得更大（比如到了 0.60），做市商又需要被迫买入更多的股票来对冲……</li>
        </ul>
        <p><strong>Squeeze (挤压) 形成：</strong>这就形成了一个可怕的正反馈循环：股价上涨 -》 Call 的 Delta 变大 -》做市商被迫买入正股对冲 -》进一步推高股价 -》 Call 的 Delta 更大 -》做市商买更多正股…… 与此同时，那些一开始做空股票的空头，看到股价暴涨也开始被迫平仓（买入股票），这又给上涨的火焰浇上了一桶油。最终导致股价在短时间内出现爆炸性、非理性的上涨。</p>
        <p><strong>简单来说：</strong>Gamma Squeeze 是由于期权对冲机制引发的、买盘自我强化的"踩踏"事件。</p>
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

      <div className={styles.greeksGrid}>
        <div className={styles.greekCard}>
          <h3>当 IV {'>>'} HV (天气预报远比历史气候更极端)</h3>
          <p>IV 系统性地高于 HV，是因为期权价格中不仅包含了对未来平均波动的预期，还额外打包了两个东西：</p>
          <p>对未来极端事件的“恐惧”溢价。</p>
          <p>期权卖方要求的“利润”溢价。</p>
          <p>市场在说什么？ "未来要发生的，将比过去任何时候都更刺激！" 市场情绪非常激动，导致期权价格（天气预报）被抬得非常高。</p>
          <p>这时的期权是？ 昂贵的 (Expensive)！ 就像飓风来临前，所有人都抢着买保险，导致保费飙升。</p>
          <p>我们的策略： 在这种时候，我们应该考虑成为卖保险的人，也就是期权卖方（比如卖出价差策略），去赚取那份被高估的"恐慌"溢价。</p>
        </div>
        <div className={styles.greekCard}>
          <h3>当 IV {'<='} HV (天气预报说风平浪静，但历史气候显示这里常有风暴)</h3>
          <p>市场在说什么？ "未来会非常平静，大家可以放心。" 市场情绪非常自满或冷淡，导致期权价格（天气预报）非常低。</p>
          <p>这时的期权是？ 便宜的 (Cheap)！ 就像在一个看似平静但有潜在风险的地方，保险卖得特别便宜。</p>
          <p>我们的策略： 在这种时候，我们应该考虑成为买保险的人，也就是期权买方（比如直接买入Call/Put或买入价差策略）。我们可以用很低的成本，去博取一个"黑天鹅"事件的发生。</p>
        </div>
      </div>

      <h2>实战应用：波动率与策略选择</h2>
      <div className={styles.greeksGrid}>
        <div className={styles.greekCard}>
          <h3>场景一：股价大跌之后</h3>
          <p><strong>市场会发生什么？</strong> 恐慌！不确定性急剧增加。投资者害怕股价会继续下跌，纷纷去购买看跌期权（Put）作为保险。</p>
          <p><strong>IV会怎样？</strong> IV会飙升。这意味着所有的期权，尤其是看跌期权，都变得非常昂贵。</p>
          <p><strong>这时我们该做什么？</strong> 当东西很贵的时候，我们应该考虑卖出它，而不是买入。</p>
          <p><strong>所以用哪个策略？</strong> 这正是牛市看跌价差 (Bull Put Spread) 的绝佳使用时机！</p>
          <p><strong>你的观点：</strong>你认为股价已经跌得差不多了，不太可能继续暴跌，可能会进入筑底、横盘甚至反弹。</p>
          <p><strong>你的操作：</strong>你卖出一个昂贵的看跌期权价差，收取非常可观的权利金（"租金"）。因为 IV 很高，你收到的"租金"会比平时多得多。</p>
          <p><strong>结论：</strong> 在股价大跌后，如果你认为下跌动能衰竭，使用牛市看跌价差是非常明智的，因为它让你利用高 IV 成为了一个"收高价租的房东"。</p>
        </div>
        <div className={styles.greekCard}>
          <h3>场景二：股价大涨之后</h3>
          <p><strong>市场会发生什么？</strong> 市场情绪通常会变得乐观甚至自满。对未来波动的预期可能会下降。</p>
          <p><strong>IV会怎样？</strong> 经常会出现"波动率挤压 (Volatility Crush)"，IV 会变得很低。期权变得非常便宜。</p>
          <p><strong>这时我们该做什么？</strong> 当东西很便宜的时候，是买入它的好时机。</p>
          <p><strong>这时如果你想做空怎么办？</strong> 如果你认为股价涨得太高，可能会回调或下跌，你需要一个看跌的策略。这时候，熊市看跌价差 (Bear Put Spread) 就派上用场了。</p>
          <p><strong>你的观点：</strong>你认为上涨动能不足，股价要回调。</p>
          <p><strong>你的操作：</strong>你买入一个看跌期权价差。因为 IV 很低，你买入这个价差的成本（"门票"）会非常便宜，这让你的盈亏比变得极具吸引力。你可以用很小的风险去博取潜在的回调利润。</p>
          <p><strong>结论：</strong> 在股价大涨后，如果你认为股价要回调，使用熊市看跌价差更合适，因为它让你能以低成本"买彩票"，博取高赔率。</p>
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