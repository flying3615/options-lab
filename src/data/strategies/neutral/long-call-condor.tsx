import type { Strategy } from '../../../lib/types';

const strategy: Strategy = {
  id: 'long-call-condor',
  name: '看涨秃鹰式 (Long Call Condor)',
  referencePrice: 100,
  tags: ['方向：中性', '支付权利金', '风险：有限'],
  summary: '买入一份低执行价和一份高执行价的看涨期权，同时卖出两份中间执行价的看涨期权，以博取股价在宽幅区间内盘整的收益。',
  description: '看涨秃鹰式是一种中性策略，适用于预期股价在未来一段时间内会在一个相对较宽的范围内波动的情况。它通过构建一个“平台”形的盈亏曲线，在中间两个执行价之间达到最大利润。如果股价大幅上涨或下跌，亏损将被限制在最初支付的少量净权利金内。',
  concept: '这个策略就像是为股价设置一个“宽阔的平台”。你花少量成本，赌股价最终会停在平台上。你买入平台的“边缘”，卖出平台的“中间”，只要股价在平台上，你就能赚钱。平台越宽，你的盈利区间越大，但成本也越高。',
  pros: [
    '**风险有限**：最大亏损是确定的，即你最初支付的净权利金。',
    '**成本较低**：相比其他策略，建立秃鹰式的成本通常很低。',
    '**高潜在回报率**：如果股价精确地收在中间区间，投资回报率会非常高。',
  ],
  cons: [
    '**盈利区间狭窄**：只有当股价停留在非常窄的范围内时才能盈利，对价格预测的精度要求高。',
    '**时间价值损耗**：如果股价没有如预期般稳定，时间的流逝会对你不利。',
    '**可能提前指派**：卖出的看涨期权有被提前行权的风险。',
  ],
  example: (
    <div>
      <p>你预测M公司股票（当前股价$100）在一个月后会在$98到$102之间波动。于是你建立了一个看涨秃鹰式：</p>
      <ul>
        <li>买入1张执行价为$95的看涨期权，花费$3/股（共$300）。</li>
        <li>卖出1张执行价为$98的看涨期权，收入$2/股（共$200）。</li>
        <li>卖出1张执行价为$102的看涨期权，收入$2/股（共$200）。</li>
        <li>买入1张执行价为$105的看涨期权，花费$3/股（共$300）。</li>
      </ul>
      <p>净权利金 = $2/股（借记，共$200），这是本策略的最大亏损。</p>
      <p><strong>情景一：到期时股价在$98~$102之间（理想情况）</strong></p>
      <p>组合到期价值等于“翼宽”（$98-$95 = $3/股），净利润 = $3 − $2 = <strong>$1/股（$100）</strong>，这是最大利润。</p>
      <p><strong>情景二：到期时股价 ≤ $95 或 ≥ $105（走出两侧）</strong></p>
      <p>到期价值≈0（对称翼宽情况下），净亏损为净权利金 <strong>$200</strong>。</p>
      <p><strong>盈亏平衡点</strong></p>
      <p>下方 BE = 最低执行价 $95 + $2 = <strong>$97</strong>；上方 BE = 最高执行价 $105 − $2 = <strong>$103</strong>。</p>
    </div>
  ),
  formula: [
    '最大盈利 = (较窄翼宽 - 每股净权利金) × 合约乘数（若两翼等宽则为翼宽 - 净权利金）',
    '最大亏损 = 每股净权利金 × 合约乘数',
    '下方盈亏平衡点 = 最低执行价 + 每股净权利金',
    '上方盈亏平衡点 = 最高执行价 - 每股净权利金',
  ],
  legs: [
    { id: 'lc95', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 3, option: { type: 'call', strike: 95 } },
    { id: 'sc98', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'call', strike: 98 } },
    { id: 'sc102', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 2, option: { type: 'call', strike: 102 } },
    { id: 'lc105', kind: 'option', position: 'long', qty: 1, multiplier: 100, entryPrice: 3, option: { type: 'call', strike: 105 } },
  ],
};

export default strategy;