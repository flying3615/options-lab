import type { Strategy } from '../../../lib/types'

const strategy: Strategy = {
  id: 'short-put',
  name: '单腿：卖出看跌（Short Put）',
  referencePrice: 100,
  tags: ['方向：看多/中性', '收取权利金', '风险：较大'],
  summary: '赚取保费并有机会以较低净成本买入标的，下行风险较大。',
  description: '卖出看跌在价格不跌时赚保费；大跌将被指派买入，亏损扩大（下行受限于到零）。',
  concept: '用承担下行风险换取保费与可能的低价买入。',
  formula: ['最大盈利 ≈ 保费', '最大亏损 ≈ (执行价 - 0)×合约乘数 - 保费×合约乘数'],
  example: '卖出95P收2元，到期≥95保费全留；若跌至80，按95买入并面临浮亏。',
  legs: [
    { id: 'sp', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'put', strike: 95 } },
  ],
}

export default strategy
