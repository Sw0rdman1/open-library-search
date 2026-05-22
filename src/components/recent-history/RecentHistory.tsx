import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { ViewedBook } from '../../types';
import { loadViewedBooks } from '../../utils/history';
import BookCard from '../book-card/BookCard';
import './RecentHistory.css';

const MAX_VISIBLE_HISTORY = 6;

const RecentHistory = () => {
    const [recentBooks, setRecentBooks] = useState<ViewedBook[]>([]);

    useEffect(() => {
        const loaded = loadViewedBooks();
        setRecentBooks(loaded.slice(0, MAX_VISIBLE_HISTORY));
    }, []);

    if (recentBooks.length === 0) {
        return (
            <section className="recent-history-container recent-history-empty-state">
                <div className="recent-history-header">
                    <h2>Recent history</h2>
                </div>
                <p>No recently viewed books yet. Click a search result to save books to your history.</p>
            </section>
        );
    }

    return (
        <section className="recent-history-container">
            <div className="recent-history-header">
                <div>
                    <h2>Recent history</h2>
                    <p>{recentBooks.length} book{recentBooks.length > 1 ? 's' : ''} recently viewed</p>
                </div>
                <Link to="/history" className="recent-history-link">
                    See full history
                </Link>
            </div>

            <div className={`recent-history-grid${recentBooks.length === 1 ? ' recent-history-single' : ''}`}>
                {recentBooks.map((book) => (
                    <BookCard key={book.key} book={book} size="small" />
                ))}

                <Link to="/history" className="recent-history-card recent-history-see-all">
                    <div className="see-all-content">
                        <span>See all</span>
                        <p>View your full history page</p>
                    </div>
                </Link>
            </div>
        </section>
    );
};

export default RecentHistory;
