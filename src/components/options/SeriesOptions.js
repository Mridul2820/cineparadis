import React from 'react';
import * as ROUTES from '../../constants/routes';
import Options from './Options';

const SeriesOptions = () => {
  const options = [
    {
      title: 'Discover',
      route: ROUTES.SeriesDiscover,
    },
    {
      title: 'Latest',
      route: ROUTES.SeriesLatest,
    },
    {
      title: 'Popular',
      route: ROUTES.SeriesPopular,
    },
    {
      title: 'Top Rated',
      route: ROUTES.SeriesTopRated,
    },
    {
      title: 'Upcoming',
      route: ROUTES.SeriesUpcoming,
    },
  ];

  return <Options options={options} />;
};

export default SeriesOptions;
