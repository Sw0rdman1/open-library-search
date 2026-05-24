import { useNavigate, useParams } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';
import { useBookDetails } from '../hooks/useBookDetails';
import {
    getAuthors,
    getDescription,
    getPublishers,
    getISBN,
    getCoverImageUrl,
} from '../utils/bookDetails';
import Button from '../components/button/Button';
import './BookDetailsPage.css';

const BACK_ICON = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const BookDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { book, loading, error } = useBookDetails(id);

    if (loading) {
        return (
            <div className="book-details-container">
                <div className="book-details-loading">
                    <BounceLoader color="var(--accent)" size={40} />
                    <p>Loading book details...</p>
                </div>
            </div>
        );
    }

    if (error || !book) {
        return (
            <div className="book-details-container">
                <div className="book-details-error">
                    <p>{error || 'Book not found'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="book-details-container">
            <div className="book-details-header-section">
                <div className="book-details-header">
                    <Button type="default" icon={BACK_ICON} onClick={() => navigate(-1)} ariaLabel="Go back">
                        Back
                    </Button>
                    <h1>Book Details</h1>
                </div>
            </div>

            <div className="book-details-content">
                <div className="book-details-main">
                    <div className="book-details-cover-section">
                        {getCoverImageUrl(book) ? (
                            <img
                                src={getCoverImageUrl(book)!}
                                alt={book.title}
                                className="book-details-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x450?text=No+Cover';
                                }}
                            />
                        ) : (
                            <div className="book-details-cover-placeholder">
                                <p>No Cover Available</p>
                            </div>
                        )}
                    </div>

                    <div className="book-details-info">
                        <h2 className="book-details-title">{book.title}</h2>

                        <div className="book-details-meta">
                            <div className="meta-item">
                                <span className="meta-label">Author</span>
                                <span className="meta-value">{getAuthors(book)}</span>
                            </div>

                            <div className="meta-item">
                                <span className="meta-label">Publisher</span>
                                <span className="meta-value">{getPublishers(book)}</span>
                            </div>

                            <div className="meta-item">
                                <span className="meta-label">ISBN</span>
                                <span className="meta-value">{getISBN(book)}</span>
                            </div>

                            {book.first_publish_date && (
                                <div className="meta-item">
                                    <span className="meta-label">First Published</span>
                                    <span className="meta-value">{book.first_publish_date}</span>
                                </div>
                            )}

                            {book.number_of_pages && (
                                <div className="meta-item">
                                    <span className="meta-label">Pages</span>
                                    <span className="meta-value">{book.number_of_pages}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {getDescription(book) && (
                    <div className="book-details-description-section">
                        <h3>Description</h3>
                        <p className="book-details-description">{getDescription(book)}</p>
                    </div>
                )}

                {book.subjects && book.subjects.length > 0 && (
                    <div className="book-details-subjects-section">
                        <h3>Subjects</h3>
                        <div className="subjects-tags">
                            {book.subjects.slice(0, 8).map((subject, index) => (
                                <span key={index} className="subject-tag">
                                    {subject}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookDetailsPage;