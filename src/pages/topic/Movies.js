import React, { useState, useEffect } from 'react';
import axios from 'axios';

import MovieSeries from '../../components/cards/MovieSeries';
import Paginate from '../../components/widget/Paginate';
import GenresChip from '../../components/widget/GenresChip';
import useGenre from '../../hooks/useGenre';

import { PageTitle, Container, ContentList } from '../../styles/Styles';
import { API_URL } from '../../constants/constant';

const movieURL = `${API_URL}/discover/movie?`;
const apiKey = `api_key=${process.env.REACT_APP_TMDB}`;

const Movies = () => {
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
      <PageTitle>Movies</PageTitle>
      <GenresChip
        type="movie"
        genres={genres}
        setGenres={setGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPage}
      />
      <ContentList>
        {movies &&
          movies.map((movie) => (
            <MovieSeries
              key={movie.id}
              id={movie.id}
              poster={movie.backdrop_path}
              title={movie.title || movie.name}
              date={movie.release_date || movie.first_air_date}
              media_type="movie"
              vote_average={movie.vote_average}
              description={movie.overview}
              showWatch={true}
            />
          ))}
      </ContentList>
      {numOfPages > 1 && movies.length > 0 && (
        <Paginate setPage={setPage} numOfPages={numOfPages} />
      )}
    </Container>
  );
};

export default Movies;
