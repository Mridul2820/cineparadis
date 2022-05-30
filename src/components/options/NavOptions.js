import React from 'react';

import Options from './Options';
import { optionsNav } from '../../data/menuData';

const NavOptions = () => {
  return <Options options={optionsNav} />;
};

export default NavOptions;
