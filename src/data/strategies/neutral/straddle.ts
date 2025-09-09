import type { Strategy } from '../../../lib/types'

const strategy: Strategy = {
  id: 'straddle',
  name: '跨式（Long Straddle）',
  referencePrice: 100,
  tags: ['方向：中性', '支付权利金', '波动率：看涨'],
  summary: '同一执行价同时买入看涨与看跌，博大波动。',
  description: '跨式通过在同一执行价买入看涨与看跌，获得对波动率的正暴露。若价格大幅上/下波动，可覆盖双向成本并获利；若价格维持在狭窄区间则亏损为净保费。',
  suitableFor: ['预期大幅波动（事件前后）'],
  pros: ['方向中性，双向获利潜力'],
  cons: ['时间价值流失快（Theta 负）', '成本高'],
  risks: ['波动不足导致亏损'],
  concept: '买两张票，赌“要么涨很多，要么跌很多”。只要波动足够大，方向无所谓。',
  formula: [
    '最大亏损 ≈ 净保费',
    '盈亏平衡点 ≈ 执行价 ± 净保费/每股'
  ],
  example: '在100执行价同时买入看涨5元与看跌5元，净保费10元/股。到期若价格≥110或≤90才开始转盈。',
  stepNotes: [
    'Step 1：买入看涨，向上暴露。',
    'Step 2：买入看跌，向下暴露，组合呈“V”字的两侧打开。'
  ],
  legs: [
    { id: 'lc', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 5, option: { type: 'call', strike: 100 } },
    { id: 'lp', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 5, option: { type: 'put', strike: 100 } },
  ],
}

export default strategy
