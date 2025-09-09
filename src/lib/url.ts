// URL helpers for syncing compare selections

export function parseCompare(search: string): { a?: string; b?: string } {
  const params = new URLSearchParams(search || '');
  const a = params.get('a') || undefined;
  const b = params.get('b') || undefined;
  return { a, b };
}

export function updateCompareInUrl(a?: string | null, b?: string | null): void {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  const params = url.searchParams;
  if (a) params.set('a', a); else params.delete('a');
  if (b) params.set('b', b); else params.delete('b');
  url.search = params.toString();
  try {
    window.history.replaceState({}, '', url.toString());
  } catch {
    // no-op
  }
}