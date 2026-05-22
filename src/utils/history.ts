import type { BookPreview, ViewedBook } from '../types';

const HISTORY_STORAGE_KEY = 'biblios_history';
const HISTORY_LIMIT = 20;

export function loadViewedBooks(): ViewedBook[] {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ViewedBook[];
    return Array.isArray(parsed)
      ? parsed.sort((a, b) => b.viewedAt - a.viewedAt)
      : [];
  } catch {
    return [];
  }
}

export function saveViewedBooks(history: ViewedBook[]) {
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history.slice(0, HISTORY_LIMIT)));
  } catch {
    // ignore write errors
  }
}

export function addViewedBook(book: BookPreview) {
  const current = loadViewedBooks();
  const normalized = current.filter((entry) => entry.key !== book.key);
  const next: ViewedBook = {
    ...book,
    viewedAt: Date.now(),
  };
  saveViewedBooks([next, ...normalized]);
}

export function clearViewedBooks() {
  localStorage.removeItem(HISTORY_STORAGE_KEY);
}
