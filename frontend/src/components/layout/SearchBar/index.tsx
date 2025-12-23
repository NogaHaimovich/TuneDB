import { useState, useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

import useData from "../../../hooks/useData";
import "./styles.scss";

const useKeyboardNavigation = (
  suggestions: any[],
  onSelect: (text: string) => void
) => {
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!suggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter") {
      if (highlightIndex >= 0) {
        e.preventDefault();
        onSelect(suggestions[highlightIndex].title || suggestions[highlightIndex].name);
      }
    }
  };

  return { highlightIndex, handleKeyDown, setHighlightIndex };
};

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { data: suggestions, loading: loadingSuggestions } = useData(
    search.trim() ? `/deezer/suggest?q=${encodeURIComponent(search)}` : "",
    300
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectSuggestion = (text: string) => {
    setSearch(text);
    setShowSuggestions(false);
    navigate(`/search/${encodeURIComponent(text)}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim() !== "") {
      setShowSuggestions(false);
      navigate(`/search/${encodeURIComponent(search)}`);
    }
  };

  const { highlightIndex, handleKeyDown, setHighlightIndex } = useKeyboardNavigation(
    suggestions || [],
    handleSelectSuggestion
  );

  return (
    <div ref={containerRef} className="searchbar__wrapper">
      <div className="searchbar__container">
        <SearchIcon className="searchbar__icon" />
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            className="searchbar__input"
            label="Type to search for song or artist..."
            variant="standard"
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
              setShowSuggestions(value.trim() !== "");
              setHighlightIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            fullWidth
            InputProps={{ disableUnderline: true, autoComplete: "off" }}
          />
        </form>
      </div>

      {loadingSuggestions && <p>Loading suggestions...</p>}

      {showSuggestions && suggestions && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((item: any, index: number) => (
            <div
              key={index}
              className={`suggestion-item ${index === highlightIndex ? "highlight" : ""}`}
              onClick={() => handleSelectSuggestion(item.title || item.name)}
            >
              {item.title || item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
