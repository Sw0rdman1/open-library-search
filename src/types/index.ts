type Theme = 'light' | 'dark';
type AvatarGender = 'men' | 'women';


interface SearchResult {
    key: string;
    title: string;
    author_name?: string[];
    cover_i?: number;
    first_publish_year?: number;
    isbn?: string[];
    publisher?: string[];
}

interface BookDetails {
    key: string;
    title: string;
    description?: string | { value: string };
    covers?: number[];
    subjects?: string[];
}

interface BookPreview {
    key: string;
    title: string;
    author_name: string[];
    coverId: number;
}

interface ViewedBook extends BookPreview {
    viewedAt: number;
}

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

type HistoryGroupKey = 'today' | 'yesterday' | 'last-week' | 'last-month' | 'older';

export type { Theme, AvatarGender, SearchResult, BookDetails, BookPreview, ViewedBook, WorkAuthorEntry, WorkData, EditionData, BookData, HistoryGroupKey };
