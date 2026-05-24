import { Search } from 'lucide-react'
import { useEffect, useRef } from 'react';

import './SearchBar.css';

interface SearchBarProps {
    value: string;
    onChange: (val: string) => void;
    loading: boolean;
}

const SearchBar = ({ value, onChange, loading }: SearchBarProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Start typing book title..."
                className="search-bar"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <button className="search-button" disabled={loading}>
                <Search />
            </button>
        </div>
    )
}

export default SearchBar