import BooksPreview from '../components/book-preview/BookPreview';
import './LandingPage.css';
import { Book, Search } from 'lucide-react';


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
        <div className="container">
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
                <div className="info-container">
                    <Book color='var(--accent)' />
                    <p>Discover millions of books around the world and find your next favorite read</p>
                </div>
            </div>
            <div className='right-section'>
                <BooksPreview books={books} />
            </div>
        </div>
    )
}

export default LandingPage