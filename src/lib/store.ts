import { createStore } from 'zustand/vanilla'
import { useStore as useZustandStore } from 'zustand'
import { parseCompare } from './url'

export interface ChartPrefs {
  spanPct: number
  steps: number
}

export interface AppState {
  selectedCompareIds: [string | null, string | null]
  chartPrefs: ChartPrefs

  // actions
  setCompare: (index: 0 | 1, id: string | null) => void
  swap: () => void
  setChartPrefs: (prefs: Partial<ChartPrefs>) => void
  initFromSearch: (search: string, allIds: string[]) => void
}

const initialState: Pick<AppState, 'selectedCompareIds' | 'chartPrefs'> = {
  selectedCompareIds: [null, null],
  chartPrefs: { spanPct: 0.3, steps: 201 }
}

export const appStore = createStore<AppState>((set, get) => ({
  ...initialState,

  setCompare: (index, id) => {
    const next: [string | null, string | null] = [...get().selectedCompareIds]
    next[index] = id
    set({ selectedCompareIds: next })
  },

  swap: () => {
    const [a, b] = get().selectedCompareIds
    set({ selectedCompareIds: [b, a] })
  },

  setChartPrefs: (prefs) => {
    set({ chartPrefs: { ...get().chartPrefs, ...prefs } })
  },

  initFromSearch: (search, allIds) => {
    const { a, b } = parseCompare(search)
    const valid = (x?: string) => (x && allIds.includes(x) ? x : null)
    const A = valid(a)
    const B = valid(b)
    // 若都为空，保持初始（由页面决定是否给默认值）
    if (A !== null || B !== null) {
      set({ selectedCompareIds: [A, B] })
    }
  }
}))

// Hooks
export function useCompareIds(): [string | null, string | null] {
  return useZustandStore(appStore, (s) => s.selectedCompareIds)
}

export function useChartPrefs(): ChartPrefs {
  return useZustandStore(appStore, (s) => s.chartPrefs)
}

// Stable-selector hooks to avoid useSyncExternalStore snapshot churn
export const useInitFromSearch = () =>
  useZustandStore(appStore, (s) => s.initFromSearch)
export const useSetCompare = () =>
  useZustandStore(appStore, (s) => s.setCompare)
export const useSwapCompare = () =>
  useZustandStore(appStore, (s) => s.swap)