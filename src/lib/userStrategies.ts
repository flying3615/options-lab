import type { Strategy } from './types'

const LS_KEY = 'options-lab:user-strategies:v1'

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined'
}

export function loadUserStrategies(): Strategy[] {
  if (!isBrowser()) return []
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return []
    const arr = JSON.parse(raw)
    if (Array.isArray(arr)) return arr as Strategy[]
    return []
  } catch {
    return []
  }
}

export function saveUserStrategies(list: Strategy[]): void {
  if (!isBrowser()) return
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(list))
  } catch {
    // ignore
  }
}

function genId(): string {
  return 'user-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7)
}

export function upsertUserStrategy(s: Strategy): Strategy {
  const list = loadUserStrategies()
  let idx = list.findIndex((x) => x.id === s.id)
  let next: Strategy = { ...s }
  if (!s.id || s.id.startsWith('user-temp')) {
    next.id = genId()
    idx = -1
  }
  if (idx >= 0) list[idx] = next
  else list.push(next)
  saveUserStrategies(list)
  return next
}

export function removeUserStrategy(id: string): void {
  const list = loadUserStrategies().filter((x) => x.id !== id)
  saveUserStrategies(list)
}

export function findUserStrategy(id: string): Strategy | undefined {
  return loadUserStrategies().find((x) => x.id === id)
}