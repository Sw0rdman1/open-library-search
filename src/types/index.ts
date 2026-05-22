type Theme = 'light' | 'dark';

export type { Theme };

export type Book = {
    image: string;
    title: string;
    author: string;
    description?: string;
    year?: number;
    rating?: number;
    pages?: number;
}

