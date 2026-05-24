import { forwardRef } from 'react';
import type { BookPreview } from '../../types';
import { addViewedBook } from '../../utils/history';
import BookCard from '../book-card/BookCard';
import './SearchResults.css';

interface Props {
    results: BookPreview[];
    query: string;
    loadMore?: () => void;
    hasMore?: boolean;
    loading?: boolean;
}

const SearchResults = forwardRef<HTMLDivElement, Props>(({ results, query, loadMore, hasMore, loading }, ref) => {
    if (!query.trim()) {
        return null;
    }

    const handleBookClick = (book: BookPreview) => {
        addViewedBook(book);
    };

    return (
        <div className="search-results-container" ref={ref}>
            <div className="search-results-header">
                <h2>Search{loading && 'ing'} Results for
                    <span className="highlight"> {query}</span>
                </h2>
                <p className="results-count">{results.length} results found</p>
            </div>

            <div className="search-results-grid">
                {results.map((book) => (
                    <BookCard
                        key={book.key}
                        book={book}
                        size="medium"
                        onClick={() => handleBookClick(book)}
                    />
                ))}
            </div>

            {hasMore && (
                <div className="load-more-container">
                    <button
                        className="load-more-btn"
                        onClick={loadMore}
                        disabled={!!loading}
                        aria-busy={!!loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner" aria-hidden />
                                <span className="btn-text">Loading...</span>
                            </>
                        ) : (
                            <span className="btn-text">Load more</span>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
});

SearchResults.displayName = 'SearchResults';

export default SearchResults;
