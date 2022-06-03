import React from 'react';

const SearchBar = ({ search, handleChange, placeHolder, searchId }) => {
  return (
    <form className="max-w-[300px] mx-auto mb-5">
      <div className="relative w-full">
        <input
          type="search"
          id={searchId}
          className="block p-3 w-full z-20 text-sm text-gray-900 bg-gray-50 border border-blue-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-bs5"
          placeholder={placeHolder}
          value={search}
          onChange={handleChange}
        />

        <div className="absolute right-0 top-0 mt-3 mr-3">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;