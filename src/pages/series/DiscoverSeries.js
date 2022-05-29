import React, { useState, useEffect } from 'react';
import axios from 'axios';

import MovieSeries from '../../components/cards/MovieSeries';
import Paginate from '../../components/widget/Paginate';
import GenresChip from '../../components/widget/GenresChip';
import useGenre from '../../hooks/useGenre';

import { PageTitle, Container, ContentList } from '../../styles/Styles';
import { API_URL } from '../../constants/constant';

const seriesURL = `${API_URL}/discover/tv?`;
const apiKey = `api_key=${process.env.REACT_APP_TMDB}`;

const DiscoverSeries = () => {
  const [page, setPage] = useState(1);
  const [series, setSeries] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genreForURL = useGenre(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `${seriesURL}${apiKey}&page=${page}&with_genres=${genreForURL}`
    );

    // console.log(data)

    setSeries(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [page, genreForURL]);

  useEffect(() => {
    document.title = 'TV Series - CineParadis';
  }, []);

  return (
    <Container>
      <PageTitle>TV Series</PageTitle>
      <GenresChip
        type="tv"
        genres={genres}
        setGenres={setGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPage}
      />
      <ContentList>
        {series &&
          series.map((tv) => (
            <MovieSeries
              key={tv.id}
              id={tv.id}
              poster={tv.backdrop_path}
              title={tv.title || tv.name}
              date={tv.release_date || tv.first_air_date}
              media_type="tv"
              vote_average={tv.vote_average}
              description={tv.overview}
              showWatch={true}
            />
          ))}
      </ContentList>
      {numOfPages > 1 && series.length > 0 && (
        <Paginate setPage={setPage} numOfPages={numOfPages} />
      )}
    </Container>
  );
};

export default DiscoverSeries;