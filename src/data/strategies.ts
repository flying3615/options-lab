import type { Strategy } from '../lib/types'

import longCall from './strategies/bull/long-call'
import shortCall from './strategies/bear/short-call'
import longPut from './strategies/bear/long-put'
import shortPut from './strategies/bull/short-put'
import coveredCall from './strategies/neutral/covered-call'
import protectivePut from './strategies/bull/protective-put'
import bullCallSpread from './strategies/bull/bull-call-spread'
import bearPutSpread from './strategies/bear/bear-put-spread'
import straddle from './strategies/neutral/straddle'
import strangle from './strategies/neutral/strangle'
import ironCondor from './strategies/neutral/iron-condor'
import butterflyCall from './strategies/neutral/butterfly-call'
import bullPutCreditSpread from './strategies/bull/bull-put-credit-spread'
import bearCallCreditSpread from './strategies/bear/bear-call-credit-spread'
import collar from './strategies/neutral/collar'
import ironButterfly from './strategies/neutral/iron-butterfly'
import ratioCallSpread from './strategies/bull/ratio-call-spread'
import calendarSpread from './strategies/neutral/calendar-spread'

export const strategies: Strategy[] = [
  longCall,
  shortCall,
  longPut,
  shortPut,
  coveredCall,
  protectivePut,
  bullCallSpread,
  bearPutSpread,
  straddle,
  strangle,
  ironCondor,
  butterflyCall,
  bullPutCreditSpread,
  bearCallCreditSpread,
  collar,
  ironButterfly,
  ratioCallSpread,
  calendarSpread,
]

export function findStrategy(id: string): Strategy | undefined {
  return strategies.find((s) => s.id === id)
}
