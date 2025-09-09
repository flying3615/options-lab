import type { Strategy } from '../../../lib/types'

const strategy: Strategy = {
  id: 'bear-put-spread',
  name: '熊市看跌价差（Bear Put Spread）',
  referencePrice: 100,
  tags: ['方向：温和看空', '支付权利金', '风险/收益：有限'],
  summary: '高价买入看跌 + 低价卖出看跌，成本降低；盈亏有限。',
  description: '熊市看跌价差通过买入较高执行价看跌并卖出较低执行价看跌，降低净成本。最大盈利为执行价差减净支出，最大亏损为净支出。适合温和下行预期。',
  suitableFor: ['温和下跌预期'],
  pros: ['成本较低', '盈亏清晰'],
  cons: ['下行收益封顶'],
  risks: ['若下跌不足以覆盖成本则亏损'],
  concept: '用卖出较低执行价的看跌来补贴更贵的看跌，使得看空布局更省成本。',
  formula: [
    '最大盈利 ≈ (高执行价 - 低执行价) × 合约乘数 - 净支出',
    '最大亏损 ≈ 净支出',
    '盈亏平衡点 ≈ 高执行价 - 每股净支出'
  ],
  example: '买入102P花4元，卖出95P收2元，净支出2元/股。到期若≤95，盈利≈(102-95)×100 - 200 = 500；若≥102，亏损≈200。',
  stepNotes: [
    'Step 1：买入高执行价看跌，曲线向下但成本较高。',
    'Step 2：卖出低执行价看跌，曲线在低处被封顶，同时降低成本。'
  ],
  legs: [
    { id: 'long-put', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 4, option: { type: 'put', strike: 102 } },
    { id: 'short-put', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'put', strike: 95 } },
  ],
}

export default strategy
