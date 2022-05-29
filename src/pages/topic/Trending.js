import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DocumentMeta from 'react-document-meta';

import MovieSeries from '../../components/cards/MovieSeries';
import Paginate from '../../components/widget/Paginate';

import { PageTitle, Container, ContentList } from '../../styles/Styles';
import {
  BASE_URL,
  API_URL,
  ogDefault,
  ogImage,
  twitterData,
} from '../../constants/constant';

const trendURL = `${API_URL}/trending/all/day?`;
const apiKey = `api_key=${process.env.REACT_APP_TMDB}`;

const Trending = () => {
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
    canonical: `${BASE_URL}/trending`,
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
      <ContentList>
        {trends &&
          trends.map((trend) => (
            <MovieSeries
              key={trend.id}
              id={trend.id}
              poster={trend.backdrop_path}
              title={trend.title || trend.name}
              date={trend.release_date || trend.first_air_date}
              media_type={trend.media_type}
              vote_average={trend.vote_average}
              description={trend.overview}
              showWatch={true}
            />
          ))}
      </ContentList>
      {trends.length > 0 && <Paginate setPage={setPage} />}
    </Container>
  );
};

export default Trending;
