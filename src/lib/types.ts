import type { ReactNode } from 'react'

export type OptionType = 'call' | 'put'
export type Position = 'long' | 'short'
export type LegKind = 'option' | 'stock'

export interface OptionSpec {
  type: OptionType
  strike: number
}

export interface Leg {
  id: string
  kind: LegKind
  position: Position
  qty: number
  multiplier?: number // option 合约乘数，默认 100；stock 默认为 1
  option?: OptionSpec // kind === 'option' 时有效
  entryPrice?: number // 期权为权利金/每股；股票为成本价/每股；做空为开仓价格/每股
}

export interface Strategy {
  id: string
  name: string
  description?: string
  tags?: string[]
  referencePrice: number // 参考标的价（用于绘图中心）
  legs: Leg[]
  summary?: string // 列表摘要
  suitableFor?: string[] // 适用场景
  pros?: string[] // 优点
  cons?: string[] // 缺点
  risks?: string[] // 风险提示
  concept?: string // 概念解释（更口语化）
  formula?: string[] // 关键公式/逻辑（纯文本）
  example?: ReactNode // 举例（现金流、情景）
  stepNotes?: string[] // 逐步叠加演示的每步说明

  // 可选：知识型卡片（不渲染盈亏图），点击跳转到指定页面
  knowledgeOnly?: boolean
  linkTo?: string
}

export interface PayoffPoint {
  s: number
  pnl: number
}

export interface StrategyMetrics {
  netPremium: number
  maxProfit?: number
  maxLoss?: number
  breakEvens: number[]
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  aliases?: string[]; // 别名，例如“权利金”可以有“期权金”这个别名
}


