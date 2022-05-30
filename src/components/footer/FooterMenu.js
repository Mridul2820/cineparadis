import React from 'react';
import { Link } from 'react-router-dom';
import { optionsMovie, optionsSeries, optionsAll } from '../../data/menuData';
import logo from '../../assets/logo-black.PNG';

const MenuRow = ({ title, items }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <p className="font-semibold">{title}</p>
      {items.map((item, index) => (
        <Link
          to={item.route}
          key={index}
          className="font-medium hover:text-blue-800 hover:underline hover:underline-offset-2 duration-300"
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

const FooterMenu = () => {
  return (
    <div className="shadow-2xl w-full border-t-2 border-t-slate-300 bg-blue-50">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-5xl mx-auto py-6 px-3 xs:px-8">
        <div className="flex flex-col gap-3">
          <img src={logo} alt="logo" className="w-20" />
          <p className="font-semibold text-xl">CineParadis</p>
        </div>
        <MenuRow items={optionsAll} title="In CineParadis" />
        <MenuRow items={optionsMovie} title="In Movies" />
        <MenuRow items={optionsSeries} title="In TV Series" />
      </div>
    </div>
  );
};

export default FooterMenu;
