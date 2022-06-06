import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { img500, imgOriginal } from '../../config/imgConfig';
import LightBoxPop from '../widget/LightBoxPop';

const Gallery = ({ title, photos, backdrop_path, poster_path }) => {
  // Tabs
  const [active, setActive] = useState(0);

  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  let imageArray = [];
  if (active === 0) {
    imageArray =
      photos.backdrops.length > 0
        ? photos.backdrops?.map(function (image) {
            return `${imgOriginal}${image.file_path}`;
          })
        : [`${imgOriginal}${backdrop_path}`];
  }

  if (active === 2) {
    imageArray =
      photos.posters.length > 0
        ? photos.posters?.map(function (image) {
            return `${imgOriginal}${image.file_path}`;
          })
        : [`${imgOriginal}${poster_path}`];
  }

  if (active === 1) {
    imageArray =
      photos?.logos?.length > 0 &&
      photos?.logos?.map(function (image) {
        return `${imgOriginal}${image.file_path}`;
      });
  }

  return (
    <section className="tab-section">
      <h2 className="detail-tab-title">Gallery of {title} </h2>
      {photos.posters.length > 0 ||
      photos.logos.length > 0 ||
      photos.posters.length > 0 ||
      backdrop_path ||
      poster_path ? (
        <>
          <div className="mb-8 flex justify-center gap-3 md:px-2">
            {(photos?.posters?.length > 0 || backdrop_path) && (
              <Tab
                className="tab-item"
                onClick={handleClick}
                active={active === 0}
                id={0}
              >
                Images
              </Tab>
            )}
            {photos?.logos?.length > 0 && (
              <Tab
                className="tab-item"
                onClick={handleClick}
                active={active === 1}
                id={1}
              >
                Logos
              </Tab>
            )}
            {(photos?.posters?.length > 0 || poster_path) && (
              <Tab
                className="tab-item"
                onClick={handleClick}
                active={active === 2}
                id={2}
              >
                Posters
              </Tab>
            )}
          </div>
          <div className="flex flex-wrap justify-center items-center gap-5">
            {active === 0 && (photos?.backdrops?.length > 0 || backdrop_path) && (
              <>
                {photos.backdrops.length > 0 ? (
                  photos.backdrops.map((photo, index) => (
                    <img
                      key={uuidv4()}
                      src={`${img500}${photo.file_path}`}
                      alt={photo.title}
                      loading="lazy"
                      className="gallery-image cursor-pointer"
                      onClick={() => {
                        setIsOpen(true);
                        setPhotoIndex(index);
                      }}
                    />
                  ))
                ) : (
                  <img
                    src={`${img500}${backdrop_path}`}
                    alt={title}
                    loading="lazy"
                    className="gallery-image cursor-pointer"
                    onClick={() => {
                      setIsOpen(true);
                      setPhotoIndex(0);
                    }}
                  />
                )}
              </>
            )}
            {active === 1 &&
              photos?.logos?.length > 0 &&
              photos.logos.map((photo, index) => (
                <img
                  key={uuidv4()}
                  src={`${img500}${photo.file_path}`}
                  loading="lazy"
                  alt={photo.title}
                  className="gallery-image cursor-pointer p-4 bg-gray-200"
                  onClick={() => {
                    setIsOpen(true);
                    setPhotoIndex(index);
                  }}
                />
              ))}

            {active === 2 && (photos?.posters?.length > 0 || poster_path) && (
              <>
                {photos.posters.length > 0 ? (
                  photos.posters.map((photo, index) => (
                    <img
                      key={uuidv4()}
                      src={`${img500}${photo.file_path}`}
                      alt={photo.title}
                      loading="lazy"
                      className="gallery-image cursor-pointer"
                      onClick={() => {
                        setIsOpen(true);
                        setPhotoIndex(index);
                      }}
                    />
                  ))
                ) : (
                  <img
                    src={`${img500}${poster_path}`}
                    alt={title}
                    loading="lazy"
                    className="gallery-image cursor-pointer"
                    onClick={() => {
                      setIsOpen(true);
                      setPhotoIndex(0);
                    }}
                  />
                )}
              </>
            )}
          </div>
        </>
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
    </section>
  );
};

const Tab = styled.div`
  width: 20%;
  padding: 10px 5px;
  border: ${(props) =>
    props.active ? '2px solid rgb(96, 165, 250)' : '2px solid transparent'};
  opacity: ${(props) => (props.active ? '1' : '.8')};
  background-color: ${(props) =>
    props.active ? 'white' : 'rgb(195, 221, 253)'};
  transition: background-color 0.5s ease-in-out;
`;

export default Gallery;
