import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import * as ROUTES from '../../constants/routes';
import { optionsMovie, optionsSeries, optionsAll } from '../../data/menuData';
import logo from '../../assets/logo-black.PNG';
import UserContext from '../../context/user';

const MenuRow = ({ title, items }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <p className="font-semibold">{title}</p>
      {items.map((item) => (
        <Link
          to={item.route}
          key={uuidv4()}
          className="font-medium hover:text-blue-800 hover:underline hover:underline-offset-2 duration-300"
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

const FooterMenu = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="shadow-2xl w-full border-t-2 border-t-slate-300 bg-blue-50">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-5xl mx-auto py-6 px-3 xs:px-8">
        <div className="flex flex-col gap-3">
          <Link
            to={user ? ROUTES.DASHBOARD : ROUTES.ROOT}
            className="font-semibold text-xl"
          >
            <img src={logo} alt="logo" className="w-20" />
          </Link>
          <Link
            to={user ? ROUTES.DASHBOARD : ROUTES.ROOT}
            className="font-semibold text-xl"
          >
            CineParadis
          </Link>
        </div>
        <MenuRow items={optionsAll} title="In CineParadis" />
        <MenuRow items={optionsMovie} title="In Movies" />
        <MenuRow items={optionsSeries} title="In TV Series" />
      </div>
    </div>
  );
};

export default FooterMenu;
