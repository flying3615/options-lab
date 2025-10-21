import type { Strategy } from '../lib/types'

import longCall from './strategies/bull/long-call.tsx'
import shortCall from './strategies/bear/short-call.tsx'
import longPut from './strategies/bear/long-put.tsx'
import shortPut from './strategies/bull/short-put.tsx'
import coveredCall from './strategies/neutral/covered-call.tsx'
import protectivePut from './strategies/bull/protective-put.tsx'
import bullCallSpread from './strategies/bull/bull-call-spread.tsx'
import bearPutSpread from './strategies/bear/bear-put-spread.tsx'
import straddle from './strategies/neutral/straddle.tsx'
import shortStraddle from './strategies/neutral/short-straddle.tsx'
import strangle from './strategies/neutral/strangle.tsx'
import shortStrangle from './strategies/neutral/short-strangle.tsx'
import ironCondor from './strategies/neutral/iron-condor.tsx'
import butterflyCall from './strategies/neutral/butterfly-call.tsx'
import butterflyCallShort from './strategies/neutral/butterfly-call-short.tsx'
import butterflyPut from './strategies/neutral/butterfly-put.tsx'
import butterflyPutShort from './strategies/neutral/butterfly-put-short.tsx'
import ironCondorLong from './strategies/neutral/iron-condor-long.tsx'
import longCallCondor from './strategies/neutral/long-call-condor.tsx'
import longPutCondor from './strategies/neutral/long-put-condor.tsx'
import shortCallCondor from './strategies/neutral/short-call-condor.tsx'
import shortPutCondor from './strategies/neutral/short-put-condor.tsx'
import bullPutCreditSpread from './strategies/bull/bull-put-credit-spread.tsx'
import bearCallCreditSpread from './strategies/bear/bear-call-credit-spread.tsx'
import collar from './strategies/neutral/collar.tsx'
import ironButterfly from './strategies/neutral/iron-butterfly.tsx'
import ironButterflyLong from './strategies/neutral/iron-butterfly-long.tsx'
import ratioCallSpread from './strategies/bull/ratio-call-spread.tsx'
import ratioPutSpread from './strategies/bear/ratio-put-spread.tsx'
import reverseRatioCallSpread from './strategies/bull/reverse-ratio-call-spread.tsx'
import reverseRatioPutSpread from './strategies/bear/reverse-ratio-put-spread.tsx'
import longRiskReversal from './strategies/bull/long-risk-reversal.tsx'
import shortRiskReversal from './strategies/bear/short-risk-reversal.tsx'
import syntheticLong from './strategies/bull/synthetic-long.tsx'
import syntheticShort from './strategies/bear/synthetic-short.tsx'
import boxSpread from './strategies/neutral/box-spread.tsx'
import calendarSpread from './strategies/neutral/calendar-spread'

export const strategies: Strategy[] = [
  // 单腿与持股替代/合成
  longCall,
  longPut,
  shortCall,
  shortPut,
  syntheticLong,
  syntheticShort,

  // 对冲与持仓管理
  coveredCall,
  protectivePut,
  collar,

  // 价差
  bullCallSpread,
  bearPutSpread,
  bullPutCreditSpread,
  bearCallCreditSpread,

  // 跨式/宽跨
  straddle,
  shortStraddle,
  strangle,
  shortStrangle,

  // 蝶式 / 铁蝶 / 铁鹰
  butterflyCall,
  butterflyCallShort,
  butterflyPut,
  butterflyPutShort,
  ironButterfly,
  ironButterflyLong,
  ironCondor,
  ironCondorLong,
  longCallCondor,
  longPutCondor,
  shortCallCondor,
  shortPutCondor,

  // 比例与反向比例
  ratioCallSpread,
  ratioPutSpread,
  reverseRatioCallSpread,
  reverseRatioPutSpread,

  // 风险反转
  longRiskReversal,
  shortRiskReversal,

  // 知识/其他
  boxSpread,
  calendarSpread,
]

export function findStrategy(id: string): Strategy | undefined {
  return strategies.find((s) => s.id === id)
}
