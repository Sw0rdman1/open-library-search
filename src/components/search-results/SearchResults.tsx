import { forwardRef } from 'react';
import type { BookPreview } from '../../types';
import { addViewedBook } from '../../utils/history';
import BookCard from '../book-card/BookCard';
import './SearchResults.css';

interface Props {
    results: BookPreview[];
    query: string;
}

const SearchResults = forwardRef<HTMLDivElement, Props>(({ results, query }, ref) => {
    if (!query.trim()) {
        return null;
    }

    const handleBookClick = (book: BookPreview) => {
        addViewedBook(book);
    };

    return (
        <div className="search-results-container" ref={ref}>
            <div className="search-results-header">
                <h2>Search Results for "{query}"</h2>
                <p className="results-count">{results.length} results found</p>
                <p className="search-results-note">Click a book card to save it to your history.</p>
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
        </div>
    );
});

SearchResults.displayName = 'SearchResults';

export default SearchResults;
