import React, { useState } from 'react';
import { Search, Sun, Moon, AlertTriangle } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLightMode: boolean;
  setIsLightMode: (light: boolean) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  isLightMode,
  setIsLightMode,
}) => {
  const [isValidRegex, setIsValidRegex] = useState(true);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);

    if (val.trim() === '') {
      setIsValidRegex(true);
      return;
    }

    try {
      new RegExp(val);
      setIsValidRegex(true);
    } catch (err) {
      setIsValidRegex(false);
    }
  };

  return (
    <div className="dark:bg-[#111418] bg-white border dark:border-slate-800 border-slate-200 rounded-xl p-4 shadow-md flex items-center justify-between gap-4 transition-colors">
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Regex Search (e.g. ^yolo | filter.* | .*hackathon)..."
          className={`w-full pl-10 pr-10 py-2 text-sm rounded-lg border focus:outline-none transition-all ${
            searchQuery === ''
              ? 'dark:bg-slate-900 bg-slate-50 dark:border-slate-800 border-slate-200 focus:border-blue-500/50 dark:focus:border-slate-600 focus:ring-1 focus:ring-blue-500/10'
              : isValidRegex
              ? 'dark:bg-slate-900/60 bg-emerald-50/10 border-emerald-500/40 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-emerald-500/10'
              : 'dark:bg-slate-900/60 bg-red-50/10 border-red-500/40 text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-red-500/10'
          }`}
        />
        {searchQuery && !isValidRegex && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-red-500" title="Invalid Regex Pattern">
            <AlertTriangle size={18} />
          </div>
        )}
      </div>

      <button
        onClick={() => setIsLightMode(!isLightMode)}
        className="p-2 rounded-lg dark:bg-slate-800 bg-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
        title={isLightMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      >
        {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    </div>
  );
};

export default SearchBar;
