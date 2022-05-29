import React from 'react';
import PageContent from '../../components/content/PageContent';
import { Series_Popular } from '../../constants/routes';

const SeriesPopular = () => {
  return (
    <PageContent
      title="Popular TV shows"
      uri="popular"
      media_type="tv"
      seoTitle="Get a list of the current popular TV shows - CineParadis"
      seoDescription="Get a list of the current popular TV shows"
      route={Series_Popular}
    />
  );
};

export default SeriesPopular;
