import React from 'react';
import * as ROUTES from '../../constants/routes';
import Options from './Options';

const MovieOptions = () => {
  const options = [
    {
      title: 'Discover',
      route: ROUTES.Movies_Discover,
    },
    {
      title: 'In Theatre',
      route: ROUTES.Movies_In_Theatre,
    },
    {
      title: 'Popular',
      route: ROUTES.Movies_Popular,
    },
    {
      title: 'Top Rated',
      route: ROUTES.Movies_Top_Rated,
    },
    {
      title: 'Upcoming',
      route: ROUTES.Movies_Upcoming,
    },
  ];

  return <Options options={options} colored="yes" />;
};

export default MovieOptions;
