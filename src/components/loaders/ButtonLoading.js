import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const ButtonLoading = () => {
  return (
    <TailSpin
      color="white"
      height={18}
      width={18}
      ariaLabel="three-circles-rotating"
    />
  );
};

export default ButtonLoading;
