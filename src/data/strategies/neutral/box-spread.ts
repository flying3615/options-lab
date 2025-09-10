import type { Strategy } from '../../../lib/types'

const strategy: Strategy = {
  id: 'box-spread',
  name: '箱形价差 / 转换（Box Spread / Conversion）',
  referencePrice: 100,
  tags: ['锁定/套利', '知识卡'],
  summary: '由一组看涨/看跌价差组合而成，到期价值与标的价格无关，理论上可用于锁定价差（忽略成本）。',
  description: '典型构成：多头箱（买入牛市价差+买入熊市价差）；空头箱（相反）。到期价值约等于两执行价差距，实务中多用于套利与锁定敞口。',
  legs: [],
  knowledgeOnly: true,
  linkTo: '/box'
}

export default strategy
