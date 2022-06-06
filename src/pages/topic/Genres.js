import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DocumentMeta from 'react-document-meta';
import { v4 as uuidv4 } from 'uuid';

import { PageTitle, Container } from '../../styles/Styles';
import styled from 'styled-components';
import { API_URL, BASE_URL } from '../../constants/constant';
import { Genres } from '../../constants/routes';

const genresURL = `${API_URL}/genre/`;
const apiKey = `api_key=${process.env.REACT_APP_TMDB}`;

const GenresPage = () => {
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);

  const fetchGenres = async () => {
    const dataMovies = await axios(
      `${genresURL}movie/list?${apiKey}&language=en-US`
    );
    setMovieGenres(dataMovies.data.genres);

    const dataTv = await axios(`${genresURL}tv/list?${apiKey}&language=en-US`);
    setTvGenres(dataTv.data.genres);
  };

  useEffect(() => {
    fetchGenres();
    // eslint-disable-next-line
  }, []);

  const meta = {
    title:
      'Get the list of official genres for Movies and TV Series - CineParadis',
    description:
      'Get the list of official genres for Movies and TV Series - CineParadis',
    canonical: `${BASE_URL}${Genres}`,
    meta: {
      property: {
        'og:title':
          'Get the list of official genres for Movies and TV Series - CineParadis',
        'og:description':
          'Get the list of official genres for Movies and TV Series - CineParadis',
        'og:url': `${BASE_URL}${Genres}`,
      },
    },
  };

  const GenreGrid = ({ title, genres, type }) => (
    <div id={`${type}-genre`}>
      <PageTitle>{title}</PageTitle>
      <div className="flex flex-wrap justify-center mb-2">
        {genres.length > 0 &&
          genres.map((genre) => (
            <GenreItem
              key={uuidv4()}
              to={`/genre/${type}/${genre.name}/${genre.id}`}
            >
              <span className="font-bold drop-shadow-md">{genre.name}</span>
            </GenreItem>
          ))}
      </div>
    </div>
  );

  return (
    <DocumentMeta {...meta} extend>
      <Container>
        {movieGenres && (
          <GenreGrid title="Movies Genres" genres={movieGenres} type="movie" />
        )}
        <br />
        {tvGenres && (
          <GenreGrid title="TV Series Genres" genres={tvGenres} type="tv" />
        )}
      </Container>
    </DocumentMeta>
  );
};

const GenreItem = styled(Link)`
  margin: 10px 15px;
  padding: 10px;
  width: 175px;
  background-image: radial-gradient(
    circle 248px at center,
    #16d9e3 0%,
    #30c7ec 47%,
    #46aef7 100%
  );
  border-radius: 10px;
  box-shadow: 3px 6px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
  transition: all 0.5s;
  white-space: nowrap;

  @media only screen and (max-width: 480px) {
    margin: 10px 8px;
  }

  &:hover {
    box-shadow: 3px 6px 10px rgba(0, 0, 0, 0.4);
  }
`;

export default GenresPage;
