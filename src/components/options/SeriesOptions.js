import React from 'react';
import { optionsSeries } from '../../data/menuData';
import Options from './Options';

const SeriesOptions = () => {
  return <Options options={optionsSeries} colored="yes" />;
};

export default SeriesOptions;
