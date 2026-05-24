import type { BookData, EditionData, WorkData } from '../types';
import { getCoverUrl } from './api';

export const fetchAuthorName = async (authorKey: string): Promise<string> => {
    try {
        const response = await fetch(`https://openlibrary.org${authorKey}.json`);
        if (!response.ok) return 'Unknown Author';
        const data = await response.json();
        return data.name || 'Unknown Author';
    } catch {
        return 'Unknown Author';
    }
};

export const fetchBookData = async (id: string): Promise<BookData> => {
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

    return {
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
    };
};

export const getDescription = (book: BookData | null): string | null => {
    if (!book?.description) return null;
    if (typeof book.description === 'string') return book.description;
    if (typeof book.description === 'object' && 'value' in book.description) {
        return book.description.value;
    }
    return null;
};

export const getCoverImageUrl = (book: BookData | null): string | null => {
    if (book?.covers && book.covers.length > 0) {
        return getCoverUrl(book.covers[0], 'L');
    }
    return null;
};

export const getAuthors = (book: BookData | null): string => {
    if (!book?.authors || book.authors.length === 0) return 'Unknown Author';
    return book.authors.join(', ');
};

export const getPublishers = (book: BookData | null): string => {
    if (!book?.publishers || book.publishers.length === 0) return 'N/A';
    return book.publishers.join(', ');
};

export const getISBN = (book: BookData | null): string => {
    if (book?.isbn_13 && book.isbn_13.length > 0) return book.isbn_13[0];
    if (book?.isbn && book.isbn.length > 0) return book.isbn[0];
    return 'N/A';
};
