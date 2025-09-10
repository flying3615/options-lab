import type { Strategy } from '../../../lib/types'

const strategy: Strategy = {
  id: 'butterfly-call-short',
  name: '空头蝶式（Short Call Butterfly）',
  referencePrice: 100,
  tags: ['方向：中性', '收取权利金', '风险/收益：有限'],
  summary: '与多头蝶式相反：两端卖出、中间买入两份；在中间执行价附近亏损最大，两端区间盈利有限。',
  description: '适合预期突破或不在中心附近终结的场景，用有限风险收取权利金。',
  formula: ['最大盈利：两端区域（为初始净收入）', '最大亏损：中心附近，约等于翼距 − 净收入'],
  example: '卖95C与105C各收2，买2×100C各花2；若远离100，保留净收入；近100处亏损最大。',
  legs: [
    { id: 'sc95',  kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'call', strike: 95  } },
    { id: 'lc100x2', kind: 'option', position: 'long',  qty: 2, multiplier: 100, entryPrice: 2, option: { type: 'call', strike: 100 } },
    { id: 'sc105', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'call', strike: 105 } },
  ],
}

export default strategy
