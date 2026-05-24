import type { BookPreview, HistoryGroupKey, ViewedBook } from '../types';

const HISTORY_STORAGE_KEY = 'viewed_books';
const HISTORY_LIMIT = 20;

export interface ViewedBookGroup {
  label: string;
  books: ViewedBook[];
}

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

export function getDateGroup(timestamp: number): HistoryGroupKey {
  const now = Date.now();
  const diff = now - timestamp;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days <= 7) return 'last-week';
  if (days <= 30) return 'last-month';
  return 'older';
}

export function getDateGroupLabel(group: HistoryGroupKey): string {
  switch (group) {
    case 'today':
      return 'Today';
    case 'yesterday':
      return 'Yesterday';
    case 'last-week':
      return 'Last 7 days';
    case 'last-month':
      return 'Last 30 days';
    case 'older':
      return 'Older';
  }
}

export function groupViewedBooks(history: ViewedBook[]): ViewedBookGroup[] {
  const groups: Record<HistoryGroupKey, ViewedBook[]> = {
    today: [],
    yesterday: [],
    'last-week': [],
    'last-month': [],
    older: [],
  };

  history.forEach((book) => {
    groups[getDateGroup(book.viewedAt)].push(book);
  });

  return Object.entries(groups)
    .filter(([, books]) => books.length > 0)
    .map(([group, books]) => ({
      label: getDateGroupLabel(group as HistoryGroupKey),
      books,
    }));
}
