import React from "react";
import { FaRandom, FaSearch } from "react-icons/fa";

function SearchBar({ searchTerm, setSearchTerm, handleSearch, getRandomRecipe }) {
  const onKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="search-wrapper">
      <input
        className="search-input"
        placeholder="Search recipes (e.g., chicken, pasta)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button className="btn" onClick={handleSearch}>
        <FaSearch /> Search
      </button>
      <button className="btn btn-alt" onClick={getRandomRecipe}>
        <FaRandom /> Surprise me
      </button>
    </div>
  );
}

export default SearchBar;
