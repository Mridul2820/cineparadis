import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DocumentMeta from 'react-document-meta';
import { Trending } from '../../constants/routes';

import Paginate from '../../components/widget/Paginate';

import { PageTitle, Container } from '../../styles/Styles';
import {
  BASE_URL,
  API_URL,
  ogDefault,
  ogImage,
  twitterData,
} from '../../constants/constant';
import ContentGrid from '../../components/widget/ContentGrid';

const trendURL = `${API_URL}/trending/all/day?`;
const apiKey = `api_key=${process.env.REACT_APP_TMDB}`;

const TrendingPage = () => {
  const [trends, setTrends] = useState([]);
  const [page, setPage] = useState(1);

  const fetchTrending = async () => {
    const { data } = await axios.get(`${trendURL}${apiKey}&page=${page}`);
    setTrends(data.results);
  };

  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);

  const meta = {
    title: 'Trending Movies and TV Series - CineParadis',
    description: 'Trending Movies and TV Series - CineParadis',
    canonical: `${BASE_URL}${Trending}`,
    meta: {
      name: {
        ...twitterData,
      },
      property: {
        ...ogDefault,
        'og:image': ogImage,
        'og:title': 'Trending Movies and TV Series - CineParadis',
        'og:description': 'Trending Movies and TV Series - CineParadis',
        'og:url': `${BASE_URL}/trending`,
      },
    },
  };

  return (
    <Container>
      <DocumentMeta {...meta} />

      <PageTitle>Trending</PageTitle>

      <ContentGrid items={trends} />

      {trends.length > 0 && <Paginate setPage={setPage} />}
    </Container>
  );
};

export default TrendingPage;
