import React from 'react';
import PageContent from '../../components/content/PageContent';
import { Movies_Upcoming } from '../../constants/routes';

const MoviesUpcoming = () => {
  return (
    <PageContent
      title="Upcoming Movies"
      uri="upcoming"
      media_type="movie"
      seoTitle="Get a list of upcoming movies in theatres - CineParadis"
      seoDescription="Get a list of upcoming movies in theatres"
      route={Movies_Upcoming}
    />
  );
};

export default MoviesUpcoming;
