import type { Strategy } from '../../../lib/types'

const strategy: Strategy = {
  id: 'iron-butterfly-long',
  name: '多头铁蝶（Long Iron Butterfly）',
  referencePrice: 100,
  tags: ['方向：中性', '支付权利金', '风险：有限'],
  summary: '买入中心跨式并卖出更远两翼（或等价反向铁蝶），目标在中心附近获利，亏损有限。',
  description: '与“空头铁蝶（收权利金）”相反，支付净权利金换取中心附近的峰值收益，适合博弈价格收敛至中心价位。',
  formula: ['最大盈利：中心附近（扣除净支出）', '最大亏损：净支出', '收支平衡点：中心 ± 净支出/股'],
  example: '买100C、买100P各花3；卖106C、卖94P各收1，净支出4/股；到期≈100附近收益最高。',
  legs: [
    { id: 'lc100', kind: 'option', position: 'long',  qty: 1, multiplier: 100, entryPrice: 3, option: { type: 'call', strike: 100 } },
    { id: 'lp100', kind: 'option', position: 'long',  qty: 1, multiplier: 100, entryPrice: 3, option: { type: 'put',  strike: 100 } },
    { id: 'sc106', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 1, option: { type: 'call', strike: 106 } },
    { id: 'sp94',  kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 1, option: { type: 'put',  strike: 94  } },
  ],
}

export default strategy
