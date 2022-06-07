import React, { useState } from 'react';
import rehypeRaw from 'rehype-raw';
import ReactMarkdown from 'react-markdown';

import LightBoxPop from '../widget/LightBoxPop';
import { img500, imgOriginal } from '../../config/imgConfig';

const PersonIntro = ({ creditData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  const imageArray = [`${imgOriginal}${creditData?.profile_path}`];

  return (
    <div className="flex flex-col md:flex-row gap-4 items-start">
      {isOpen && (
        <LightBoxPop
          imageArray={imageArray}
          photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
          setIsOpen={setIsOpen}
        />
      )}

      <img
        src={
          creditData?.profile_path
            ? `${img500}${creditData?.profile_path}`
            : 'https://via.placeholder.com/500x750'
        }
        alt={creditData?.name}
        className="w-60 rounded-md mx-auto md:mx-0 cursor-pointer"
        onClick={() => {
          if (creditData?.profile_path) {
            setIsOpen(true);
            setPhotoIndex(0);
          }
        }}
      />
      <div>
        <h1 className="text-center md:text-left text-2xl md:text-4xl font-bold mb-3">
          {creditData?.name}
        </h1>
        {creditData?.biography && (
          <>
            <p className="text-center md:text-left font-semibold text-base md:text-xl mb-1">
              Biography
            </p>
            <div className="prose prose-zinc max-w-none">
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                // eslint-disable-next-line
                children={creditData?.biography}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PersonIntro;
