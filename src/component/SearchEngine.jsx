import React from "react";

function SearchEngine({ query, setQuery, search }) {
  // Handle key press event
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      search(e);
    }
  };

  return (
    <div className="flex justify-center items-center mt-4 px-4 sm:px-0">
      <input
        type="text"
        className="city-search px-4 py-2 w-full max-w-sm sm:w-80 lg:w-96 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-md"
        placeholder="Enter city name"
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg transition-all duration-300 shadow-md transform hover:scale-105"
        onClick={(e) => query.trim() !== "" && search(e)}
      >
        <i className="fas fa-search" style={{ fontSize: "18px" }}></i>
      </button>
    </div>
  );
}

export default SearchEngine;
