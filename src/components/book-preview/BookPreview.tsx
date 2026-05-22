import { useEffect, useState } from "react";
import type { Book } from "../../types";

import './BookPreview.css';

interface Props {
    books: Book[];
    interval?: number;
}

export default function StackedBookCarousel({
    books,
    interval = 3000,
}: Props) {
    const [activeIndex, setActiveIndex] = useState(0);

    const next = () => {
        setActiveIndex((prev) => (prev + 1) % books.length);
    };


    useEffect(() => {
        const id = setInterval(() => {
            next();
        }, interval);

        return () => clearInterval(id);
    }, [books.length, interval]);

    const getIndex = (index: number) => {
        return (index - activeIndex + books.length) % books.length;
    };

    return (
        <div className="carousel-wrapper">
            <div className="stack">
                {books.map((book, index) => {
                    const pos = getIndex(index);

                    return (
                        <div
                            key={book.title}
                            className={`card pos-${pos}`}
                            style={{
                                backgroundImage: `url(${book.image})`,
                            }}
                        >
                            <div className="overlay">
                                <h3>{book.title}</h3>
                                <p>{book.author}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}