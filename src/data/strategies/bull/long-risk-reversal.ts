import type { Strategy } from '../../../lib/types'

const strategy: Strategy = {
  id: 'long-risk-reversal',
  name: '多头风险反转（Risk Reversal Long）',
  referencePrice: 100,
  tags: ['方向：看多', '净保费：≈0', '风险：下行较大'],
  summary: '买入OTM看涨 + 卖出OTM看跌，构建牛市方向性，通常接近零成本。',
  description: '当看多且不愿付出太多保费时，用卖出下方看跌补贴买入上方看涨，上行享受涨幅，下行承担较大风险。',
  formula: ['上行盈亏 ≈ 类似多头期货（超出看涨执行价后）', '下行风险：执行价以下风险扩大'],
  example: '买105C花2、卖95P收2，净保费≈0；价格上破105获利，下破95风险增大。',
  legs: [
    { id: 'lc105', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'call', strike: 105 } },
    { id: 'sp95',  kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'put',  strike: 95  } },
  ],
}

export default strategy
