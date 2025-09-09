import type { Strategy } from '../lib/types'

export const strategies: Strategy[] = [
  {
    id: 'long-call',
    name: '单腿：买入看涨（Long Call）',
    referencePrice: 100,
    tags: ['方向：看多', '支付权利金', '风险：有限'],
    summary: '看多上行，最大亏损为保费，收益潜力无限。',
    description: '买入看涨看多上行，若到期价高于执行价，获得内在价值；若未超过，亏损为保费。',
    concept: '用有限成本参与上涨行情，时间价值会随时间流逝。',
    formula: ['最大亏损 ≈ 保费', '盈亏平衡点 ≈ 执行价 + 保费/每股'],
    example: '买入100C花5元，到期若≥105开始转盈。',
    legs: [
      { id: 'lc', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 5, option: { type: 'call', strike: 100 } },
    ],
  },
  {
    id: 'short-call',
    name: '单腿：卖出看涨（Short Call）',
    referencePrice: 100,
    tags: ['方向：看空/中性', '收取权利金', '风险：无限'],
    summary: '赚取保费但面临上行无限风险（无股对冲）。',
    description: '卖出看涨在价格不涨或回落时赚取时间价值；若大涨，亏损无限（裸卖风险高）。',
    concept: '相当于卖出“上行机会”，换取即时保费。',
    formula: ['最大盈利 ≈ 保费', '风险：理论无限'],
    example: '卖出105C收2元，若到期≤105，保费全留；若大涨，亏损扩大。',
    legs: [
      { id: 'sc', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'call', strike: 105 } },
    ],
  },
  {
    id: 'long-put',
    name: '单腿：买入看跌（Long Put）',
    referencePrice: 100,
    tags: ['方向：看空/保护', '支付权利金', '风险：有限'],
    summary: '看空或做保险，最大亏损为保费，收益随下行增加。',
    description: '买入看跌在价格下跌时获利，上涨则损失保费。',
    concept: '为下跌买一张“保护伞”。',
    formula: ['最大亏损 ≈ 保费', '盈亏平衡点 ≈ 执行价 - 保费/每股'],
    example: '买入100P花4元，到期≤96开始转盈。',
    legs: [
      { id: 'lp', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 4, option: { type: 'put', strike: 100 } },
    ],
  },
  {
    id: 'short-put',
    name: '单腿：卖出看跌（Short Put）',
    referencePrice: 100,
    tags: ['方向：看多/中性', '收取权利金', '风险：较大'],
    summary: '赚取保费并有机会以较低净成本买入标的，下行风险较大。',
    description: '卖出看跌在价格不跌时赚保费；大跌将被指派买入，亏损扩大（下行受限于到零）。',
    concept: '用承担下行风险换取保费与可能的低价买入。',
    formula: ['最大盈利 ≈ 保费', '最大亏损 ≈ (执行价 - 0)×合约乘数 - 保费×合约乘数'],
    example: '卖出95P收2元，到期≥95保费全留；若跌至80，按95买入并面临浮亏。',
    legs: [
      { id: 'sp', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'put', strike: 95 } },
    ],
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    id: 'bear-put-spread',
    name: '熊市看跌价差（Bear Put Spread）',
    referencePrice: 100,
    tags: ['方向：温和看空', '支付权利金', '风险/收益：有限'],
    summary: '高价买入看跌 + 低价卖出看跌，成本降低；盈亏有限。',
    description: '熊市看跌价差通过买入较高执行价看跌并卖出较低执行价看跌，降低净成本。最大盈利为执行价差减净支出，最大亏损为净支出。适合温和下行预期。',
    suitableFor: ['温和下跌预期'],
    pros: ['成本较低', '盈亏清晰'],
    cons: ['下行收益封顶'],
    risks: ['若下跌不足以覆盖成本则亏损'],
    concept: '用卖出较低执行价的看跌来补贴更贵的看跌，使得看空布局更省成本。',
    formula: [
      '最大盈利 ≈ (高执行价 - 低执行价) × 合约乘数 - 净支出',
      '最大亏损 ≈ 净支出',
      '盈亏平衡点 ≈ 高执行价 - 每股净支出'
    ],
    example: '买入102P花4元，卖出95P收2元，净支出2元/股。到期若≤95，盈利≈(102-95)×100 - 200 = 500；若≥102，亏损≈200。',
    stepNotes: [
      'Step 1：买入高执行价看跌，曲线向下但成本较高。',
      'Step 2：卖出低执行价看跌，曲线在低处被封顶，同时降低成本。'
    ],
    legs: [
      { id: 'long-put', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 4, option: { type: 'put', strike: 102 } },
      { id: 'short-put', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'put', strike: 95 } },
    ],
  },
  {
    id: 'straddle',
    name: '跨式（Long Straddle）',
    referencePrice: 100,
    tags: ['方向：中性', '支付权利金', '波动率：看涨'],
    summary: '同一执行价同时买入看涨与看跌，博大波动。',
    description: '跨式通过在同一执行价买入看涨与看跌，获得对波动率的正暴露。若价格大幅上/下波动，可覆盖双向成本并获利；若价格维持在狭窄区间则亏损为净保费。',
    suitableFor: ['预期大幅波动（事件前后）'],
    pros: ['方向中性，双向获利潜力'],
    cons: ['时间价值流失快（Theta 负）', '成本高'],
    risks: ['波动不足导致亏损'],
    concept: '买两张票，赌“要么涨很多，要么跌很多”。只要波动足够大，方向无所谓。',
    formula: [
      '最大亏损 ≈ 净保费',
      '盈亏平衡点 ≈ 执行价 ± 净保费/每股'
    ],
    example: '在100执行价同时买入看涨5元与看跌5元，净保费10元/股。到期若价格≥110或≤90才开始转盈。',
    stepNotes: [
      'Step 1：买入看涨，向上暴露。',
      'Step 2：买入看跌，向下暴露，组合呈“V”字的两侧打开。'
    ],
    legs: [
      { id: 'lc', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 5, option: { type: 'call', strike: 100 } },
      { id: 'lp', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 5, option: { type: 'put', strike: 100 } },
    ],
  },
  {
    id: 'strangle',
    name: '宽跨（Long Strangle）',
    referencePrice: 100,
    tags: ['方向：中性', '支付权利金', '波动率：看涨'],
    summary: '不同行权价买入看涨与看跌，成本低于跨式，门槛更高。',
    description: '宽跨在不同行权价买入看涨与看跌，降低成本但需要更大幅度的波动才转盈。',
    suitableFor: ['大波动预期但希望降低保费'],
    pros: ['成本低于跨式'],
    cons: ['需要更大波动才盈利'],
    risks: ['波动不足亏损'],
    concept: '降低门票价（保费），但要求“更大波动”才不亏。',
    formula: [
      '最大亏损 ≈ 净保费',
      '盈亏平衡点 ≈ 看涨执行价 + 净保费/每股；看跌执行价 - 净保费/每股'
    ],
    example: '买入103C花4元与97P花3元，净保费7元/股。到期需≥110或≤90才开始转盈。',
    stepNotes: [
      'Step 1：买入看涨，打开上侧暴露。',
      'Step 2：买入看跌，打开下侧暴露，转盈门槛高于跨式。'
    ],
    legs: [
      { id: 'lc', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 4, option: { type: 'call', strike: 103 } },
      { id: 'lp', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 3, option: { type: 'put', strike: 97 } },
    ],
  },
  {
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
  },
  {
    id: 'butterfly-call',
    name: '蝶式（Call Butterfly）',
    referencePrice: 100,
    tags: ['方向：中性', '支付少量权利金', '风险/收益：有限'],
    summary: '两端买入看涨，中间卖出2份看涨，目标在中间行权附近获利。',
    description: '蝶式是通过买入低、高执行价看涨各一份，并卖出中间执行价看涨两份。若到期价格靠近中间执行价，收益最大；远离则亏损有限（为净支出）。常用于博弈价格收敛或事件后回归。',
    suitableFor: ['目标价交易', '博弈收敛'],
    pros: ['成本较低', '最大亏损有限'],
    cons: ['窗口窄，需要价格靠近目标'],
    risks: ['滑点与指派风险（卖出腿）'],
    concept: '在一个目标价位设置“峰值”，越靠近越赚，远离就亏得不多。',
    formula: [
      '最大盈利 ≈ 峰值高度（与中间执行价附近） - 净支出',
      '最大亏损 ≈ 净支出'
    ],
    example: '买95C与105C，各花少量保费；卖100C两份收保费。若到期≈100附近，收益最高；若远离100，上下两端亏损受限。',
    stepNotes: [
      'Step 1：买入低与高执行价看涨，建立两侧保护。',
      'Step 2：卖出中间执行价看涨两份，形成中间的“峰”，博取价格收敛至目标。'
    ],
    legs: [
      { id: 'lc1', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 3, option: { type: 'call', strike: 95 } },
      { id: 'sc2', kind: 'option', position: 'short', qty: 2, multiplier: 100, entryPrice: 2, option: { type: 'call', strike: 100 } },
      { id: 'lc2', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'call', strike: 105 } },
    ],
  },
  {
    id: 'bull-put-credit-spread',
    name: '牛市看跌信用价差（Bull Put Credit Spread）',
    referencePrice: 100,
    tags: ['方向：温和看多', '收取权利金', '风险/收益：有限'],
    summary: '卖出较高执行价看跌并买入更低执行价看跌，获得净权利金；上行或不跌获利，风险有限。',
    description: '通过卖出较高执行价的看跌期权收保费，同时买入更低执行价的看跌作为保护。适合温和看多或希望以有界风险赚时间价值的场景。',
    suitableFor: ['温和上涨/不跌', '希望有限风险的收权利金'],
    pros: ['净收保费', '风险有限、保证金友好'],
    cons: ['上涨收益被保费所限', '下破保护区间仍会亏损'],
    risks: ['事件性下跌导致触发最大亏损'],
    concept: '卖出“更近的保险”收保费，同时买更远的“再保险”限制最坏亏损。',
    formula: [
      '最大盈利 ≈ 净收取权利金',
      '最大亏损 ≈ (高执行价 - 低执行价) × 合约乘数 - 净收取权利金'
    ],
    example: '卖出97P收2元，买入94P花1元，净收1元/股。若到期≥97，盈利≈1×100=100；若≤94，亏损≈(97-94)×100 - 100 = 200。',
    stepNotes: [
      'Step 1：卖出较高执行价看跌，赚时间价值但承受下行风险。',
      'Step 2：买入更低执行价看跌，上限风险。'
    ],
    legs: [
      { id: 'sp-h', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'put', strike: 97 } },
      { id: 'lp-l', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 1, option: { type: 'put', strike: 94 } }
    ],
  },
  {
    id: 'bear-call-credit-spread',
    name: '熊市看涨信用价差（Bear Call Credit Spread）',
    referencePrice: 100,
    tags: ['方向：温和看空', '收取权利金', '风险/收益：有限'],
    summary: '卖出较低执行价看涨并买入更高执行价看涨，获得净权利金；不涨或小涨获利，风险有限。',
    description: '通过卖出较低执行价的看涨收保费，同时买入更高执行价的看涨封顶风险。适合温和看空或中性预期。',
    suitableFor: ['温和看空/不涨', '希望有限风险的收权利金'],
    pros: ['净收保费', '风险明确且有限'],
    cons: ['下跌收益有限于保费', '若上涨超保护区间将触发最大亏损'],
    risks: ['事件性上破导致接近最大亏损'],
    concept: '卖出“较近的上行”换保费，同时买“更远的上行”做保险。',
    formula: [
      '最大盈利 ≈ 净收取权利金',
      '最大亏损 ≈ (高执行价 - 低执行价) × 合约乘数 - 净收取权利金'
    ],
    example: '卖出103C收2元，买入106C花1元，净收1元/股。若到期≤103，盈利≈100；若≥106，亏损≈(106-103)×100 - 100 = 200。',
    stepNotes: [
      'Step 1：卖出较低执行价看涨，赚时间价值但承受上行风险。',
      'Step 2：买入更高执行价看涨，封顶风险。'
    ],
    legs: [
      { id: 'sc-l', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'call', strike: 103 } },
      { id: 'lc-h', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 1, option: { type: 'call', strike: 106 } }
    ],
  },
  {
    id: 'collar',
    name: '领口策略（Collar）',
    referencePrice: 100,
    tags: ['对冲/保护', '收取权利金', '风险/收益：有限'],
    summary: '持股 + 买入看跌（下方保护）+ 卖出看涨（上方封顶），用保费对冲并降低净成本。',
    description: '在持有标的的同时，买入较低执行价的看跌作为保险，并卖出较高执行价的看涨以抵消部分或全部保费。适合持有股票且担心下行的场景。',
    suitableFor: ['持股防守', '事件前后对冲回撤'],
    pros: ['下行风险受限', '可用卖出看涨抵消保费'],
    cons: ['上行收益被封顶', '可能错过大涨'],
    risks: ['提前指派、除权除息影响'],
    concept: '给持股加“下方安全带”和“上方限速器”。',
    formula: [
      '最大亏损 ≈ (股票成本 - 看跌执行价) × 股数 + 净保费',
      '最大收益 ≈ (看涨执行价 - 股票成本) × 股数 - 净保费'
    ],
    example: '持股100，买95P花2元/股，卖105C收2元/股，净保费≈0。到期若≤95，下方被保护；若≥105，上行被封顶。',
    stepNotes: [
      'Step 1：持股得到上行收益与下行风险。',
      'Step 2：买入看跌托底风险。',
      'Step 3：卖出看涨获得现金流但封顶上行。'
    ],
    legs: [
      { id: 'stock', kind: 'stock', position: 'long', qty: 100, entryPrice: 100 },
      { id: 'lp', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'put', strike: 95 } },
      { id: 'sc', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'call', strike: 105 } }
    ],
  },
  {
    id: 'iron-butterfly',
    name: '铁蝶（Iron Butterfly）',
    referencePrice: 100,
    tags: ['方向：中性', '收取权利金', '风险：有限'],
    summary: '卖出ATM看涨/看跌并买入两翼保护，赚时间价值，风险有限。',
    description: '铁蝶相当于在中间卖出一对平值看涨与看跌（短跨式），并在上下买入更远的虚值作为保护。价格在中间附近到期收益最大。',
    suitableFor: ['区间震荡', '预期波动率回落'],
    pros: ['风险有限', '保费较丰厚（相较铁鹰更集中）'],
    cons: ['窗口更窄，需要价格靠近中心'],
    risks: ['突破风险'],
    concept: '把“中心点附近的波动”租出去，同时用两翼保险封住最坏情况。',
    formula: [
      '最大盈利 ≈ 净收取权利金',
      '最大亏损 ≈ 翅膀价差 × 合约乘数 - 净收取权利金'
    ],
    example: '卖出100C与100P各收3元，同时买入106C与94P各花1元，净收4元/股。到期若≈100附近，收益最大。',
    stepNotes: [
      'Step 1：卖出平值看涨与看跌，赚时间价值。',
      'Step 2：买入更远两翼封顶风险。'
    ],
    legs: [
      { id: 'sc', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 3, option: { type: 'call', strike: 100 } },
      { id: 'sp', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 3, option: { type: 'put', strike: 100 } },
      { id: 'bc', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 1, option: { type: 'call', strike: 106 } },
      { id: 'bp', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 1, option: { type: 'put', strike: 94 } }
    ],
  },
  {
    id: 'ratio-call-spread',
    name: '比例看涨（Ratio Call Spread 1x2）',
    referencePrice: 100,
    tags: ['方向：看多/中性', '净保费：0', '风险：无限'],
    summary: '买入1份较低执行价看涨，同时卖出2份较高执行价看涨；中等上涨区域获利，极端上涨风险扩大。',
    description: '用两份更高执行价的卖出看涨来补贴较低执行价的买入看涨，形成在某一上方区间收益较高、极端上涨风险扩大的形状。',
    suitableFor: ['温和上涨且不预期极端大涨'],
    pros: ['可能获得净收保费', '在目标区间收益较高'],
    cons: ['上行超过二次交点后风险扩大（理论无限）'],
    risks: ['极端上涨导致亏损放大'],
    concept: '以“额外卖出的上行机会”补贴成本，换来目标区间更陡的收益。',
    formula: [
      '净保费 ≈ 2×高执行价保费 - 低执行价保费',
      '极端上涨风险：理论无限'
    ],
    example: '买入100C花4元，卖出2×105C各收2元，净收0元/股。若到期≈105附近收益较佳；若大涨远超105，风险增大。',
    legs: [
      { id: 'lc', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 4, option: { type: 'call', strike: 100 } },
      { id: 'sc1', kind: 'option', position: 'short', qty: 2, multiplier: 100, entryPrice: 2, option: { type: 'call', strike: 105 } }
    ],
  }
,
  {
    id: 'calendar-spread',
    name: '日历价差（Calendar Spread）',
    referencePrice: 100,
    tags: ['中性', '波动率：看涨', '时间价值差', '知识卡'],
    summary: '同一执行价、不同到期：通常买远月、卖近月，利用时间价值与Vega差异（知识卡片）。',
    description: '日历价差依赖近/远月时间价值衰减与隐含波动率差异，当前站内引擎聚焦到期盈亏，不绘制该组合的动态曲线。点击进入知识页了解核心逻辑、适用场景与风险管理。',
    legs: [],
    knowledgeOnly: true,
    linkTo: '/calendar'
  }
]

export function findStrategy(id: string): Strategy | undefined {
  return strategies.find((s) => s.id === id)
}


