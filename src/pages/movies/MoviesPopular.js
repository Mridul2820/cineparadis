import React from 'react';
import PageContent from '../../components/content/PageContent';
import { Movies_Popular } from '../../constants/routes';

const MoviesPopular = () => {
  return (
    <PageContent
      title="Popular Movies"
      uri="popular"
      media_type="movie"
      seoTitle="Get a daily updated list of the current popular movies - CineParadis"
      seoDescription="Get a daily updated list of the current popular movies."
      route={Movies_Popular}
    />
  );
};

export default MoviesPopular;
