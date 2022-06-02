import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import DocumentMeta from 'react-document-meta';

import { API_URL, BASE_URL } from '../../constants/constant';
import { Popular_Persons } from '../../constants/routes';
import { Container, PageTitle } from '../../styles/Styles';
import Paginate from '../../components/widget/Paginate';
import PersonCard from '../../components/cards/PersonCard';

const popularUrl = `${API_URL}/person/popular?`;
const apiKey = `api_key=${process.env.REACT_APP_TMDB}`;

const PopularPersons = () => {
  const [persons, setPersons] = useState([]);
  const [page, setPage] = useState(1);

  const fetchPopular = async () => {
    const { data } = await axios(`${popularUrl}${apiKey}&page=${page}`);
    setPersons(data.results);
  };

  useEffect(() => {
    fetchPopular();
    // eslint-disable-next-line
  }, [page]);

  const meta = {
    title: 'Get the list of popular people - CineParadis',
    description: 'Get the list of popular people - CineParadis',
    canonical: `${BASE_URL}${Popular_Persons}`,
    meta: {
      property: {
        'og:title': 'Get the list of popular people - CineParadis',
        'og:description': 'Get the list of popular people - CineParadis',
        'og:url': `${BASE_URL}${Popular_Persons}`,
      },
    },
  };

  return (
    <DocumentMeta {...meta} extend>
      <Container>
        <PageTitle>Trending Persons Today</PageTitle>
        {persons && persons.length > 0 && (
          <div className="flex justify-center items-start flex-wrap mb-6 gap-4 mt-5">
            {persons.map((person) => (
              <PersonCard key={uuidv4()} person={person} />
            ))}
          </div>
        )}
        {persons.length > 0 && <Paginate setPage={setPage} />}
      </Container>
    </DocumentMeta>
  );
};

export default PopularPersons;
