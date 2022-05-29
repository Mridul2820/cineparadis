import React from 'react';
import PageContent from '../../components/content/PageContent';
import { Movies_In_Theatre } from '../../constants/routes';

const MoviesInTheatre = () => {
  return (
    <PageContent
      title="Movies In Theatre"
      uri="now_playing"
      media_type="movie"
      seoTitle="Get a list of movies in theatres - CineParadis"
      seoDescription="Get a list of movies in theatres"
      route={Movies_In_Theatre}
    />
  );
};

export default MoviesInTheatre;
