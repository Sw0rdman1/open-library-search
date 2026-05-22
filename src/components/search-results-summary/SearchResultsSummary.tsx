import { ChevronDown } from 'lucide-react';
import './SearchResultsSummary.css';

interface Props {
    count: number;
    query: string;
    loading: boolean;
    onSeeAll?: () => void;
}

const SearchResultsSummary = ({ count, query, loading, onSeeAll }: Props) => {
    const handleSeeAll = () => {
        onSeeAll?.();
    };

    return (
        <div className={`search-results-summary` + ((!loading && count) ? ' visible' : '')}>
            <p>
                {count} results found for your search <span className='highlight'>{query}</span>
            </p>
            <button className="see-all" onClick={handleSeeAll}>
                See all results
                <ChevronDown size={18} />
            </button>
        </div>
    )
}

export default SearchResultsSummary