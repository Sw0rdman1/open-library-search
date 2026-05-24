import { useEffect, useState } from 'react';
import type { ViewedBook } from '../types';
import { loadViewedBooks, clearViewedBooks, groupViewedBooks } from '../utils/history';
import type { ViewedBookGroup } from '../utils/history';
import BookCard from '../components/book-card/BookCard';
import Button from '../components/button/Button';
import './HistoryPage.css';

const HistoryPage = () => {
    const [history, setHistory] = useState<ViewedBook[]>([]);

    useEffect(() => {
        setHistory(loadViewedBooks());
    }, []);

    const handleClear = () => {
        clearViewedBooks();
        setHistory([]);
    };

    const groupedBooks: ViewedBookGroup[] = groupViewedBooks(history);

    return (
        <div className="history-page-container">
            <div className="history-header-section">
                <div className="history-header-content">
                    <h1 className="history-title">History</h1>
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
                                    <BookCard
                                        key={book.key}
                                        book={book}
                                        size="medium"
                                    />
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
