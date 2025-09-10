import type { Strategy } from '../../../lib/types'

const strategy: Strategy = {
  id: 'ratio-put-spread',
  name: '比例看跌（Ratio Put Spread 1x2）',
  referencePrice: 100,
  tags: ['方向：看空/中性', '净保费：0', '风险：无限（极端下行）'],
  summary: '买入较高执行价看跌，同时卖出2份较低执行价看跌；温和下行区间收益较佳，极端下行风险扩大。',
  description: '与比例看涨相对，利用卖出更多下方看跌补贴成本，在目标下行区间获利，但极端下行风险增大。',
  formula: ['净保费 ≈ 2×低执行价保费 - 高执行价保费', '极端下行风险：理论无限'],
  example: '买100P花4，卖2×95P各收2，净收0；到期≈95附近较佳；若暴跌远低于95，风险增大。',
  legs: [
    { id: 'lp100', kind: 'option', position: 'long',  qty: 1, multiplier: 100, entryPrice: 4, option: { type: 'put',  strike: 100 } },
    { id: 'sp95x2', kind: 'option', position: 'short', qty: 2, multiplier: 100, entryPrice: 2, option: { type: 'put',  strike: 95  } },
  ],
}

export default strategy
