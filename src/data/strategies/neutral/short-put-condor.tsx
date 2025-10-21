import type { Strategy } from '../../../lib/types';

const strategy: Strategy = {
  id: 'short-put-condor',
  name: '卖出看跌秃鹰式 (Short Put Condor)',
  referencePrice: 100,
  tags: ['方向：非中性', '收取权利金', '风险：有限'],
  summary: '卖出两翼的看跌期权，同时买入两份中间的看跌期权，以博取股价大幅波动的收益。',
  description: '卖出看跌秃鹰式是标准秃鹰式的镜像策略。它通过收取净权利金来建立头寸，并在股价大幅上涨或下跌时实现盈利。如果股价在到期时停留在中间执行价附近，策略将遭受最大亏损。这是一种押注市场将发生较大波动的策略。',
  concept: '与设置“平台”的标准秃鹰相反，卖出秃鹰是在平台周围画一个“危险区”。你通过收取权利金，赌股价最终会“逃离”这个危险区。只要股价波动足够大，无论是大涨还是大跌，只要能跑出这个区间，你就能盈利。如果股价不幸停在了危险区内，你就要承担损失。',
  pros: [
    '**收取权利金**：策略建立时立即产生现金流。',
    '**双向盈利**：无论股价大涨还是大跌，只要波动足够大，都能盈利。',
    '**风险有限**：最大亏损是确定的。',
  ],
  cons: [
    '**盈利有限**：最大利润被限制在收到的净权利金内。',
    '**亏损区间**：如果股价在中间区域盘整，策略会亏损。',
    '**潜在亏损大于收益**：最大潜在亏损通常大于最大潜在收益。',
  ],
  example: (
    <div>
      <p>你预测N公司股票（当前股价$100）在一个月后会有大动作，但方向不确定。于是你建立了一个卖出看跌秃鹰式：</p>
      <ul>
        <li>卖出1张执行价为$95的看跌期权，收入$3/股（共$300）。</li>
        <li>买入1张执行价为$98的看跌期权，花费$2/股（共$200）。</li>
        <li>买入1张执行价为$102的看跌期权，花费$2/股（共$200）。</li>
        <li>卖出1张执行价为$105的看跌期权，收入$3/股（共$300）。</li>
      </ul>
      <p>你总共获得了 <strong>$200</strong> 的净权利金，这是一个净收入策略。你的最大利润就是这笔权利金。</p>
      <p><strong>情景一：股价到期时收于$95或$105之外（大幅波动）</strong></p>
      <p>所有期权头寸相互抵消或变为废纸，你将赚取全部初始收入 <strong>$200</strong>。</p>
      <p><strong>情景二：股价到期时收于$100（最差情况）</strong></p>
      <p>你卖出的期权亏损$600，买入的期权价值为零。你的净亏损为$600。考虑到$200的净收入，你的总亏损为 <strong>$400</strong>，这是最大亏损。</p>
      <p><strong>盈亏平衡点</strong></p>
      <p>此策略的盈亏平衡点是 <em>$95 + $2 = $97</em> 和 <em>$105 - $2 = $103</em>。股价在$97到$103之外是你的盈利区间。</p>
    </div>
  ),
  formula: [
    '最大盈利 = 收到的净权利金',
    '最大亏损 = (中间执行价区间宽度 - 净权利金) × 合约乘数',
    '上方盈亏平衡点 = 高执行价 - 每股净权利金',
    '下方盈亏平衡点 = 低执行价 + 每股净权利金',
  ],
  legs: [
    { id: 'sp95', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 3, option: { type: 'put', strike: 95 } },
    { id: 'lp98', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'put', strike: 98 } },
    { id: 'lp102', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'put', strike: 102 } },
    { id: 'sp105', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 3, option: { type: 'put', strike: 105 } },
  ],
};

export default strategy;