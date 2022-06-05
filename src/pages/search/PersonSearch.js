import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DocumentMeta from 'react-document-meta';
import { v4 as uuidv4 } from 'uuid';

import { Container, PageTitle } from '../../styles/Styles';
import Paginate from '../../components/widget/Paginate';
import { API_URL, BASE_URL } from '../../constants/constant';
import { Perosn_Search } from '../../constants/routes';
import PersonCard from '../../components/cards/PersonCard';
import SearchBarIcon from '../../components/search/SearchBarIcon';

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

  const onChange = (e) => {
    setSearchText(e.target.value);
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
          <SearchBarIcon
            onChange={onChange}
            onSubmit={searchSubmit}
            placeHolder="Search for People"
            searchId="search-person"
          />
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

export default PersonSearch;
