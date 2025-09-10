import type { Strategy } from '../../../lib/types'

const strategy: Strategy = {
  id: 'short-straddle',
  name: '空头跨式（Short Straddle）',
  referencePrice: 100,
  tags: ['方向：中性', '收取权利金', '风险：无限'],
  summary: '同一执行价同时卖出看涨与看跌，收取较高权利金；若大幅波动，双向风险无限。',
  description: '在相同行权价卖出1C+1P，适合对波动收敛有较强信念的场景。上涨或下跌过多都会造成亏损，需严格风控与保护方案。',
  formula: ['最大盈利 ≈ 净收取权利金', '盈亏平衡点 ≈ 执行价 ± 净权利金/每股', '风险：双向理论无限'],
  example: '卖出100C收5，卖出100P收5，净收10/股。到期若价格在90~110内盈利，超出则亏损扩大。',
  legs: [
    { id: 'sc', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 5, option: { type: 'call', strike: 100 } },
    { id: 'sp', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 5, option: { type: 'put', strike: 100 } },
  ],
}

export default strategy
