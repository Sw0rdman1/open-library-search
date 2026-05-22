import type { BookPreview } from '../../types';
import { getCoverUrl } from '../../utils/api';
import './BookCard.css';

interface Props {
  book: BookPreview;
  size?: 'medium' | 'small';
  onClick?: () => void;
}

const BookCard = ({ book, size = 'medium', onClick }: Props) => {
  const authors = book.author_name?.length ? book.author_name.slice(0, 2).join(', ') : 'Unknown Author';
  const className = `book-card ${size}${onClick ? ' clickable' : ''}`;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <article
      className={className}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick ? 0 : -1}
      aria-label={onClick ? `Save ${book.title} to history` : undefined}
    >
      <div className="book-card-cover">
        <img src={getCoverUrl(book.coverId, size === 'small' ? 'S' : 'M')} alt={book.title} />
      </div>
      <div className="book-card-body">
        <h3>{book.title}</h3>
        <p>{authors}</p>
      </div>
    </article>
  );
};

export default BookCard;
