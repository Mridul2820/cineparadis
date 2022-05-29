import React, { useState, useEffect } from 'react';
import axios from 'axios';

import useGenre from '../../hooks/useGenre';

import { PageTitle, Container } from '../../styles/Styles';
import MovieOptions from '../../components/options/MovieOptions';
import ContentGrid from '../../components/widget/ContentGrid';
import Paginate from '../../components/widget/Paginate';
import GenresChip from '../../components/widget/GenresChip';

import { API_URL } from '../../constants/constant';
const movieURL = `${API_URL}/discover/movie?`;
const apiKey = `api_key=${process.env.REACT_APP_TMDB}`;

const DiscoverMovies = () => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genreForURL = useGenre(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `${movieURL}${apiKey}&page=${page}&with_genres=${genreForURL}`
    );

    setMovies(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [page, genreForURL]);

  useEffect(() => {
    document.title = 'Movies - CineParadis';
  }, []);

  return (
    <Container>
      <MovieOptions />
      <PageTitle className="mt-4">Discover Movies</PageTitle>
      <GenresChip
        type="movie"
        genres={genres}
        setGenres={setGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPage}
      />

      <ContentGrid items={movies} media_type="movie" />

      {numOfPages > 1 && movies.length > 0 && (
        <Paginate setPage={setPage} numOfPages={numOfPages} />
      )}
    </Container>
  );
};

export default DiscoverMovies;
