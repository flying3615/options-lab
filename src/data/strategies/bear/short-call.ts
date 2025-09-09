import type { Strategy } from '../../../lib/types'

const strategy: Strategy = {
  id: 'short-call',
  name: '单腿：卖出看涨（Short Call）',
  referencePrice: 100,
  tags: ['方向：看空/中性', '收取权利金', '风险：无限'],
  summary: '赚取保费但面临上行无限风险（无股对冲）。',
  description: '卖出看涨在价格不涨或回落时赚取时间价值；若大涨，亏损无限（裸卖风险高）。',
  concept: '相当于卖出“上行机会”，换取即时保费。',
  formula: ['最大盈利 ≈ 保费', '风险：理论无限'],
  example: '卖出105C收2元，若到期≤105，保费全留；若大涨，亏损扩大。',
  legs: [
    { id: 'sc', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'call', strike: 105 } },
  ],
}

export default strategy
