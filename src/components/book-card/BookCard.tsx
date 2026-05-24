import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { BookPreview } from '../../types';
import { addViewedBook } from '../../utils/history';
import { getCoverUrl } from '../../utils/api';
import './BookCard.css';

interface Props {
  book: BookPreview;
  size?: 'medium' | 'small';
  onClick?: () => void;
}

const BookCard = ({ book, size = 'medium', onClick }: Props) => {
  const navigate = useNavigate();
  const authors = book.author_name?.length ? book.author_name.slice(0, 2).join(', ') : 'Unknown Author';
  const className = `book-card ${size} clickable`;

  const handleCardClick = () => {
    addViewedBook(book);
    const workId = book.key.split('/').pop();
    if (workId) {
      navigate(`/book/${workId}`);
    }
    if (onClick) {
      onClick();
    }
  };

  const ariaLabel = useMemo(
    () => `View details for ${book.title}`,
    [book.title],
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick();
    }
  };

  return (
    <article
      className={className}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={ariaLabel}
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
