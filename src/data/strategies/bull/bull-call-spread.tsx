import type { Strategy } from '../../../lib/types';

const strategy: Strategy = {
  id: 'bull-call-spread',
  name: '牛市看涨借方价差 (Bull Call Debit Spread)',
  referencePrice: 100,
  tags: ['方向：温和看多', '支付权利金', '风险/收益：有限'],
  summary: '买入一份较低执行价的看涨期权，同时卖出一份较高执行价的看涨期权，以较低成本建立看多头寸。',
  description: '牛市看涨价差是一种方向性策略，适合预期股价将温和上涨的投资者。通过买入一份平价或近价的看涨期权来捕捉上涨利润，同时卖出一份更虚值的看涨期权来补贴部分成本。这使得看多头寸的成本降低，但同时也限制了最大利润。',
  concept: '这好比你看好一只股票，想买它的看涨期权，但觉得有点贵。于是，你决定在买入这份期权的同时，再卖给别人一个“股价涨得更高”的权利，并收取一些费用。这样一来，你用卖出期权的收入补贴了买入期权的成本，总花费变少了。如果股价只是小涨，你能赚钱；但如果股价大涨，你卖出的那个权利就会限制你的总收益。',
  pros: [
    '**成本较低**：相比直接买入看涨期权，此策略的初始成本更低。',
    '**风险有限**：你的最大亏损就是你支付的净权利金，是确定的。',
    '**高杠杆**：在达到最大利润点时，投资回报率可能非常高。',
  ],
  cons: [
    '**利润有限**：由于卖出了一份看涨期权，你的潜在利润被限制了。即使股价暴涨，你的收益也不会超过一个特定水平。',
    '**时间价值损耗**：作为期权的净买方，如果股价横盘不动，时间价值的流逝会对你不利。',
  ],
  
  formula: [
    '最大盈利 = (高执行价 - 低执行价) × 合约乘数 - 净权利金',
    '最大亏损 = 支付的净权利金',
    '盈亏平衡点 = 买入看涨的执行价 + 每股净权利金',
  ],
  legs: [
    { id: 'long-call', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 4, option: { type: 'call', strike: 98 } },
    { id: 'short-call', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'call', strike: 105 } },
  ],
};

export default strategy;
