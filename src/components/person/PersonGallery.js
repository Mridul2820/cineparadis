import React, { useState } from 'react';
import { img500, imgOriginal } from '../../config/imgConfig';
import { v4 as uuidv4 } from 'uuid';
import LightBoxPop from '../widget/LightBoxPop';

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
      : [`${imgOriginal}${defaultImage}`];

  return (
    <div className="my-10">
      {images.profiles ? (
        <div className="flex flex-wrap justify-center items-center gap-5">
          {images.profiles.length > 0 ? (
            images.profiles.map((photo, index) => (
              <img
                key={uuidv4()}
                src={`${img500}${photo.file_path}`}
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
                  src={`${img500}${defaultImage}`}
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
        <LightBoxPop
          imageArray={imageArray}
          photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};

export default PersonGallery;
