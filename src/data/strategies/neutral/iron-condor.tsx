import type { Strategy } from '../../../lib/types';

const strategy: Strategy = {
  id: 'iron-condor',
  name: '铁鹰式 (Iron Condor)',
  referencePrice: 100,
  tags: ['方向：中性', '收取权利金', '风险/收益：有限'],
  summary: '卖出一个虚值的宽跨式期权，同时买入一个更宽的两翼作为保护，以博取股价在宽幅区间内盘整的收益。',
  description: '铁鹰式是一种非常流行的中性策略，适用于预期股价在未来一段时间内将在一个相对较宽的范围内波动的情况。它由一个熊市看涨信用价差和一个牛市看跌信用价差组合而成，通过收取净权利金建立头寸。只要股价保持在卖出的两个执行价之间，策略就能盈利。',
  concept: '铁鹰式就像是为股价设定一个“安全走廊”。你卖出走廊的“墙壁”（卖出虚值看涨和看跌期权），收取租金（权利金）。同时，你又在更远的地方买了两份“意外保险”（买入更虚值的期权），以防股价撞穿墙壁。只要股价乖乖地在走廊里活动，你就能稳赚租金。',
  pros: [
    '**高胜率**：由于盈利区间很宽，该策略的获胜概率通常较高。',
    '**收取权利金**：策略建立时立即产生现金流，时间价值的流逝对你有利。',
    '**风险有限**：最大亏损是确定的，让你能安心持仓。',
  ],
  cons: [
    '**利润有限**：最大利润被限制在收到的净权利金内，回报率相对较低。',
    '**潜在亏损大于收益**：最大潜在亏损通常大于最大潜在收益。',
    '**四腿交易**：建立和管理四条腿的交易更复杂，交易成本也更高。',
  ],
  example: (
    <div>
      <p>你预测R公司股票（当前股价$100）在一个月后将在$97到$103之间波动。于是你建立了一个铁鹰式策略：</p>
      <ul>
        <li>卖出1张执行价为$103的看涨期权，收入$2/股。</li>
        <li>买入1张执行价为$106的看涨期权，花费$1/股。</li>
        <li>卖出1张执行价为$97的看跌期权，收入$2/股。</li>
        <li>买入1张执行价为$94的看跌期权，花费$1/股。</li>
      </ul>
      <p>你总共获得了 <strong>$200</strong> 的净权利金 ($200 + $200 - $100 - $100)，这是你的最大潜在利润。</p>
      <p><strong>情景一：股价到期时收于$101（在区间内）</strong></p>
      <p>所有期权都变为废纸，你将赚取全部初始收入 <strong>$200</strong>。</p>
      <p><strong>情景二：股价到期时收于$108（大幅上涨）</strong></p>
      <p>你的看涨价差部分亏损$300，看跌价差部分变为废纸。减去$200的净收入，最终亏损为 <strong>$100</strong>。这是最大亏损。</p>
      <p><strong>盈亏平衡点</strong></p>
      <p>此策略的盈亏平衡点是 <em>$97 - $2 = $95</em> 和 <em>$103 + $2 = $105</em>。股价在$95到$105之间是你的盈利区间。</p>
    </div>
  ),
  formula: [
    '最大盈利 = 收到的净权利金',
    '最大亏损 = (翼宽 - 每股净权利金) × 合约乘数',
    '上方盈亏平衡点 = 卖出看涨的执行价 + 每股净权利金',
    '下方盈亏平衡点 = 卖出看跌的执行价 - 每股净权利金',
  ],
  legs: [
    { id: 'sp', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'put', strike: 97 } },
    { id: 'bp', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 1, option: { type: 'put', strike: 94 } },
    { id: 'sc', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'call', strike: 103 } },
    { id: 'bc', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 1, option: { type: 'call', strike: 106 } },
  ],
};

export default strategy;
