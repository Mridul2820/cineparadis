import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../constants/constant';
import MovieSeries from './MovieSeries';

const movieURL = `${baseUrl}/`;
const apiKey = `api_key=${process.env.REACT_APP_TMDB}`;

const WatchItem = ({ id, type }) => {
  const [content, setContent] = useState();

  const fetchData = async () => {
    const { data } = await axios.get(
      `${movieURL}${type}/${id}?${apiKey}&language=en`
    );

    setContent(data);
  };

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {content && (
        <MovieSeries
          key={id}
          id={id}
          media_type={type}
          poster={content.backdrop_path}
          title={content.title || content.name}
          date={content.release_date || content.first_air_date}
          vote_average={content.vote_average}
          description={content.overview}
          showDeleteIcon={true}
        />
      )}
    </div>
  );
};

export default WatchItem;
