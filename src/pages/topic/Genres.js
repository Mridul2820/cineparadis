import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { PageTitle } from '../../GlobalStyles';
import styled from 'styled-components';
import { baseUrl } from '../../constants/constant';

const genresURL = `${baseUrl}/genre/`;
const apiKey = `api_key=${process.env.REACT_APP_TMDB}`;

const Genres = () => {
  const [genres, setGenres] = useState([]);

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `${genresURL}movie/list?${apiKey}&language=en-US`
    );

    setGenres(data.genres);
  };

  useEffect(() => {
    document.title = 'Genres - CineParadis';

    fetchGenres();
  }, []);

  return (
    <Container>
      <PageTitle>genres</PageTitle>
      <p>Get Movies and Series by genres</p>
      <GenreList>
        {genres.length > 0 &&
          genres.map((genre) => (
            <GenreItem key={genre.id} to={`/genre/${genre.name}/${genre.id}`}>
              <span className='font-bold drop-shadow-md'>{genre.name}</span>
            </GenreItem>
          ))}
      </GenreList>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px 40px;
  margin: 0 auto;
  min-height: calc(100vh - 190px);

  @media only screen and (max-width: 480px) {
    padding: 10px;
  }

  p {
    text-align: center;
    margin-bottom: 10px;
  }
`;

const GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const GenreItem = styled(Link)`
  margin: 10px 15px;
  padding: 10px;
  width: 150px;
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

export default Genres;
