import { useEffect, useState } from 'react';
import { fetchBookData } from '../utils/bookDetails';
import type { BookData } from '../types';

export const useBookDetails = (id: string | undefined) => {
    const [book, setBook] = useState<BookData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    useEffect(() => {
        if (!id) {
            setError('Book ID not provided');
            setLoading(false);
            return;
        }

        const loadBookDetails = async () => {
            try {
                setLoading(true);
                setError(null);
                const bookData = await fetchBookData(id);
                setBook(bookData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        loadBookDetails();
    }, [id]);

    return { book, loading, error };
};
