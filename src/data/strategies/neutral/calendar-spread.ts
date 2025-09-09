import type { Strategy } from '../../../lib/types'

const strategy: Strategy = {
  id: 'calendar-spread',
  name: '日历价差（Calendar Spread）',
  referencePrice: 100,
  tags: ['中性', '波动率：看涨', '时间价值差', '知识卡'],
  summary: '同一执行价、不同到期：通常买远月、卖近月，利用时间价值与Vega差异（知识卡片）。',
  description: '日历价差依赖近/远月时间价值衰减与隐含波动率差异，当前站内引擎聚焦到期盈亏，不绘制该组合的动态曲线。点击进入知识页了解核心逻辑、适用场景与风险管理。',
  legs: [],
  knowledgeOnly: true,
  linkTo: '/calendar'
}

export default strategy
