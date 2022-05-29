import React from 'react';
import * as ROUTES from '../../constants/routes';

// Icons
import { AiOutlineFire, AiOutlineSearch } from 'react-icons/ai';
import { RiMovie2Line, RiFileListLine } from 'react-icons/ri';
import { FaTv } from 'react-icons/fa';
import Options from './Options';

const NavOptions = () => {
  const options = [
    {
      title: 'Trending',
      route: ROUTES.Trending,
      icon: <AiOutlineFire />,
    },
    {
      title: 'Movies',
      route: ROUTES.Movies_Discover,
      icon: <RiMovie2Line />,
    },
    {
      title: 'Series',
      route: ROUTES.Series_Discover,
      icon: <FaTv />,
    },
    {
      title: 'Genres',
      route: ROUTES.Genres,
      icon: <RiFileListLine />,
    },
    {
      title: 'Search',
      route: ROUTES.Search,
      icon: <AiOutlineSearch />,
    },
  ];

  return <Options options={options} />;
};

export default NavOptions;
