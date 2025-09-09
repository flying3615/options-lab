import type { Strategy } from '../../../lib/types'

const strategy: Strategy = {
  id: 'ratio-call-spread',
  name: '比例看涨（Ratio Call Spread 1x2）',
  referencePrice: 100,
  tags: ['方向：看多/中性', '净保费：0', '风险：无限'],
  summary: '买入1份较低执行价看涨，同时卖出2份较高执行价看涨；中等上涨区域获利，极端上涨风险扩大。',
  description: '用两份更高执行价的卖出看涨来补贴较低执行价的买入看涨，形成在某一上方区间收益较高、极端上涨风险扩大的形状。',
  suitableFor: ['温和上涨且不预期极端大涨'],
  pros: ['可能获得净收保费', '在目标区间收益较高'],
  cons: ['上行超过二次交点后风险扩大（理论无限）'],
  risks: ['极端上涨导致亏损放大'],
  concept: '以“额外卖出的上行机会”补贴成本，换来目标区间更陡的收益。',
  formula: [
    '净保费 ≈ 2×高执行价保费 - 低执行价保费',
    '极端上涨风险：理论无限'
  ],
  example: '买入100C花4元，卖出2×105C各收2元，净收0元/股。若到期≈105附近收益较佳；若大涨远超105，风险增大。',
  legs: [
    { id: 'lc', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 4, option: { type: 'call', strike: 100 } },
    { id: 'sc1', kind: 'option', position: 'short', qty: 2, multiplier: 100, entryPrice: 2, option: { type: 'call', strike: 105 } }
  ],
}

export default strategy
