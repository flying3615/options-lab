import type { Strategy } from '../../../lib/types'

const strategy: Strategy = {
  id: 'synthetic-short',
  name: '合成空头（Synthetic Short）',
  referencePrice: 100,
  tags: ['方向：看空', '净保费：≈0', '风险：上行较大'],
  summary: '卖出看涨 + 买入看跌（同一执行价），构建与空头期货类似的线性暴露。',
  description: '复制空头敞口：下行获利，上行风险随价格上升而增加（理论无限）。',
  formula: ['PnL ≈ K − S ± 净保费×乘数（到期）'],
  example: '卖100C收5，买100P花5，净保费≈0；到期PnL近似线性于标的价格变化（反向）。',
  legs: [
    { id: 'sc100', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 5, option: { type: 'call', strike: 100 } },
    { id: 'lp100', kind: 'option', position: 'long',  qty: 1, multiplier: 100, entryPrice: 5, option: { type: 'put',  strike: 100 } },
  ],
}

export default strategy
