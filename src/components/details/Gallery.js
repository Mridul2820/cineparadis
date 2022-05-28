import React, { useState } from 'react';
import styled from 'styled-components';
import { img500 } from '../../helpers/config';

const Gallery = ({ title, photos, backdrop_path, poster_path }) => {
  // Tabs
  const [active, setActive] = useState(0);

  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };

  return (
    <section className="tab-section">
      <h2 className="detail-tab-title">Gallery of {title}</h2>
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
            {active === 0 &&
              (photos?.backdrops?.length > 0 || backdrop_path) && (
                <>
                  {photos.backdrops.length > 0 ? (
                    photos.backdrops.map((photo, index) => (
                      <img
                        key={index}
                        src={`${img500}/${photo.file_path}`}
                        alt={photo.title}
                        loading="lazy"
                        className="gallery-image"
                      />
                    ))
                  ) : (
                    <img
                      src={`${img500}/${backdrop_path}`}
                      alt={title}
                      loading="lazy"
                      className="gallery-image"
                    />
                  )}
                </>
              )}
            {active === 1 &&
              photos?.logos?.length > 0 &&
              photos.logos.map((photo, index) => (
                <img
                  key={index}
                  src={`${img500}/${photo.file_path}`}
                  loading="lazy"
                  alt={photo.title}
                  className="gallery-image p-4 bg-gray-200"
                />
              ))}

            {active === 2 && (photos?.posters?.length > 0 || poster_path) && (
              <>
                {photos.posters.length > 0 ? (
                  photos.posters.map((photo, index) => (
                    <img
                      key={index}
                      src={`${img500}/${photo.file_path}`}
                      alt={photo.title}
                      loading="lazy"
                      className="gallery-image"
                    />
                  ))
                ) : (
                  <img
                    src={`${img500}/${poster_path}`}
                    alt={title}
                    loading="lazy"
                    className="gallery-image"
                  />
                )}
              </>
            )}
          </div>
        </>
      ) : (
        <p className="text-center text-slate-500 mt-3">No Photo Found</p>
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
