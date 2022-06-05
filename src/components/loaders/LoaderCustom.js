import React from 'react';
import { Circles } from 'react-loader-spinner';
import { Container } from '../../styles/Styles';

const LoaderCustom = () => {
  return (
    <Container className="flex flex-col justify-center items-center w-full">
      <Circles
        type="Circles"
        color="#00BFFF"
        height={50}
        width={200}
        className="m-5"
      />
    </Container>
  );
};

export default LoaderCustom;
