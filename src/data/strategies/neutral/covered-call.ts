import type { Strategy } from '../../../lib/types'

const strategy: Strategy = {
  id: 'covered-call',
  name: '备兑开仓（Covered Call）',
  referencePrice: 100,
  tags: ['方向：中性偏多', '收取权利金', '风险：下行暴露'],
  summary: '持股同时卖出看涨，收保费降低持仓成本，但上涨收益被封顶。',
  description: '备兑开仓是在持有标的股票的前提下，卖出相同数量的看涨期权以收取权利金。若到期股价不超过执行价，保费全部留存；若超过执行价，股票上行收益在执行价处被封顶，同时可能被指派卖出股票。适用于对标的中性偏多、预期波动不大的行情。',
  suitableFor: ['中性至温和上涨', '希望用保费降低持仓成本'],
  pros: ['收取权利金，降低成本', '轻度看多时提升收益率'],
  cons: ['上涨被封顶，放弃超额收益', '标的大跌时仍面临下行风险'],
  risks: ['提前指派风险', '除权除息影响期权定价与指派概率'],
  concept: '你把“未来某价位以上的上涨”出租出去，换来一笔即时的现金（权利金）。换句话说：用上行的上限，换取今天的现金流。',
  formula: [
    '最大收益 ≈ (执行价 - 股票成本) × 股数 + 净权利金',
    '最大亏损 ≈ (股票成本 - 0) × 股数 - 净权利金（理论上接近持股风险）'
  ],
  example: '以100元持有100股，同时卖出105执行价看涨收取3元/股。到期若≤105，保费300全留；若到期=110，被指派卖出，利润≈(105-100)×100+300=800。',
  stepNotes: [
    'Step 1：持有股票，多头线性暴露，价格越高越盈利，越低越亏损。',
    'Step 2：卖出看涨，曲线在执行价处被“压平”，上行收益被封顶，同时获得权利金抬高整体曲线。'
  ],
  legs: [
    { id: 'stock', kind: 'stock', position: 'long', qty: 100, entryPrice: 100 },
    { id: 'short-call', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 3, option: { type: 'call', strike: 105 } },
  ],
}

export default strategy
