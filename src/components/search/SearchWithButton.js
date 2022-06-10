import React from 'react';

const SearchWithButton = ({ onSubmit, onChange, placeHolder, searchId }) => {
  return (
    <form onSubmit={onSubmit} className="min-w-[300px]">
      <div className="relative w-full">
        <input
          type="search"
          id={searchId}
          className="block p-3 w-full z-20 text-sm text-gray-900 bg-gray-50 border border-blue-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-bs5"
          placeholder={placeHolder}
          required=""
          onChange={onChange}
        />
        <button
          type="submit"
          className="absolute top-0 right-0 p-3 text-sm font-medium text-white bg-blue-700 rounded-r-md border border-blue-700 hover:bg-blue-800"
        >
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
        </button>
      </div>
    </form>
  );
};

export default SearchWithButton;
