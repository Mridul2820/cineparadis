import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const Trailers = ({ videos, title }) => {
  return (
    <section className="tab-section">
      <h2 className="detail-tab-title">Videos of {title}</h2>

      {videos.length ? (
        videos.map((video) => (
          <div
            className="flex flex-col items-center justify-center mb-2"
            key={uuidv4()}
          >
            <br />
            <p className="text-center text-slate-800 text-base md:text-normal font-semibold mb-3">
              {video.name}
            </p>
            <Iframe
              className="trailer-video"
              src={`https://www.youtube.com/embed/${video.key}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ))
      ) : (
        <p className="text-center text-slate-500 mt-3">No Video Found</p>
      )}
    </section>
  );
};

const Iframe = styled.iframe`
  width: 530px;
  height: 315px;

  @media only screen and (max-width: 956px) {
    width: 100%;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 250px;
  }

  @media only screen and (max-width: 480px) {
    width: 100%;
    height: 200px;
  }
`;

export default Trailers;
