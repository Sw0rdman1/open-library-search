import { forwardRef } from 'react';
import type { BookPreview } from '../../types';
import BookCard from '../book-card/BookCard';
import Button from '../button/Button';
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
                    />
                ))}
            </div>

            {hasMore && (
                <div className="load-more-container">
                    <Button
                        type="primary"
                        onClick={loadMore}
                        disabled={!!loading}
                        loading={!!loading}
                    >
                        Load more
                    </Button>
                </div>
            )}
        </div>
    );
});

SearchResults.displayName = 'SearchResults';

export default SearchResults;
