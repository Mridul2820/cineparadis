import React from 'react';
import * as ROUTES from '../../constants/routes';
import Options from './Options';

const SeriesOptions = () => {
  const options = [
    {
      title: 'Discover',
      route: ROUTES.Series_Discover,
    },
    {
      title: 'Popular',
      route: ROUTES.Series_Popular,
    },
    {
      title: 'Top Rated',
      route: ROUTES.Series_Top_Rated,
    },
    {
      title: 'Upcoming',
      route: ROUTES.Series_Upcoming,
    },
  ];

  return <Options options={options} colored="yes" />;
};

export default SeriesOptions;
