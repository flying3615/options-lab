import type { Strategy } from '../../../lib/types'

const strategy: Strategy = {
  id: 'bull-put-credit-spread',
  name: '牛市看跌信用价差（Bull Put Credit Spread）',
  referencePrice: 100,
  tags: ['方向：温和看多', '收取权利金', '风险/收益：有限'],
  summary: '卖出较高执行价看跌并买入更低执行价看跌，获得净权利金；上行或不跌获利，风险有限。',
  description: '通过卖出较高执行价的看跌期权收保费，同时买入更低执行价的看跌作为保护。适合温和看多或希望以有界风险赚时间价值的场景。',
  suitableFor: ['温和上涨/不跌', '希望有限风险的收权利金'],
  pros: ['净收保费', '风险有限、保证金友好'],
  cons: ['上涨收益被保费所限', '下破保护区间仍会亏损'],
  risks: ['事件性下跌导致触发最大亏损'],
  concept: '卖出“更近的保险”收保费，同时买更远的“再保险”限制最坏亏损。',
  formula: [
    '最大盈利 ≈ 净收取权利金',
    '最大亏损 ≈ (高执行价 - 低执行价) × 合约乘数 - 净收取权利金'
  ],
  example: '卖出97P收2元，买入94P花1元，净收1元/股。若到期≥97，盈利≈1×100=100；若≤94，亏损≈(97-94)×100 - 100 = 200。',
  stepNotes: [
    'Step 1：卖出较高执行价看跌，赚时间价值但承受下行风险。',
    'Step 2：买入更低执行价看跌，上限风险。'
  ],
  legs: [
    { id: 'sp-h', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'put', strike: 97 } },
    { id: 'lp-l', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 1, option: { type: 'put', strike: 94 } }
  ],
}

export default strategy
