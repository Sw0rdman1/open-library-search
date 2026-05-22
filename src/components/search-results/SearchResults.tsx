import { forwardRef } from 'react';
import type { BookPreview } from '../../types';
import './SearchResults.css';

interface Props {
    results: BookPreview[];
    query: string;
    loading: boolean;
}

const SearchResults = forwardRef<HTMLDivElement, Props>(({ results, query, loading }, ref) => {
    if (!query.trim()) {
        return null;
    }

    return (
        <div className="search-results-container" ref={ref}>
            <div className="search-results-header">
                <h2>Search Results for "{query}"</h2>
                <p className="results-count">{results.length} results found</p>
            </div>

            <div className="search-results-grid">
                {results.map((book) => (
                    <div key={book.key} className="result-card">
                        <div className="card-cover">
                            <img
                                src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
                                alt={book.title}
                                className="book-cover-image"
                            />
                        </div>
                        <div className="card-content">
                            <h3 className="card-title" title={book.title}>
                                {book.title}
                            </h3>
                            <p className="card-author">
                                {book.author_name && book.author_name.length > 0
                                    ? book.author_name.slice(0, 2).join(', ')
                                    : 'Unknown Author'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});

SearchResults.displayName = 'SearchResults';

export default SearchResults;
