import type { BookPreview, SearchResult } from "../types";

export function getCoverUrl(coverId: number, size: 'S' | 'M' | 'L' = 'M'): string {
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}

export function removeBooksWithoutCovers(data: SearchResult[]): BookPreview[] {
  return data
    .filter((b: SearchResult) => b.cover_i != null)
    .map((book: SearchResult) => ({
      ...book,
      coverId: book.cover_i
    } as BookPreview));
}