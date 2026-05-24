import { useEffect, useState } from 'react';
import type { ViewedBook } from '../types';
import { loadViewedBooks, clearViewedBooks } from '../utils/history';
import BookCard from '../components/book-card/BookCard';
import Button from '../components/button/Button';
import './HistoryPage.css';

interface GroupedBooks {
    label: string;
    books: ViewedBook[];
}

const HistoryPage = () => {
    const [history, setHistory] = useState<ViewedBook[]>([]);

    useEffect(() => {
        setHistory(loadViewedBooks());
    }, []);

    const handleClear = () => {
        clearViewedBooks();
        setHistory([]);
    };

    const getDateGroup = (timestamp: number): string => {
        const now = Date.now();
        const diff = now - timestamp;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days === 0) return 'today';
        if (days === 1) return 'yesterday';
        if (days <= 7) return 'last-week';
        if (days <= 30) return 'last-month';
        return 'older';
    };

    const getDateGroupLabel = (group: string): string => {
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
            default:
                return '';
        }
    };

    const groupedBooks: GroupedBooks[] = (() => {
        const groups: Record<string, ViewedBook[]> = {
            'today': [],
            'yesterday': [],
            'last-week': [],
            'last-month': [],
            'older': [],
        };

        history.forEach((book) => {
            const group = getDateGroup(book.viewedAt);
            groups[group].push(book);
        });

        return Object.entries(groups)
            .filter(([, books]) => books.length > 0)
            .map(([group, books]) => ({
                label: getDateGroupLabel(group),
                books,
            }));
    })();

    return (
        <div className="history-page-container">
            <div className="history-header-section">
                <div className="history-header-content">
                    <h1>History</h1>
                    <p className="history-count">{history.length} book{history.length === 1 ? '' : 's'} you have viewed</p>
                </div>
                {history.length > 0 && (
                    <Button type="danger" onClick={handleClear}>
                        Clear history
                    </Button>
                )}
            </div>

            {history.length === 0 ? (
                <div className="history-empty">
                    No history yet. Click on a search result to save it here.
                </div>
            ) : (
                <div className="history-groups">
                    {groupedBooks.map((group) => (
                        <div key={group.label} className="history-group">
                            <h2 className="group-title">{group.label}</h2>
                            <div className="history-grid">
                                {group.books.map((book) => (
                                    <BookCard key={book.key} book={book} size="medium" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HistoryPage;
