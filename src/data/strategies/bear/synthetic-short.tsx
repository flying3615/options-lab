import type { Strategy } from '../../../lib/types';

const strategy: Strategy = {
  id: 'synthetic-short',
  name: '合成空头 (Synthetic Short Stock)',
  referencePrice: 100,
  tags: ['高级策略', '方向：看空', '风险：上行无限'],
  summary: '通过组合一个看涨期权和一个看跌期权，来完全复制做空100股股票的风险和收益。股价下跌则盈利，上涨则亏损。',
  description: '合成空头是一种高级策略，它通过同时卖出一个平价看涨期权（Short Call）和买入一个相同执行价和到期日的平价看跌期权（Long Put）来构建。最终产生的头寸，其盈亏表现与直接做空100股标的股票几乎完全相同。',
  concept: '这个策略的精髓在于“复制”。在期权世界里，不同的组合可以拼凑出功能相同的头寸。在这里，“卖出一份买的权利（Short Call）”加上“买入一份卖的权利（Long Put）”，其效果恰好等于“承诺未来要卖出股票”。这使得投资者可以在不实际借入和卖出股票（融券做空）的情况下，获得一个看空的头寸，有时能规避融券的限制或高昂成本。',
  pros: [
    '**模拟做空**：无需融券即可获得与做空股票相同的线性风险收益。',
    '**灵活性**：在某些难以或无法直接做空的市场中，提供了一种替代方案。',
    '**可能获得权利金**：根据波动率等因素，构建此策略时有时能获得少量净权利金收入。',
  ],
  cons: [
    '**上行风险无限**：和直接做空股票一样，如果股价无限上涨，理论上的亏损也是无限的。',
    '**需要保证金**：由于包含了期权卖方头寸（Short Call），需要占用保证金。',
    '**交易成本**：需要执行两笔期权交易，可能会产生更高的佣金成本。',
  ],
  
  formula: ['到期盈亏 ≈ (执行价 - 股票到期价) × 100'],
  legs: [
    { id: 'sc100', kind: 'option', position: 'short', qty: 1, multiplier: 100, entryPrice: 5, option: { type: 'call', strike: 100 } },
    { id: 'lp100', kind: 'option', position: 'long',  qty: 1, multiplier: 100, entryPrice: 5, option: { type: 'put',  strike: 100 } },
  ],
};

export default strategy;