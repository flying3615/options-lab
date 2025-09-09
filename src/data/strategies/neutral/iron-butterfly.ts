import type { Strategy } from '../../../lib/types'

const strategy: Strategy = {
  id: 'iron-butterfly',
  name: '铁蝶（Iron Butterfly）',
  referencePrice: 100,
  tags: ['方向：中性', '收取权利金', '风险：有限'],
  summary: '卖出ATM看涨/看跌并买入两翼保护，赚时间价值，风险有限。',
  description: '铁蝶相当于在中间卖出一对平值看涨与看跌（短跨式），并在上下买入更远的虚值作为保护。价格在中间附近到期收益最大。',
  suitableFor: ['区间震荡', '预期波动率回落'],
  pros: ['风险有限', '保费较丰厚（相较铁鹰更集中）'],
  cons: ['窗口更窄，需要价格靠近中心'],
  risks: ['突破风险'],
  concept: '把“中心点附近的波动”租出去，同时用两翼保险封住最坏情况。',
  formula: [
    '最大盈利 ≈ 净收取权利金',
    '最大亏损 ≈ 翅膀价差 × 合约乘数 - 净收取权利金'
  ],
  example: '卖出100C与100P各收3元，同时买入106C与94P各花1元，净收4元/股。到期若≈100附近，收益最大。',
  stepNotes: [
    'Step 1：卖出平值看涨与看跌，赚时间价值。',
    'Step 2：买入更远两翼封顶风险。'
  ],
  legs: [
    { id: 'sc', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 3, option: { type: 'call', strike: 100 } },
    { id: 'sp', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 3, option: { type: 'put', strike: 100 } },
    { id: 'bc', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 1, option: { type: 'call', strike: 106 } },
    { id: 'bp', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 1, option: { type: 'put', strike: 94 } }
  ],
}

export default strategy
