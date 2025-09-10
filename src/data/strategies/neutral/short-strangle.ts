import type { Strategy } from '../../../lib/types'

const strategy: Strategy = {
  id: 'short-strangle',
  name: '空头宽跨（Short Strangle）',
  referencePrice: 100,
  tags: ['方向：中性', '收取权利金', '风险：无限'],
  summary: '在不同行权价卖出看涨与看跌，权利金低于跨式、窗口更宽，但双向风险仍无限。',
  description: '卖出远离标的价的看涨与看跌，降低被触发概率，但一旦突破仍有较大风险。',
  formula: ['最大盈利 ≈ 净收取权利金', '盈亏平衡点 ≈ 看跌执行价 - 净权利金/股 与 看涨执行价 + 净权利金/股'],
  example: '卖出97P收3与103C收4，净收7/股；到期落在97~103内盈利，否则风险扩大。',
  legs: [
    { id: 'sp97', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 3, option: { type: 'put', strike: 97 } },
    { id: 'sc103', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 4, option: { type: 'call', strike: 103 } },
  ],
}

export default strategy
