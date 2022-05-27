import React from 'react';
import styled from 'styled-components';

const Trailers = ({ videos, title }) => {
  return (
    <section className="px-3">
      <h2 className="text-center font-bold text-2xl mt-2">Videos of {title}</h2>
      {videos &&
        videos.map((video) => (
          <div
            className="flex flex-col items-center justify-center mb-2"
            key={video.id}
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
        ))}
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
