import React from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const LightBoxPop = ({ imageArray, photoIndex, setPhotoIndex, setIsOpen }) => {
  return (
    <Lightbox
      mainSrc={imageArray[photoIndex]}
      nextSrc={imageArray[(photoIndex + 1) % imageArray.length]}
      prevSrc={
        imageArray[(photoIndex + imageArray.length - 1) % imageArray.length]
      }
      onCloseRequest={() => setIsOpen(false)}
      onMovePrevRequest={() =>
        setPhotoIndex(photoIndex + imageArray.length - 1) % imageArray.length
      }
      onMoveNextRequest={() =>
        setPhotoIndex((photoIndex + 1) % imageArray.length)
      }
    />
  );
};

export default LightBoxPop;
