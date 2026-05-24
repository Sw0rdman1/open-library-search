import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';
import { getCoverUrl } from '../utils/api';
import Button from '../components/button/Button';
import './BookDetailsPage.css';

interface WorkAuthorEntry {
    author: {
        key: string;
    };
}

interface WorkData {
    title: string;
    description?: string | { value: string };
    covers?: number[];
    first_publish_date?: string;
    first_publication_year?: number;
    number_of_pages?: number;
    authors?: WorkAuthorEntry[];
    subjects?: string[];
}

interface EditionData {
    publishers?: string[];
    isbn_13?: string[];
    isbn?: string[];
    number_of_pages?: number;
    publish_date?: string;
}

interface BookData {
    title: string;
    description?: string | { value: string };
    covers?: number[];
    first_publish_date?: string;
    number_of_pages?: number;
    authors: string[];
    publishers: string[];
    isbn_13: string[];
    isbn: string[];
    subjects?: string[];
}

const BookDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [book, setBook] = useState<BookData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const backIcon = (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    useEffect(() => {
        if (!id) {
            setError('Book ID not provided');
            setLoading(false);
            return;
        }

        const fetchAuthorName = async (authorKey: string) => {
            try {
                const response = await fetch(`https://openlibrary.org${authorKey}.json`);
                if (!response.ok) return 'Unknown Author';
                const data = await response.json();
                return data.name || 'Unknown Author';
            } catch {
                return 'Unknown Author';
            }
        };

        const fetchBookDetails = async () => {
            try {
                setLoading(true);
                setError(null);

                const workResponse = await fetch(`https://openlibrary.org/works/${id}.json`);
                if (!workResponse.ok) {
                    throw new Error('Failed to fetch book details');
                }

                const workData: WorkData = await workResponse.json();
                const authorKeys = workData.authors?.map((entry) => entry.author.key) ?? [];
                const authorNames = await Promise.all(authorKeys.map(fetchAuthorName));

                const editionsResponse = await fetch(`https://openlibrary.org/works/${id}/editions.json?limit=1`);
                let editionData: EditionData = {};
                if (editionsResponse.ok) {
                    const editionsPayload = await editionsResponse.json();
                    if (Array.isArray(editionsPayload.entries) && editionsPayload.entries.length > 0) {
                        editionData = editionsPayload.entries[0];
                    }
                }

                setBook({
                    title: workData.title,
                    description: workData.description,
                    covers: workData.covers,
                    first_publish_date: editionData.publish_date ?? workData.first_publish_date,
                    number_of_pages: editionData.number_of_pages ?? workData.number_of_pages,
                    authors: authorNames.length > 0 ? authorNames : ['Unknown Author'],
                    publishers: editionData.publishers ?? [],
                    isbn_13: editionData.isbn_13 ?? [],
                    isbn: editionData.isbn ?? [],
                    subjects: workData.subjects,
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]);

    const getDescription = () => {
        if (!book?.description) return null;
        if (typeof book.description === 'string') return book.description;
        if (typeof book.description === 'object' && 'value' in book.description) {
            return book.description.value;
        }
        return null;
    };

    const getCoverImageUrl = () => {
        if (book?.covers && book.covers.length > 0) {
            return getCoverUrl(book.covers[0], 'L');
        }
        return null;
    };

    const getAuthors = () => {
        if (!book?.authors || book.authors.length === 0) return 'Unknown Author';
        return book.authors.join(', ');
    };

    const getPublishers = () => {
        if (!book?.publishers || book.publishers.length === 0) return 'N/A';
        return book.publishers.join(', ');
    };

    const getISBN = () => {
        if (book?.isbn_13 && book.isbn_13.length > 0) return book.isbn_13[0];
        if (book?.isbn && book.isbn.length > 0) return book.isbn[0];
        return 'N/A';
    };

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
                    <Button type="default" icon={backIcon} onClick={() => navigate(-1)} ariaLabel="Go back">
                        Back
                    </Button>
                    <h1>Book Details</h1>
                </div>
            </div>

            <div className="book-details-content">
                <div className="book-details-main">
                    <div className="book-details-cover-section">
                        {getCoverImageUrl() ? (
                            <img
                                src={getCoverImageUrl()!}
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
                                <span className="meta-value">{getAuthors()}</span>
                            </div>

                            <div className="meta-item">
                                <span className="meta-label">Publisher</span>
                                <span className="meta-value">{getPublishers()}</span>
                            </div>

                            <div className="meta-item">
                                <span className="meta-label">ISBN</span>
                                <span className="meta-value">{getISBN()}</span>
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

                {getDescription() && (
                    <div className="book-details-description-section">
                        <h3>Description</h3>
                        <p className="book-details-description">{getDescription()}</p>
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