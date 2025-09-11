import type { GlossaryTerm } from '../lib/types';

export const glossary: GlossaryTerm[] = [
  {
    term: '期权 (Option)',
    definition: '一种金融合约，它赋予持有者在特定日期（到期日）或之前，以特定价格（执行价）买入或卖出一种资产的权利，但没有履行的义务。',
  },
  {
    term: '看涨期权 (Call)',
    definition: '赋予持有者“买入”标的资产权利的期权合约。当投资者预期资产价格将上涨时，会买入看涨期权。',
  },
  {
    term: '看跌期权 (Put)',
    definition: '赋予持有者“卖出”标的资产权利的期权合约。当投资者预期资产价格将下跌或希望对冲持仓风险时，会买入看跌期权。',
  },
  {
    term: '权利金 (Premium)',
    aliases: ['期权金'],
    definition: '购买期权合约所需要支付的价格，即期权的“售价”。对于期权买方来说，这是最大亏损；对于卖方来说，这是最大收益。',
  },
  {
    term: '执行价 (Strike Price)',
    aliases: ['行权价'],
    definition: '期权合约中约定的、未来可以买入或卖出标的资产的价格。这个价格是固定的，不随市场价变化。',
  },
  {
    term: '到期日 (Expiration Date)',
    definition: '期权合约的最后有效日期。过了这个日期，期权就会失效，不再具有任何权利。',
  },
  {
    term: '时间价值 (Time Value)',
    definition: '期权价格中超出其内在价值的部分。它代表了期权在到期前，标的资产价格向有利方向变动的“可能性”价值。时间价值会随着到期日的临近而加速衰减，俗称“时间衰减”或“Theta衰减”。',
  },
  {
    term: '内在价值 (Intrinsic Value)',
    definition: '如果立刻行权，该期权具有的价值。对于看涨期权，内在价值 = 标的市价 - 执行价（结果不能小于0）。对于看跌期权，内在价值 = 执行价 - 标的市价（结果不能小于0）。',
  },
];
