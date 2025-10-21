import type { Strategy } from '../../../lib/types';

const strategy: Strategy = {
  id: 'iron-condor-long',
  name: '买入铁鹰式 (Long Iron Condor)',
  referencePrice: 100,
  tags: ['方向：非中性', '支付权利金', '风险：有限'],
  summary: '买入一个虚值的宽跨式期权，同时卖出一个更宽的两翼作为保护，以博取股价大幅波动的收益。',
  description: '买入铁鹰式是一种非中性策略，适用于预期股价在未来一段时间内会发生较大波动的市场情况。它由一个熊市看涨信用价差和一个牛市看跌信用价差组合而成，通过支付净权利金建立头寸。只要股价保持在卖出的两个执行价之外，策略就能盈利。',
  concept: '铁鹰式就像是为股价设定一个“安全走廊”。你买入走廊的“墙壁”（买入虚值看涨和看跌期权），支付租金（权利金）。同时，你又在更远的地方卖了两份“意外保险”（卖出更虚值的期权），以降低成本。只要股价乖乖地在走廊外活动，你就能稳赚租金。',
  pros: [
    '**双向获利**：向上或向下的较大波动都可能盈利，押注的是波动本身。',
    '**风险有限**：最大亏损为净权利金（借记），风险明确可控。',
    '**资金占用较低**：相较直接买跨/宽跨，成本更低且有外侧保护。',
  ],
  cons: [
    '**时间价值不利**：作为净买方，Theta 对你不利；若波动不足将亏损。',
    '**需要较大波动**：若价格停留在中间区间（两卖出执行价之间），会亏损净权利金。',
    '**四腿交易**：建立与调整较复杂，流动性与成本需关注。',
  ],
  example: (
    <div>
      <p>你预测R公司股票（当前股价$100）未来一个月可能出现较大波动。你建立了一个买入铁鹰式（净支出/借记）：</p>
      <ul>
        <li>买入1张执行价为$97的看跌期权，花费$2/股。</li>
        <li>卖出1张执行价为$94的看跌期权，收入$1/股。</li>
        <li>买入1张执行价为$103的看涨期权，花费$2/股。</li>
        <li>卖出1张执行价为$106的看涨期权，收入$1/股。</li>
      </ul>
      <p>净权利金 = ($2 - $1) + ($2 - $1) = $2/股，即 <strong>$200</strong>，这是本策略的最大亏损。</p>
      <p><strong>情景一：到期收于$90或$110（走出区间）</strong></p>
      <p>一侧价差达到最大价值$3/股，另一侧为0，净利润 = $3 - $2 = <strong>$1/股（$100）</strong>，为最大利润。</p>
      <p><strong>情景二：到期收于$100（停在中间）</strong></p>
      <p>两侧价差均为0，亏损净权利金 <strong>$200</strong>（最大亏损）。</p>
      <p><strong>盈亏平衡点</strong></p>
      <p>下方 BE = 长看跌执行价 97 − $2 = <strong>$95</strong>；上方 BE = 长看涨执行价 103 + $2 = <strong>$105</strong>。</p>
    </div>
  ),
  formula: [
    '最大盈利 = (翼宽 - 每股净权利金) × 合约乘数',
    '最大亏损 = 每股净权利金 × 合约乘数',
    '上方盈亏平衡点 = 长看涨的执行价 + 每股净权利金',
    '下方盈亏平衡点 = 长看跌的执行价 - 每股净权利金',
  ],
  legs: [
    { id: 'lp97', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'put', strike: 97 } },
    { id: 'sp94', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 1, option: { type: 'put', strike: 94 } },
    { id: 'lc103', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'call', strike: 103 } },
    { id: 'sc106', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 1, option: { type: 'call', strike: 106 } },
  ],
};

export default strategy;