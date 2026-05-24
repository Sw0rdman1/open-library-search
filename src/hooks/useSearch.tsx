import { useState, useEffect, useRef } from 'react';
import type { BookPreview } from '../types';
import { removeBooksWithoutCovers } from '../utils/api';
import { useSearchParams } from 'react-router-dom';

const DEBOUNCE_MS = 400;
const PAGE_LIMIT = 100;


export function useSearch() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") || '');
    const [results, setResults] = useState<BookPreview[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalFound, setTotalFound] = useState<number | null>(null);
    const abortRef = useRef<AbortController | null>(null);


    const fetchPage = async (q: string, pageToFetch = 1, signal?: AbortSignal) => {
        const res = await fetch(
            `https://openlibrary.org/search.json?title=${encodeURIComponent(q)}&limit=${PAGE_LIMIT}&page=${pageToFetch}`,
            { signal }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const docs = data.docs || [];
        const total = typeof data.numFound === 'number' ? data.numFound : (data.num_found ?? null);
        return { docs, total } as { docs: any[]; total: number | null };
    };

    useEffect(() => {
        const trimmed = query.trim();
        setSearchParams(trimmed ? { q: trimmed } : {});

        // reset when query cleared
        if (!trimmed) {
            setResults([]);
            setLoading(false);
            setError(null);
            setPage(1);
            setTotalFound(null);
            abortRef.current?.abort();
            return;
        }

        const loadingTimer = setTimeout(() => setLoading(true), 150);

        const timer = setTimeout(async () => {
            abortRef.current?.abort();
            abortRef.current = new AbortController();

            try {
                setLoading(true);
                setPage(1);

                const { docs, total } = await fetchPage(trimmed, 1, abortRef.current.signal);

                if (!docs || docs.length === 0) {
                    setResults([]);
                    setError('Sorry, no results found.');
                    setTotalFound(total);
                    return;
                }

                const withCovers = removeBooksWithoutCovers(docs);

                setResults(withCovers);
                setError(null);
                setTotalFound(total);
            } catch (err) {
                if (err instanceof Error && err.name !== 'AbortError') {
                    setError('Something went wrong. Please try again.');
                    setResults([]);
                    setTotalFound(null);
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

    const hasMore = totalFound != null ? page * PAGE_LIMIT < totalFound : false;

    const loadMore = async () => {
        const trimmed = query.trim();
        if (!trimmed) return;
        if (loading) return;
        if (!hasMore) return;

        const MAX_SCAN_PAGES = 5;
        let nextPage = page + 1;
        let scanned = 0;
        let appended: BookPreview[] = [];

        setLoading(true);
        try {
            while (scanned < MAX_SCAN_PAGES) {
                abortRef.current?.abort();
                abortRef.current = new AbortController();

                const { docs, total } = await fetchPage(trimmed, nextPage, abortRef.current.signal);
                setTotalFound(total);

                if (docs && docs.length > 0) {
                    const withCovers = removeBooksWithoutCovers(docs);
                    if (withCovers.length > 0) {
                        appended = appended.concat(withCovers);
                    }
                }

                scanned += 1;
                nextPage += 1;

                if (total != null && (nextPage - 1) * PAGE_LIMIT >= total) break;

                if (appended.length > 0) break;
            }

            if (appended.length > 0) {
                setResults((prev) => prev.concat(appended));
                setPage(nextPage - 1);
            } else {
                setPage(nextPage - 1);
            }
        } catch (err) {
            if (err instanceof Error && err.name !== 'AbortError') {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return { query, setQuery, results, loading, error, loadMore, hasMore, totalFound } as const;
}