import React from 'react';
import PageContent from '../../components/content/PageContent';
import { Series_Top_Rated } from '../../constants/routes';

const SeriesTopRated = () => {
  return (
    <PageContent
      title="Top Rated TV shows"
      uri="top_rated"
      media_type="tv"
      seoTitle="Get a list of the top rated TV shows - CineParadis"
      seoDescription="Get a list of the top rated TV shows"
      route={Series_Top_Rated}
    />
  );
};

export default SeriesTopRated;
