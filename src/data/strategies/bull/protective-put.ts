import type { Strategy } from '../../../lib/types'

const strategy: Strategy = {
  id: 'protective-put',
  name: '保护性看跌（Protective Put）',
  referencePrice: 100,
  tags: ['方向：看多', '支付权利金', '风险：有限'],
  summary: '持股同时买入看跌作为保险，限制下行亏损，成本为保费。',
  description: '保护性看跌通过买入看跌期权对冲持股的下行风险，最大亏损约为（股票成本-看跌执行价）+ 保费。适用于看多但担心短期波动或黑天鹅的场景。',
  suitableFor: ['看多但需控制回撤', '财报/事件前的仓位保险'],
  pros: ['下行风险有限', '心态稳定、便于持仓'],
  cons: ['需要支付保费', '若无下跌，保费折损收益'],
  risks: ['隐含波动率上升时成本更高', '择时不当造成保费浪费'],
  concept: '给股票买保险：用看跌对冲大跌。保险费就是权利金，下跌到某价位后亏损被封住。',
  formula: [
    '最大亏损 ≈ (股票成本 - 看跌执行价) × 股数 + 看跌保费 × 合约乘数',
    '盈亏平衡点 ≈ 股票成本 + 看跌保费'
  ],
  example: '以100元持有100股，买入95执行价看跌花3元/股。若暴跌到80，亏损≈(100-95)×100 + 300 = 800，而非单纯持股的2000。',
  stepNotes: [
    'Step 1：持有股票，线性暴露。',
    'Step 2：买入看跌，曲线下方被“托住”，下行亏损受限，但整体曲线下移（支付保费）。'
  ],
  legs: [
    { id: 'stock', kind: 'stock', position: 'long', qty: 100, entryPrice: 100 },
    { id: 'long-put', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 3, option: { type: 'put', strike: 95 } },
  ],
}

export default strategy
