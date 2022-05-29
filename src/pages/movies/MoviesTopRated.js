import React from 'react';
import PageContent from '../../components/content/PageContent';
import { Movies_Popular } from '../../constants/routes';

const MoviesTopRated = () => {
  return (
    <PageContent
      title="Top Rated Movies"
      uri="top_rated"
      media_type="movie"
      seoTitle="Get the top rated movies on TMDB - CineParadis"
      seoDescription="Get the top rated movies on TMDB"
      route={Movies_Popular}
    />
  );
};

export default MoviesTopRated;
