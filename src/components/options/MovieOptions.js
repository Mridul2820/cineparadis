import React from 'react';
import * as ROUTES from '../../constants/routes';
import Options from './Options';

const MovieOptions = () => {
  const options = [
    {
      title: 'Discover',
      route: ROUTES.MoviesDiscover,
    },
    {
      title: 'In Theatre',
      route: ROUTES.MoviesInTheatre,
    },
    {
      title: 'Popular',
      route: ROUTES.MoviesPopular,
    },
    {
      title: 'Top Rated',
      route: ROUTES.MoviesTopRated,
    },
    {
      title: 'Upcoming',
      route: ROUTES.MoviesUpcoming,
    },
  ];

  return <Options options={options} />;
};

export default MovieOptions;
