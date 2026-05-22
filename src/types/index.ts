type Theme = 'light' | 'dark';
type AvatarGender = 'men' | 'women';

export type { Theme, AvatarGender };

export type Book = {
    image: string;
    title: string;
    author: string;
    description?: string;
    year?: number;
    rating?: number;
    pages?: number;
}

