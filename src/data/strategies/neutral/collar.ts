import type { Strategy } from '../../../lib/types'

const strategy: Strategy = {
  id: 'collar',
  name: '领口策略（Collar）',
  referencePrice: 100,
  tags: ['对冲/保护', '收取权利金', '风险/收益：有限'],
  summary: '持股 + 买入看跌（下方保护）+ 卖出看涨（上方封顶），用保费对冲并降低净成本。',
  description: '在持有标的的同时，买入较低执行价的看跌作为保险，并卖出较高执行价的看涨以抵消部分或全部保费。适合持有股票且担心下行的场景。',
  suitableFor: ['持股防守', '事件前后对冲回撤'],
  pros: ['下行风险受限', '可用卖出看涨抵消保费'],
  cons: ['上行收益被封顶', '可能错过大涨'],
  risks: ['提前指派、除权除息影响'],
  concept: '给持股加“下方安全带”和“上方限速器”。',
  formula: [
    '最大亏损 ≈ (股票成本 - 看跌执行价) × 股数 + 净保费',
    '最大收益 ≈ (看涨执行价 - 股票成本) × 股数 - 净保费'
  ],
  example: '持股100，买95P花2元/股，卖105C收2元/股，净保费≈0。到期若≤95，下方被保护；若≥105，上行被封顶。',
  stepNotes: [
    'Step 1：持股得到上行收益与下行风险。',
    'Step 2：买入看跌托底风险。',
    'Step 3：卖出看涨获得现金流但封顶上行。'
  ],
  legs: [
    { id: 'stock', kind: 'stock', position: 'long', qty: 100, entryPrice: 100 },
    { id: 'lp', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'put', strike: 95 } },
    { id: 'sc', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'call', strike: 105 } }
  ],
}

export default strategy
