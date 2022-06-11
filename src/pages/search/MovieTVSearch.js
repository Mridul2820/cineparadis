import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DocumentMeta from 'react-document-meta';

import { Container } from '../../styles/Styles';

import Paginate from '../../components/widget/Paginate';

import styled from 'styled-components';
import { API_URL, BASE_URL } from '../../constants/constant';

import { Search } from '../../constants/routes';
import ContentGrid from '../../components/widget/ContentGrid';
import SearchWithButton from '../../components/search/SearchWithButton';

const searchURL = `${API_URL}/search/`;
const apiKey = `api_key=${process.env.REACT_APP_TMDB}`;

const MovieTVSearch = () => {
  const [type, setType] = useState('movie');
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [contents, setContents] = useState();
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
      `${searchURL}${type}?${apiKey}&language=en-US&query=${searchText}&page=${page}`
    );

    setContents(data);
    setNumOfPages(data.total_pages);
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    fetchSearch();
  };

  const onChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    window.scroll(0, 0);
    if (searchText) {
      fetchSearch();
    }

    // eslint-disable-next-line
  }, [page, type]);

  const meta = {
    title: 'Search for Movies and TV Series - CineParadis',
    description: 'Search for Movies and TV Series - CineParadis',
    canonical: `${BASE_URL}${Search}`,
    meta: {
      property: {
        'og:title': 'Search for Movies and TV Series - CineParadis',
        'og:description': 'Search for Movies and TV Series - CineParadis',
        'og:url': `${BASE_URL}${Search}`,
      },
    },
  };

  return (
    <DocumentMeta {...meta} extend>
      <Container>
        <div className="mx-auto mb-5 flex gap-x-6 gap-y-8 flex-col sm:flex-row justify-center items-center w-full">
          <SearchWithButton
            onChange={onChange}
            onSubmit={searchSubmit}
            placeHolder="Search for Movies and TV Series"
            searchId="search-movie-tv"
          />

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

        {contents === undefined ? (
          ''
        ) : (
          <>
            {searchText && contents.results.length > 0 ? (
              <>
                <p className="text-center text-slate-500 mt-3">
                  Found <b>{contents.total_results} Result(s)</b>
                </p>
                <ContentGrid items={contents.results} media_type={type} />
              </>
            ) : (
              <p className="text-center text-slate-500 mt-3">
                Oops, No Results Found
                <br />
                Try searching something else
              </p>
            )}
          </>
        )}
        {numOfPages > 1 && contents.results.length > 0 && (
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

export default MovieTVSearch;
