import type { Strategy } from '../../../lib/types'

const strategy: Strategy = {
  id: 'synthetic-long',
  name: '合成多头（Synthetic Long）',
  referencePrice: 100,
  tags: ['方向：看多', '净保费：≈0', '风险：类似持股'],
  summary: '买入看涨 + 卖出看跌（同一执行价），构建与多头期货/持股类似的线性暴露。',
  description: '常用于用期权复制多头敞口。上行随价上升而增加，下行风险相当于持有标的的风险（至零）。',
  formula: ['PnL ≈ S − K ± 净保费×乘数（到期）'],
  example: '买100C花5，卖100P收5，净保费≈0；到期PnL近似线性于标的价格变化。',
  legs: [
    { id: 'lc100', kind: 'option', position: 'long',  qty: 1, multiplier: 100, entryPrice: 5, option: { type: 'call', strike: 100 } },
    { id: 'sp100', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 5, option: { type: 'put',  strike: 100 } },
  ],
}

export default strategy
