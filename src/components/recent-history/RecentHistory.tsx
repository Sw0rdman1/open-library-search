import BookCard from '../book-card/BookCard';
import './RecentHistory.css';
import { useHistory } from '../../context/ViewedBooksContext';


const RecentHistory = () => {
    const { total, recentHistory } = useHistory();

    if (recentHistory.length === 0) {
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
                    <p>{total} book{total > 1 ? 's' : ''} recently viewed</p>
                </div>
            </div>

            <div className={`recent-history-grid${recentHistory.length === 1 ? ' recent-history-single' : ''}`}>
                {recentHistory.map((book) => (
                    <BookCard key={book.key} book={book} size="medium" />
                ))}

                <a href="/history" className="recent-history-see-all">
                    <div className="see-all-content">
                        <div className="see-all-icon">→</div>
                        <span>See all</span>
                        <p>View your full history</p>
                    </div>
                </a>
            </div>
        </section>
    );
};

export default RecentHistory;
