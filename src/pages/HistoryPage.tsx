import BookCard from '../components/book-card/BookCard';
import Button from '../components/button/Button';
import { useHistory } from '../context/ViewedBooksContext';

import './HistoryPage.css';

const HistoryPage = () => {
    const { groupedHistory, total, clearHistory } = useHistory();


    return (
        <div className="history-page-container">
            <div className="history-header-section">
                <div className="history-header-content">
                    <h1 className="history-title">History</h1>
                    <p className="history-count">{total} book{total === 1 ? '' : 's'} you have viewed</p>
                </div>
                {total > 0 && (
                    <Button type="danger" onClick={clearHistory}>
                        Clear history
                    </Button>
                )}
            </div>

            {total === 0 ? (
                <div className="history-empty">
                    No history yet. Click on a search result to save it here.
                </div>
            ) : (
                <div className="history-groups">
                    {groupedHistory.map((group) => (
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
