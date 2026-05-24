import { useState, useEffect, useRef } from 'react';
import type { BookPreview } from '../types';
import { removeBooksWithoutCovers } from '../utils/api';

const DEBOUNCE_MS = 400;


export function useSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<BookPreview[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const abortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        const trimmed = query.trim();

        if (!trimmed) {
            setResults([]);
            setLoading(false);
            setError(null);
            return;
        }

        const loadingTimer = setTimeout(() => setLoading(true), 150);

        const timer = setTimeout(async () => {
            abortRef.current?.abort();
            abortRef.current = new AbortController();

            try {
                setLoading(true);

                const res = await fetch(
                    `https://openlibrary.org/search.json?title=${encodeURIComponent(trimmed)}&limit=30`,
                    { signal: abortRef.current.signal }
                );
                if (!res.ok) throw new Error(`HTTP ${res.status}`);

                const data = await res.json();

                console.log(data);


                if (!data.docs || data.docs.length === 0) {
                    setResults([]);
                    setError('Sorry, no results found.');
                    return;
                }

                const withCovers = removeBooksWithoutCovers(data.docs);

                setResults(withCovers);
                setError(null);
            } catch (err) {
                if (err instanceof Error && err.name !== 'AbortError') {
                    setError('Something went wrong. Please try again.');
                    setResults([]);
                }
            } finally {
                setLoading(false);
            }
        }, DEBOUNCE_MS);

        return () => {
            clearTimeout(loadingTimer);
            clearTimeout(timer);
            abortRef.current?.abort();
        };
    }, [query]);

    return { query, setQuery, results, loading, error };
}