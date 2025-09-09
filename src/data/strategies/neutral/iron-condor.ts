import type { Strategy } from '../../../lib/types'

const strategy: Strategy = {
  id: 'iron-condor',
  name: '铁鹰（Iron Condor）',
  referencePrice: 100,
  tags: ['方向：中性', '收取权利金', '风险：有限'],
  summary: '卖出宽跨并买入更远虚值保护，赚取时间价值，风险有限。',
  description: '铁鹰通过卖出一组虚值看涨/看跌并买入更远虚值作为保护，构建有限风险的收权利金策略。若价格在中间区间内到期，保费为主要收益；超出保护边界时亏损有限。',
  suitableFor: ['区间震荡', '看波动率回落'],
  pros: ['风险有限', '时间价值收益'],
  cons: ['需严格风控', '受隐含波动率变化影响'],
  risks: ['突破风险、事件风险'],
  concept: '卖出“中间的宽跨”赚时间价值，再买更远的保护把最坏情况的亏损封住。',
  formula: [
    '最大盈利 ≈ 净收取权利金',
    '最大亏损 ≈ 翅膀价差（保护与卖出腿之间的距）× 合约乘数 - 净收取权利金'
  ],
  example: '卖97P与103C各收2元，同时买94P与106C各花1元，净收2元/股。只要到期价格落于97~103，保费留存；突破到保护外，亏损被限制。',
  stepNotes: [
    'Step 1：卖出虚值看跌与看涨，建立中间宽跨，获时间价值。',
    'Step 2：在两侧各买入更远虚值作为保护，封顶风险。'
  ],
  legs: [
    { id: 'sp', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'put', strike: 97 } },
    { id: 'bp', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 1, option: { type: 'put', strike: 94 } },
    { id: 'sc', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'call', strike: 103 } },
    { id: 'bc', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 1, option: { type: 'call', strike: 106 } },
  ],
}

export default strategy
