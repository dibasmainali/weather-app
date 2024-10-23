import React from "react";

function SearchEngine({ query, setQuery, search }) {
  // Handle key press event
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && query.trim() !== "") {
      search(e);
    }
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <input
        type="text"
        className="city-search px-4 py-2 w-64 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter city name"
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress} // Updated from onKeyPress
      />
      <button 
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg transition-all duration-300"
        onClick={(e) => query.trim() !== "" && search(e)} // Prevent empty search
      >
        <i className="fas fa-search" style={{ fontSize: "18px" }}></i>
      </button>
    </div>
  );
}

export default SearchEngine;
