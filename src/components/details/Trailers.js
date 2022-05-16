import React from 'react';
import styled from 'styled-components';

const Trailers = ({ videos }) => {
  return (
    <Wrap>
      {videos &&
        videos.map((video) => (
          <TrailerWrap key={video.id}>
            <br />
            <TrailerTitle>{video.name}</TrailerTitle>
            <Iframe
              className="trailer-video"
              src={`https://www.youtube.com/embed/${video.key}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></Iframe>
          </TrailerWrap>
        ))}
    </Wrap>
  );
};

const Wrap = styled.div`
  @media only screen and (max-width: 480px) {
    padding: 0 10px;
  }
`;

const TrailerWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TrailerTitle = styled.h3`
  padding: 5px 0;
  color: #000;
`;

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
