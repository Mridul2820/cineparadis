// Icons
import { AiOutlineFire, AiOutlineSearch } from 'react-icons/ai';
import { RiMovie2Line, RiFileListLine } from 'react-icons/ri';
import { FaTv } from 'react-icons/fa';

import * as ROUTES from '../constants/routes';

export const optionsMovie = [
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

export const optionsSeries = [
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

export const optionsNav = [
  {
    title: 'Trending',
    route: ROUTES.Trending,
    icon: <AiOutlineFire />,
  },
  {
    title: 'Movies',
    route: ROUTES.Movies_Discover,
    icon: <RiMovie2Line />,
    activeIf: [
      ROUTES.Movies_Discover,
      ROUTES.Movies_In_Theatre,
      ROUTES.Movies_Popular,
      ROUTES.Movies_Top_Rated,
      ROUTES.Movies_Upcoming,
    ],
  },
  {
    title: 'Series',
    route: ROUTES.Series_Discover,
    icon: <FaTv />,
    activeIf: [
      ROUTES.Series_Discover,
      ROUTES.Series_Popular,
      ROUTES.Series_Top_Rated,
      ROUTES.Series_Upcoming,
    ],
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

export const optionsAll = [
  {
    title: 'Trending List',
    route: ROUTES.Trending,
  },
  {
    title: 'Genres List',
    route: ROUTES.Genres,
  },
  {
    title: 'Popular Persons',
    route: ROUTES.Popular_Persons,
  },
  {
    title: 'Movie & TV Search',
    route: ROUTES.Search,
  },

  {
    title: 'Person Search',
    route: ROUTES.Perosn_Search,
  },
];
