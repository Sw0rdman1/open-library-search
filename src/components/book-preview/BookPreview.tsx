import { useEffect, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import type { BookPreview } from "../../types";
import { getCoverUrl } from "../../utils/api";
import { BounceLoader } from "react-spinners";
import noResult from '../../assets/no-result.svg';

import './BookPreview.css';
import { useHistory } from "../../context/ViewedBooksContext";


interface Props {
    books: BookPreview[];
    loading: boolean;
    error: string | null;
    interval?: number;
}

export default function BookPreview({ books, loading, error, interval = 3000 }: Props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stackKey, setStackKey] = useState(0);
    const { addBook } = useHistory();

    const next = () => {
        if (books.length === 0) return;
        setActiveIndex((prev) => (prev + 1) % books.length);
    };

    useEffect(() => {
        setActiveIndex(0);
        setStackKey((prev) => prev + 1);
    }, [books]);

    useEffect(() => {
        if (books.length === 0) return;

        const id = setInterval(() => {
            next();
        }, interval);

        return () => clearInterval(id);
    }, [books.length, interval]);

    const getIndex = (index: number) => {
        return books.length === 0 ? 0 : (index - activeIndex + books.length) % books.length;
    };

    const navigate = useNavigate();

    const handleNavigation = useCallback((book: BookPreview) => {
        addBook(book);
        const workId = book.key.split('/').pop();
        if (workId) {
            navigate(`/book/${workId}`);
        }
    }, [navigate, addBook]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, book: BookPreview) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleNavigation(book);
        }
    };

    if (loading) {
        return (
            <div className="carousel-wrapper">
                <BounceLoader color="var(--accent)" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="carousel-wrapper">
                <div className="error-message">
                    <img src={noResult} alt="No results found" />
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="carousel-wrapper">
            <h2 className="results-count"><span className="highlight">Biblios</span> top picks</h2>
            <div key={stackKey} className="stack">
                {books.map((book, index) => {
                    const pos = getIndex(index);
                    return (
                        <div
                            key={book.key}
                            className={`card pos-${pos} card-clickable`}
                            onClick={() => handleNavigation(book)}
                            onKeyDown={(event) => handleKeyDown(event, book)}
                            role="button"
                            tabIndex={0}
                            aria-label={`View details for ${book.title}`}
                        >
                            <div className="book-cover" style={{ backgroundImage: `url(${getCoverUrl(book.coverId)})` }} />
                            <div className="book-meta">
                                <h3>{book.title}</h3>
                                <p>{book.author_name.join(', ')}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}