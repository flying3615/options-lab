import type { Strategy } from '../../../lib/types'

const strategy: Strategy = {
  id: 'short-risk-reversal',
  name: '空头风险反转（Risk Reversal Short）',
  referencePrice: 100,
  tags: ['方向：看空', '净保费：≈0', '风险：上行较大'],
  summary: '买入OTM看跌 + 卖出OTM看涨，构建熊市方向性，通常接近零成本。',
  description: '看空时用卖出上方看涨补贴买入下方看跌，下行获利，上行承担较大风险。',
  formula: ['下行盈利：超出看跌执行价后扩大', '上行风险：执行价以上风险扩大'],
  example: '买95P花2、卖105C收2，净保费≈0；下破95获利，上破105风险增大。',
  legs: [
    { id: 'lp95',  kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'put',  strike: 95  } },
    { id: 'sc105', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'call', strike: 105 } },
  ],
}

export default strategy
