import React from 'react';
import PageContent from '../../components/content/PageContent';
import { Series_Upcoming } from '../../constants/routes';

const SeriesUpcoming = () => {
  return (
    <PageContent
      title="Upcoming TV shows"
      uri="on_the_air"
      media_type="tv"
      seoTitle="Get a list of shows that are currently on the air - CineParadis"
      seoDescription="Get a list of shows that are currently on the air"
      route={Series_Upcoming}
    />
  );
};

export default SeriesUpcoming;
