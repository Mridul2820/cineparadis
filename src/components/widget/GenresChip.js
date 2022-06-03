import React, { useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Chip } from '@mui/material';
import styled from 'styled-components';
import { API_URL } from '../../constants/constant';

const genresURL = `${API_URL}/genre/`;
const apiKey = `api_key=${process.env.REACT_APP_TMDB}`;

const GenresChip = ({
  type,
  genres,
  setGenres,
  selectedGenres,
  setSelectedGenres,
  setPage,
}) => {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(selectedGenres.filter((s) => s.id !== genre.id));
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `${genresURL}${type}/list?${apiKey}&language=en-US`
    );

    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres({}); // unmounting
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Wrap>
      <p>Select genres for filter</p>
      <GenreList>
        {selectedGenres &&
          selectedGenres?.map((genre) => (
            <Chip
              className="chip"
              key={uuidv4()}
              label={genre.name}
              color="secondary"
              size="small"
              clickable
              onDelete={() => handleRemove(genre)}
            />
          ))}

        {genres &&
          genres.map((genre) => (
            <Chip
              className="chip"
              key={uuidv4()}
              label={genre.name}
              color="primary"
              size="small"
              clickable
              onClick={() => handleAdd(genre)}
            />
          ))}
      </GenreList>
    </Wrap>
  );
};

const Wrap = styled.div`
  p {
    text-align: center;
  }
`;

const GenreList = styled.div`
  padding: 6px 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 16px;

  .chip {
    margin: 2px;
  }
`;

export default GenresChip;
