import React from 'react';
import { img500 } from '../../helpers/config';
import { v4 as uuidv4 } from 'uuid';

const PersonGallery = ({ images, defaultImage, alt }) => {
  return (
    <div className="my-10">
      {images.profiles ? (
        <div className="flex flex-wrap justify-center items-center gap-5">
          {images.profiles.length > 0 ? (
            images.profiles.map((photo) => (
              <img
                key={uuidv4()}
                src={`${img500}/${photo.file_path}`}
                alt={alt}
                loading="lazy"
                className={'gallery-image-profile'}
              />
            ))
          ) : (
            <img
              src={`${img500}/${defaultImage}`}
              alt={alt}
              loading="lazy"
              className={'gallery-image-profile'}
            />
          )}
        </div>
      ) : (
        <p className="text-center text-slate-500 mt-3">No Photo Found</p>
      )}
    </div>
  );
};

export default PersonGallery;
