import React, { useState } from 'react';
import { img500, imgOriginal } from '../../helpers/config';
import { v4 as uuidv4 } from 'uuid';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const PersonGallery = ({ images, defaultImage, alt }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  const imageArray =
    images.profiles.length > 0
      ? images.profiles?.map(function (image) {
          return `${imgOriginal}${image.file_path}`;
        })
      : [`${imgOriginal}/${defaultImage}`];
  return (
    <div className="my-10">
      {images.profiles ? (
        <div className="flex flex-wrap justify-center items-center gap-5">
          {images.profiles.length > 0 ? (
            images.profiles.map((photo, index) => (
              <img
                key={uuidv4()}
                src={`${img500}/${photo.file_path}`}
                alt={alt}
                loading="lazy"
                className={'gallery-image-profile cursor-pointer'}
                onClick={() => {
                  setIsOpen(true);
                  setPhotoIndex(index);
                }}
              />
            ))
          ) : (
            <>
              {defaultImage ? (
                <img
                  src={`${img500}/${defaultImage}`}
                  alt={alt}
                  loading="lazy"
                  className={'gallery-image-profile cursor-pointer'}
                  onClick={() => {
                    setIsOpen(true);
                    setPhotoIndex(0);
                  }}
                />
              ) : (
                <p className="text-center text-slate-500 mt-3">
                  No Photo Found
                </p>
              )}
            </>
          )}
        </div>
      ) : (
        <p className="text-center text-slate-500 mt-3">No Photo Found</p>
      )}

      {isOpen && (
        <Lightbox
          mainSrc={imageArray[photoIndex]}
          nextSrc={imageArray[(photoIndex + 1) % imageArray.length]}
          prevSrc={
            imageArray[(photoIndex + imageArray.length - 1) % imageArray.length]
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex(photoIndex + imageArray.length - 1) %
            imageArray.length
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % imageArray.length)
          }
        />
      )}
    </div>
  );
};

export default PersonGallery;
