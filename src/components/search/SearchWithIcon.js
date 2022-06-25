import React from 'react';

const SearchWithIcon = ({
  search,
  handleChange,
  placeHolder,
  searchId,
  small,
}) => {
  return (
    <form className="max-w-[300px] mx-auto mb-5">
      <div className="relative w-full">
        <input
          type="search"
          id={searchId}
          className={`block pl-9 w-full z-20 text-sm text-gray-900 bg-gray-50 border border-blue-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-bs5 ${
            small ? 'py-1' : 'py-3'
          }`}
          placeholder={placeHolder}
          value={search}
          onChange={handleChange}
        />

        <div
          className={`absolute left-3 top-0 opacity-90 text-black ${
            small ? 'mt-2' : 'mt-3'
          }`}
        >
          <svg
            className={small ? 'w-4 h-4' : 'w-5 h-5'}
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

export default SearchWithIcon;
