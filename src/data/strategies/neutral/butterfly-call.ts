import type { Strategy } from '../../../lib/types'

const strategy: Strategy = {
  id: 'butterfly-call',
  name: '蝶式（Call Butterfly）',
  referencePrice: 100,
  tags: ['方向：中性', '支付少量权利金', '风险/收益：有限'],
  summary: '两端买入看涨，中间卖出2份看涨，目标在中间行权附近获利。',
  description: '蝶式是通过买入低、高执行价看涨各一份，并卖出中间执行价看涨两份。若到期价格靠近中间执行价，收益最大；远离则亏损有限（为净支出）。常用于博弈价格收敛或事件后回归。',
  suitableFor: ['目标价交易', '博弈收敛'],
  pros: ['成本较低', '最大亏损有限'],
  cons: ['窗口窄，需要价格靠近目标'],
  risks: ['滑点与指派风险（卖出腿）'],
  concept: '在一个目标价位设置“峰值”，越靠近越赚，远离就亏得不多。',
  formula: [
    '最大盈利 ≈ 峰值高度（与中间执行价附近） - 净支出',
    '最大亏损 ≈ 净支出'
  ],
  example: '买95C与105C，各花少量保费；卖100C两份收保费。若到期≈100附近，收益最高；若远离100，上下两端亏损受限。',
  stepNotes: [
    'Step 1：买入低与高执行价看涨，建立两侧保护。',
    'Step 2：卖出中间执行价看涨两份，形成中间的“峰”，博取价格收敛至目标。'
  ],
  legs: [
    { id: 'lc1', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 3, option: { type: 'call', strike: 95 } },
    { id: 'sc2', kind: 'option', position: 'short', qty: 2, multiplier: 100, entryPrice: 2, option: { type: 'call', strike: 100 } },
    { id: 'lc2', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'call', strike: 105 } },
  ],
}

export default strategy
