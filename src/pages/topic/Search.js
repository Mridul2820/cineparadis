import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Container, ContentList } from '../../GlobalStyles';

import MovieSeries from '../../components/cards/MovieSeries';
import Paginate from '../../components/widget/Paginate';

import styled from 'styled-components';
import { baseUrl } from '../../constants/constant';

const searchURL = `${baseUrl}/search/`;
const apiKey = `api_key=${process.env.REACT_APP_TMDB}`;

const Search = () => {
  const [type, setType] = useState('movie');
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [contents, setContents] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  // Tabs
  const [active, setActive] = useState(0);

  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
      setType(index === 0 ? 'movie' : 'tv');
      setPage(1);
    }
  };

  const fetchSearch = async () => {
    const { data } = await axios.get(
      `${searchURL}${type}?${apiKey}&language=en-US&query=${searchText}&page=${page}$`
    );

    setContents(data.results);
    setNumOfPages(data.total_pages);
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    fetchSearch();
  };

  useEffect(() => {
    window.scroll(0, 0);
    if (searchText) {
      fetchSearch();
    }

    // eslint-disable-next-line
  }, [page, type]);

  useEffect(() => {
    document.title = 'Search - CineParadis';
  }, []);

  return (
    <Container>
      <div className="mx-auto mb-5 flex gap-x-6 gap-y-8 flex-col sm:flex-row justify-center items-center w-full">
        <form onSubmit={searchSubmit} className="min-w-[300px]">
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="block p-3 w-full z-20 text-sm text-gray-900 bg-gray-50 border border-blue-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-bs5"
              placeholder="Search Movies or TV Shows"
              required=""
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              type="submit"
              className="absolute top-0 right-0 p-3 text-sm font-medium text-white bg-blue-700 rounded-r-md border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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

        <div className="flex justify-center gap-3">
          <Tab
            className="tab-item"
            onClick={handleClick}
            active={active === 0}
            id={0}
          >
            Search Movies
          </Tab>
          <Tab
            className="tab-item"
            onClick={handleClick}
            active={active === 1}
            id={1}
          >
            Search Series
          </Tab>
        </div>
      </div>
      <ContentList>
        {contents &&
          contents.map((content) => (
            <MovieSeries
              key={content.id}
              id={content.id}
              poster={content.backdrop_path}
              title={content.title || content.name}
              date={content.release_date || content.first_air_date}
              media_type={type}
              vote_average={content.vote_average}
              description={content.overview}
              showWatch={true}
            />
          ))}
        {searchText && !contents && <h2>Try searching something else</h2>}
      </ContentList>
      {numOfPages > 1 && contents.length > 0 && (
        <Paginate setPage={setPage} numOfPages={numOfPages} />
      )}
    </Container>
  );
};

const Tab = styled.div`
  width: 50%;
  white-space: nowrap;
  padding: 12px 18px;
  line-height: 1;
  border: ${(props) =>
    props.active ? '2px solid rgb(96, 165, 250)' : '2px solid transparent'};
  opacity: ${(props) => (props.active ? '1' : '.8')};
  background-color: ${(props) =>
    props.active ? 'white' : 'rgb(195, 221, 253)'};
  transition: background-color 0.5s ease-in-out;
`;

export default Search;
