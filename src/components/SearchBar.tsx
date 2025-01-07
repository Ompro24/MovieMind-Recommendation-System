import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery('');
    setIsExpanded(false);
    onSearch('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative">
        <div
          className={`flex items-center transition-all duration-300 ${
            isExpanded ? 'bg-black/80 rounded-md' : 'bg-transparent'
          }`}
        >
          <button
            onClick={() => {
              setIsExpanded(true);
              inputRef.current?.focus();
            }}
            className="p-2 text-white hover:text-red-600 transition-colors"
          >
            <Search className="h-6 w-6" />
          </button>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."
            className={`bg-transparent text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
              isExpanded ? 'w-64 px-2' : 'w-0 px-0'
            }`}
          />
          {isExpanded && query && (
            <button
              onClick={handleClear}
              className="p-2 text-white hover:text-red-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}