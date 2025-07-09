import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { ChangeEventHandler, useEffect, useState, useMemo } from "react";

interface SearchBoxProps {
  className?: string;
  searchTerm: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  suggestions?: string[];
  maxSuggestions?: number;
  minChars?: number;
}

export default function SearchBox({
  className = "relative w-full sm:max-w-sm",
  searchTerm,
  onChange,
  suggestions = [],
  maxSuggestions = 5,
}: SearchBoxProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filtered = useMemo(() => {
    return searchTerm.length >= 1
      ? suggestions
          .filter((item) =>
            item.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .slice(0, maxSuggestions)
      : [];
  }, [searchTerm, suggestions, maxSuggestions]);

  useEffect(() => {
    setShowSuggestions(filtered.length > 0);
  }, [filtered]);

  const handleSelect = (val: string) => {
    const fakeEvent = {
      target: { value: val },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
    onChange(fakeEvent);
    setShowSuggestions(false);
  };

  return (
    <div className={`relative ${className}`}>
      <Input
        type="search"
        placeholder="Search Here"
        className="pl-12 bg-white outline border placeholder:text-gray-500 h-12 rounded-2xl text-lg font-medium w-full"
        value={searchTerm}
        onChange={onChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        aria-label="Search movies"
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />

      {showSuggestions && (
        <ul className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow max-h-60 overflow-y-auto text-sm">
          {filtered.map((item, idx) => (
            <li
              key={idx}
              onMouseDown={() => handleSelect(item)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
