const STORAGE_KEY = 'lws-kitchen:saved-recipes';

export function getSavedIds() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function toggleSavedId(id) {
  const current = getSavedIds();
  const next = current.includes(id)
    ? current.filter((savedId) => savedId !== id)
    : [...current, id];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}
