import type { Strategy } from '../../../lib/types'

const strategy: Strategy = {
  id: 'long-put',
  name: '单腿：买入看跌（Long Put）',
  referencePrice: 100,
  tags: ['方向：看空/保护', '支付权利金', '风险：有限'],
  summary: '看空或做保险，最大亏损为保费，收益随下行增加。',
  description: '买入看跌在价格下跌时获利，上涨则损失保费。',
  concept: '为下跌买一张“保护伞”。',
  formula: ['最大亏损 ≈ 保费', '盈亏平衡点 ≈ 执行价 - 保费/每股'],
  example: '买入100P花4元，到期≤96开始转盈。',
  legs: [
    { id: 'lp', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 4, option: { type: 'put', strike: 100 } },
  ],
}

export default strategy
