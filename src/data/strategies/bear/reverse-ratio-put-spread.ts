import type { Strategy } from '../../../lib/types'

const strategy: Strategy = {
  id: 'reverse-ratio-put-spread',
  name: '看跌比例反向（Reverse Ratio Put 1x2）',
  referencePrice: 100,
  tags: ['方向：看空', '净保费：≈0', '风险：温和上行'],
  summary: '卖出1份较高执行价看跌，同时买入2份较低执行价看跌；大幅下行盈利扩大，上行亏损有限。',
  description: '用于捕捉急跌风险尾部；与1x2比例看跌相反（少卖多买），下行暴露更强。',
  formula: ['下行：理论无限盈利', '上行：取决于净支出/收入（本示例≈0）'],
  example: '卖100P收4，买2×95P各花2，净支出≈0；若大跌，下行盈利扩大；温和上行亏损有限。',
  legs: [
    { id: 'sp100',  kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 4, option: { type: 'put',  strike: 100 } },
    { id: 'lp95x2', kind: 'option', position: 'long',  qty: 2, multiplier: 100, entryPrice: 2, option: { type: 'put',  strike: 95  } },
  ],
}

export default strategy
