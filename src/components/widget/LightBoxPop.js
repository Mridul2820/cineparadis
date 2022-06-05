import React from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import LoaderCustom from '../loaders/LoaderCustom';

const LightBoxPop = ({ imageArray, photoIndex, setPhotoIndex, setIsOpen }) => {
  return (
    <Lightbox
      mainSrc={imageArray[photoIndex]}
      onCloseRequest={() => setIsOpen(false)}
      nextSrc={imageArray[(photoIndex + 1) % imageArray.length]}
      prevSrc={
        imageArray[(photoIndex + imageArray.length - 1) % imageArray.length]
      }
      onMoveNextRequest={() =>
        setPhotoIndex((photoIndex + 1) % imageArray.length)
      }
      onMovePrevRequest={() =>
        setPhotoIndex((photoIndex + imageArray.length - 1) % imageArray.length)
      }
      loader={<LoaderCustom />}
      imagePadding={50}
      closeLabel="Close Modal"
    />
  );
};

export default LightBoxPop;
