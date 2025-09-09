import type { Strategy } from '../../../lib/types'

const strategy: Strategy = {
  id: 'bear-call-credit-spread',
  name: '熊市看涨信用价差（Bear Call Credit Spread）',
  referencePrice: 100,
  tags: ['方向：温和看空', '收取权利金', '风险/收益：有限'],
  summary: '卖出较低执行价看涨并买入更高执行价看涨，获得净权利金；不涨或小涨获利，风险有限。',
  description: '通过卖出较低执行价的看涨收保费，同时买入更高执行价的看涨封顶风险。适合温和看空或中性预期。',
  suitableFor: ['温和看空/不涨', '希望有限风险的收权利金'],
  pros: ['净收保费', '风险明确且有限'],
  cons: ['下跌收益有限于保费', '若上涨超保护区间将触发最大亏损'],
  risks: ['事件性上破导致接近最大亏损'],
  concept: '卖出“较近的上行”换保费，同时买“更远的上行”做保险。',
  formula: [
    '最大盈利 ≈ 净收取权利金',
    '最大亏损 ≈ (高执行价 - 低执行价) × 合约乘数 - 净收取权利金'
  ],
  example: '卖出103C收2元，买入106C花1元，净收1元/股。若到期≤103，盈利≈100；若≥106，亏损≈(106-103)×100 - 100 = 200。',
  stepNotes: [
    'Step 1：卖出较低执行价看涨，赚时间价值但承受上行风险。',
    'Step 2：买入更高执行价看涨，封顶风险。'
  ],
  legs: [
    { id: 'sc-l', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'call', strike: 103 } },
    { id: 'lc-h', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 1, option: { type: 'call', strike: 106 } }
  ],
}

export default strategy
