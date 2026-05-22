import { useEffect, useState } from 'react';
import type { ViewedBook } from '../types';
import { loadViewedBooks, clearViewedBooks } from '../utils/history';
import BookCard from '../components/book-card/BookCard';
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

    return (
        <div className="history-page-container">
            <div className="history-header">
                <div className="history-info">
                    <h1>History</h1>
                    <p>Viewed books loaded from local storage.</p>
                    <p className="history-count">{history.length} book{history.length === 1 ? '' : 's'} in history</p>
                </div>
                {history.length > 0 && (
                    <button className="clear-history" onClick={handleClear}>
                        Clear history
                    </button>
                )}
            </div>

            {history.length === 0 ? (
                <div className="history-empty">
                    No history yet. Click on a search result to save it here.
                </div>
            ) : (
                <div className="history-grid">
                    {history.map((book) => (
                        <BookCard key={book.key} book={book} size="small" />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HistoryPage;
