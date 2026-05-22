import BooksPreview from '../components/book-preview/BookPreview';
import SocialProof from '../components/social-proof/SocialProof';
import { Search } from 'lucide-react';
import './LandingPage.css';

const books = [
    {
        image: 'https://covers.openlibrary.org/b/id/7007-M.jpg',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        description: 'A classic American novel about wealth, love, and the American Dream...',
        year: 1925,
        rating: 4.8,
        pages: 180
    },
    {
        image: 'https://covers.openlibrary.org/b/id/7008-M.jpg',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        description: 'A gripping tale of racial injustice and childhood innocence...',
        year: 1960,
        rating: 4.9,
        pages: 324
    },
    {
        image: 'https://covers.openlibrary.org/b/id/7008-M.jpg',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        description: 'A gripping tale of racial injustice and childhood innocence...',
        year: 1960,
        rating: 4.9,
        pages: 324
    },
    {
        image: 'https://covers.openlibrary.org/b/id/7008-M.jpg',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        description: 'A gripping tale of racial injustice and childhood innocence...',
        year: 1960,
        rating: 4.9,
        pages: 324
    }
];

const LandingPage = () => {
    return (
        <div className="hero-wrapper">
            <div className="container">
                <div className="central-glow" />
                <div className="left-section">
                    <div className="title-container">
                        <h1>Biblios<span className='accent'>.com</span></h1>
                        <p>find your next great read</p>
                    </div>

                    <div className="search-container">
                        <input type="text" placeholder="Search for books, authors, genres..." className="search-bar" />
                        <button className="search-button">
                            <Search />
                        </button>
                    </div>

                    <div className="tags-container">
                        <button className="tag-pill">Trileri</button>
                        <button className="tag-pill">Fantastika</button>
                        <button className="tag-pill">Klasici</button>
                        <button className="tag-pill">Misterija</button>
                    </div>

                    <SocialProof />
                </div>

                <div className='right-section'>
                    <BooksPreview books={books} />
                </div>
            </div>
        </div>
    )
}

export default LandingPage;