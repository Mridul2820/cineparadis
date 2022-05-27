import React, { useState } from 'react';
import styled from 'styled-components';
import { img500 } from '../../helpers/config';

const Gallery = ({ title, photos }) => {
  // Tabs
  const [active, setActive] = useState(0);

  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };

  return (
    <section>
      <h2 className="text-center font-bold text-2xl my-4">
        Gallery of {title}
      </h2>
      {photos.posters.length > 0 &&
      photos.logos.length > 0 &&
      photos.backdrops.length > 0 ? (
        <>
          <div className="mb-8 flex justify-center gap-3 md:px-2">
            {photos.backdrops && photos.backdrops.length > 0 && (
              <Tab
                className="tab-item"
                onClick={handleClick}
                active={active === 0}
                id={0}
              >
                Images
              </Tab>
            )}
            {photos.logos && photos.logos.length > 0 && (
              <Tab
                className="tab-item"
                onClick={handleClick}
                active={active === 1}
                id={1}
              >
                Logos
              </Tab>
            )}
            {photos.posters && photos.posters.length > 0 && (
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
              photos.backdrops &&
              photos.backdrops.length > 0 &&
              photos.backdrops.map((photo, index) => (
                <img
                  key={index}
                  src={`${img500}/${photo.file_path}`}
                  alt={photo.title}
                  loading="lazy"
                  className="w-72 xs:w-[320px] lg:w-[350px] shadow-bs3 rounded-sm"
                />
              ))}

            {active === 1 &&
              photos.logos &&
              photos.logos.length > 0 &&
              photos.logos.map((photo, index) => (
                <img
                  key={index}
                  src={`${img500}/${photo.file_path}`}
                  loading="lazy"
                  alt={photo.title}
                  className="w-72 xs:w-[320px] lg:w-[350px] shadow-bs3 rounded-sm p-4"
                />
              ))}
            {active === 2 &&
              photos.posters &&
              photos.posters.length > 0 &&
              photos.posters.map((photo, index) => (
                <img
                  key={index}
                  src={`${img500}/${photo.file_path}`}
                  alt={photo.title}
                  loading="lazy"
                  className="w-72 xs:w-[320px] lg:w-[350px] shadow-bs3 rounded-sm"
                />
              ))}
          </div>
        </>
      ) : (
        <p className="text-center">No Photo Found</p>
      )}
    </section>
  );
};

const Tab = styled.div`
  padding: 10px 5px;
  border: ${(props) => (props.active ? '1px solid #ccc' : '')};
  background-color: ${(props) => (props.active ? 'white' : 'lightgray')};
  transition: background-color 0.5s ease-in-out;
`;

export default Gallery;
