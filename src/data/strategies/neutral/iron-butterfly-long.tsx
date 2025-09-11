import type { Strategy } from '../../../lib/types';

const strategy: Strategy = {
  id: 'iron-butterfly-long',
  name: '反向铁蝶 (Long Iron Butterfly)',
  referencePrice: 100,
  tags: ['方向：非中性', '支付权利金', '风险/收益：有限'],
  summary: '买入一个中间的跨式期权，同时卖出一个两翼的宽跨式期权作为保护，以博取股价大幅波动的收益。',
  description: '反向铁蝶（或称长铁蝶）是标准铁蝶的镜像策略。它通过支付净权利金来建立头寸，并在股价大幅上涨或下跌时实现盈利。如果股价在到期时停留在中间执行价附近，策略将遭受最大亏损。这是一种押注市场将发生较大波动的策略，本质上与反向蝶式价差相同，只是由不同类型的期权组合而成。',
  concept: '这同样是在靶心周围画一个“危险区”。你花钱买入一个跨式期权（赌大波动），同时卖出一个宽跨式期权来补贴部分成本。只要股价波动足够大，无论是大涨还是大跌，只要能跑出这个区间，你就能盈利。如果股价不幸停在了危险区内，你就要承担损失。',
  pros: [
    '**风险有限**：最大亏损是确定的，即你最初支付的净权利金。',
    '**双向盈利**：无论股价大涨还是大跌，只要波动足够大，都能盈利。',
    '**定义明确的风险回报**：策略的各项指标都非常清晰。',
  ],
  cons: [
    '**盈利有限**：最大利润被限制在两翼的宽度减去净成本。',
    '**亏损区间**：如果股价在中间区域盘整，策略会亏损。',
    '**时间价值损耗**：作为期权的净买方，时间的流逝对你不利。',
  ],
  example: (
    <div>
      <p>你预测P公司股票（当前股价$100）在一个月后会有大动作，但方向不确定。于是你建立了一个反向铁蝶策略：</p>
      <ul>
        <li>买入1张执行价为$100的看涨期权，花费$3/股。</li>
        <li>买入1张执行价为$100的看跌期权，花费$3/股。</li>
        <li>卖出1张执行价为$106的看涨期权，收入$1/股。</li>
        <li>卖出1张执行价为$94的看跌期权，收入$1/股。</li>
      </ul>
      <p>你总共花费了 <strong>$400</strong> 的净权利金 ($300 + $300 - $100 - $100)，这是你的最大潜在亏损。</p>
      <p><strong>情景一：股价到期时收于$100（最差情况）</strong></p>
      <p>所有期权都变为废纸，你将损失全部初始投入的 <strong>$400</strong>。</p>
      <p><strong>情景二：股价到期时收于$94或$106之外</strong></p>
      <p>例如，股价涨到$110。你的$100看涨期权盈利$1000，而$106看涨期权亏损$400。净利润为$600。减去$400成本，最终利润为 <strong>$200</strong>。这是最大利润。</p>
      <p><strong>盈亏平衡点</strong></p>
      <p>此策略的盈亏平衡点是 <em>$100 - $4 = $96</em> 和 <em>$100 + $4 = $104</em>。股价在$96到$104之外是你的盈利区间。</p>
    </div>
  ),
  formula: [
    '最大盈利 = (翼宽 - 每股净权利金) × 合约乘数',
    '最大亏损 = 支付的净权利金',
    '上方盈亏平衡点 = 中间执行价 + 每股净权利金',
    '下方盈亏平衡点 = 中间执行价 - 每股净权利金',
  ],
  legs: [
    { id: 'lc100', kind: 'option', position: 'long',  qty: 1, multiplier: 100, entryPrice: 3, option: { type: 'call', strike: 100 } },
    { id: 'lp100', kind: 'option', position: 'long',  qty: 1, multiplier: 100, entryPrice: 3, option: { type: 'put',  strike: 100 } },
    { id: 'sc106', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 1, option: { type: 'call', strike: 106 } },
    { id: 'sp94',  kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 1, option: { type: 'put',  strike: 94  } },
  ],
};

export default strategy;
