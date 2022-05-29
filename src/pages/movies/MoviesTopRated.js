import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Paginate from '../../components/widget/Paginate';

import { PageTitle, Container, ContentList } from '../../styles/Styles';
import { API_URL } from '../../constants/constant';
import ContentGrid from '../../components/widget/ContentGrid';
import MovieOptions from '../../components/options/MovieOptions';

const trendURL = `${API_URL}/movie/top_rated?`;
const apiKey = `api_key=${process.env.REACT_APP_TMDB}`;

const MoviesTopRated = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const fetchTrending = async () => {
    const { data } = await axios.get(`${trendURL}${apiKey}&page=${page}`);

    // console.log('data', data)
    setMovies(data.results);
  };

  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    document.title = 'Top Rated - CineParadis';
  }, []);

  return (
    <Container>
      <MovieOptions />
      <PageTitle className="mt-4">Top Rated Movies</PageTitle>
      <ContentGrid items={movies} media_type="movie" />
      {movies.length > 0 && <Paginate setPage={setPage} />}
    </Container>
  );
};

export default MoviesTopRated;
