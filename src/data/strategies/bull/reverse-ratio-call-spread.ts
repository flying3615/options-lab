import type { Strategy } from '../../../lib/types'

const strategy: Strategy = {
  id: 'reverse-ratio-call-spread',
  name: '看涨比例反向（Reverse Ratio Call 1x2）',
  referencePrice: 100,
  tags: ['方向：看多', '净保费：≈0', '风险：温和下行'],
  summary: '卖出1份较低执行价看涨，同时买入2份较高执行价看涨；上涨无上限，温和下行有限亏损或近零。',
  description: '在预期上行且可能出现加速时使用；与1x2比例看涨相反（多买少卖），上行获得更强暴露。',
  formula: ['上行：理论无限', '下行：取决于初始净支出/收入（本示例≈0）'],
  example: '卖100C收4，买2×105C各花2，净支出≈0；若大涨，上行盈利扩大；温和下行亏损有限。',
  legs: [
    { id: 'sc100',  kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 4, option: { type: 'call', strike: 100 } },
    { id: 'lc105x2', kind: 'option', position: 'long',  qty: 2, multiplier: 100, entryPrice: 2, option: { type: 'call', strike: 105 } },
  ],
}

export default strategy
