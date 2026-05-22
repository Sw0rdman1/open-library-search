import BooksPreview from '../components/book-preview/BookPreview';
import SocialProof from '../components/social-proof/SocialProof';
import SearchBar from '../components/search-bar/SearchBar';

import './LandingPage.css';
import DEFAULT_BOOKS from '../utils/defaultBooks';
import { useSearch } from '../hooks/useSearch';
import SearchResultsSummary from '../components/search-results-summary/SearchResultsSummary';


const LandingPage = () => {
    const { query, setQuery, results, loading, error } = useSearch();

    const booksToShow = query.trim() ? results.slice(0, 4) : DEFAULT_BOOKS;

    return (
        <div className="container-wrapper">
            <div className="hero-section">
                <div className="central-glow" />
                <div className="left-section">
                    <div className="title-container">
                        <h1>Biblios<span className='accent'>.com</span></h1>
                        <p>find your next great read</p>
                    </div>

                    <SearchBar value={query} onChange={setQuery} loading={loading} />

                    {/* <div className="tags-container">
                        <button className="tag-pill">Trileri</button>
                        <button className="tag-pill">Fantastika</button>
                        <button className="tag-pill">Klasici</button>
                        <button className="tag-pill">Misterija</button>
                    </div> */}

                    <SocialProof />
                    <SearchResultsSummary count={results.length} query={query} loading={loading} />
                </div>

                <div className='right-section'>
                    <BooksPreview books={booksToShow} loading={loading} error={error} />
                </div>
            </div>
        </div>
    )
}

export default LandingPage;