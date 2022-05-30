import React from 'react';
import { optionsMovie } from '../../data/menuData';
import Options from './Options';

const MovieOptions = () => {
  return <Options options={optionsMovie} colored="yes" />;
};

export default MovieOptions;
