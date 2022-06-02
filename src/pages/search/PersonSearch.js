import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DocumentMeta from 'react-document-meta';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { Container, PageTitle } from '../../styles/Styles';
import Paginate from '../../components/widget/Paginate';
import { API_URL, BASE_URL } from '../../constants/constant';
import { Perosn_Search } from '../../constants/routes';
import PersonCard from '../../components/cards/PersonCard';

const searchURL = `${API_URL}/search/person`;
const apiKey = `api_key=${process.env.REACT_APP_TMDB}`;

const PersonSearch = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [persons, setPersons] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const fetchSearch = async () => {
    const { data } = await axios.get(
      `${searchURL}?${apiKey}&language=en-US&query=${searchText}&page=${page}$`
    );

    setPersons(data.results);
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
  }, [page]);

  const meta = {
    title: 'Search for People - CineParadis',
    description: 'Search for People - CineParadis',
    canonical: `${BASE_URL}${Perosn_Search}`,
    meta: {
      property: {
        'og:title': 'Search for People - CineParadis',
        'og:description': 'Search for People - CineParadis',
        'og:url': `${BASE_URL}${Perosn_Search}`,
      },
    },
  };

  return (
    <DocumentMeta {...meta} extend>
      <Container>
        <PageTitle>Search People</PageTitle>

        <div className="mx-auto my-5 flex gap-x-6 gap-y-8 flex-col sm:flex-row justify-center items-center w-full">
          <form onSubmit={searchSubmit} className="min-w-[300px]">
            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="block p-3 w-full z-20 text-sm text-gray-900 bg-gray-50 border border-blue-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-bs5"
                placeholder="Search People"
                required=""
                onChange={(e) => setSearchText(e.target.value)}
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
        </div>

        <div className="flex justify-center items-start flex-wrap mb-6 gap-4 mt-5">
          {persons.map((person) => (
            <PersonCard key={uuidv4()} person={person} />
          ))}
        </div>

        {searchText && !persons && <h2>Try searching something else</h2>}

        {numOfPages > 1 && persons.length > 0 && (
          <Paginate setPage={setPage} numOfPages={numOfPages} />
        )}
      </Container>
    </DocumentMeta>
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

export default PersonSearch;
