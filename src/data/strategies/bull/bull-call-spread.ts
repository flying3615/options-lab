import type { Strategy } from '../../../lib/types'

const strategy: Strategy = {
  id: 'bull-call-spread',
  name: '牛市看涨价差（Bull Call Spread）',
  referencePrice: 100,
  tags: ['方向：温和看多', '支付权利金', '风险/收益：有限'],
  summary: '低价买入看涨 + 高价卖出看涨，降低成本；盈亏均有限。',
  description: '牛市看涨价差通过买入较低执行价的看涨并卖出较高执行价的看涨，以降低净成本。最大盈利为执行价差减去净支出，最大亏损为净支出。适用于预期温和上涨、对成本敏感的场景。',
  suitableFor: ['温和上涨预期', '愿意用封顶收益换更低成本'],
  pros: ['成本低于单买看涨', '盈亏明确，便于风险控制'],
  cons: ['上行收益被封顶', '若涨幅不足以覆盖成本则亏损'],
  risks: ['跨价差间隔选择不当导致性价比低'],
  concept: '用“卖出更高执行价的看涨”来补贴“买入较低执行价的看涨”，形成成本更低的看多组合。',
  formula: [
    '最大盈利 ≈ (高执行价 - 低执行价) × 合约乘数 - 净支出',
    '最大亏损 ≈ 净支出',
    '盈亏平衡点 ≈ 低执行价 + 每股净支出'
  ],
  example: '买入98C花4元，卖出105C收2元，净支出2元/股。到期若≥105，盈利≈(105-98)×100 - 200 = 500；若≤98，亏损≈200。',
  stepNotes: [
    'Step 1：买入低执行价看涨，曲线向上但成本较高。',
    'Step 2：卖出高执行价看涨，曲线在高处被封顶，同时拉低整体成本。'
  ],
  legs: [
    { id: 'long-call', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 4, option: { type: 'call', strike: 98 } },
    { id: 'short-call', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'call', strike: 105 } },
  ],
}

export default strategy
