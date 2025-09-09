import type { Strategy } from '../../../lib/types'

const strategy: Strategy = {
  id: 'strangle',
  name: '宽跨（Long Strangle）',
  referencePrice: 100,
  tags: ['方向：中性', '支付权利金', '波动率：看涨'],
  summary: '不同行权价买入看涨与看跌，成本低于跨式，门槛更高。',
  description: '宽跨在不同行权价买入看涨与看跌，降低成本但需要更大幅度的波动才转盈。',
  suitableFor: ['大波动预期但希望降低保费'],
  pros: ['成本低于跨式'],
  cons: ['需要更大波动才盈利'],
  risks: ['波动不足亏损'],
  concept: '降低门票价（保费），但要求“更大波动”才不亏。',
  formula: [
    '最大亏损 ≈ 净保费',
    '盈亏平衡点 ≈ 看涨执行价 + 净保费/每股；看跌执行价 - 净保费/每股'
  ],
  example: '买入103C花4元与97P花3元，净保费7元/股。到期需≥110或≤90才开始转盈。',
  stepNotes: [
    'Step 1：买入看涨，打开上侧暴露。',
    'Step 2：买入看跌，打开下侧暴露，转盈门槛高于跨式。'
  ],
  legs: [
    { id: 'lc', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 4, option: { type: 'call', strike: 103 } },
    { id: 'lp', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 3, option: { type: 'put', strike: 97 } },
  ],
}

export default strategy
