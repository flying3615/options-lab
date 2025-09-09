import type { Strategy } from '../../../lib/types'

const strategy: Strategy = {
  id: 'long-call',
  name: '单腿：买入看涨（Long Call）',
  referencePrice: 100,
  tags: ['方向：看多', '支付权利金', '风险：有限'],
  summary: '看多上行，最大亏损为保费，收益潜力无限。',
  description: '买入看涨看多上行，若到期价高于执行价，获得内在价值；若未超过，亏损为保费。',
  concept: '用有限成本参与上涨行情，时间价值会随时间流逝。',
  formula: ['最大亏损 ≈ 保费', '盈亏平衡点 ≈ 执行价 + 保费/每股'],
  example: '买入100C花5元，到期若≥105开始转盈。',
  legs: [
    { id: 'lc', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 5, option: { type: 'call', strike: 100 } },
  ],
}

export default strategy
