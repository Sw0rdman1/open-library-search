import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import type { BookPreview, ViewedBook } from '../types';

import { clearViewedBooks, groupViewedBooks, loadViewedBooks, addViewedBook, type ViewedBookGroup } from '../utils/history';

const MAX_VISIBLE_HISTORY = 4;


interface HistoryContextValue {
  total: number;
  recentHistory: ViewedBook[];
  groupedHistory: ViewedBookGroup[];
  addBook: (book: BookPreview) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextValue | null>(null);

export function HistoryProvider({ children }: PropsWithChildren) {
  const [history, setHistory] = useState<ViewedBook[]>(loadViewedBooks);
  const total = history.length;

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'viewed_books') setHistory(loadViewedBooks());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const addBook = useCallback((book: BookPreview) => {
    addViewedBook(book);
    setHistory(loadViewedBooks());
  }, []);

  const clearHistory = useCallback(() => {
    clearViewedBooks();
    setHistory([]);
  }, []);

  return (
    <HistoryContext.Provider
      value={{
        total,
        recentHistory: history.slice(0, MAX_VISIBLE_HISTORY),
        groupedHistory: groupViewedBooks(history),
        addBook,
        clearHistory,
      }
      }
    >
      {children}
    </HistoryContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useHistory(): HistoryContextValue {
  const ctx = useContext(HistoryContext);
  if (!ctx) throw new Error('useHistory must be used inside <HistoryProvider>');
  return ctx;
}