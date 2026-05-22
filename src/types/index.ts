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

export type { Theme, AvatarGender, SearchResult, BookDetails, BookPreview, ViewedBook };
