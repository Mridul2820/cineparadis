import React from 'react'
import styled from 'styled-components'

const Trailers = ({ videos }) => {
    return (
        <>
        {videos && videos.map(video => (
            <TrailerWrap key={video.id}>
                <br/>
                <TrailerTitle>{video.name}</TrailerTitle>
                <Iframe 
                    className="trailer-video"
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                >
                </Iframe>
            </TrailerWrap>
        ))}
        </>
    )
}

const TrailerWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const TrailerTitle = styled.h3`
    padding: 5px 0;
    color: #000 ;
`

const Iframe = styled.iframe`
    width: 530px;
    height: 315px;

    @media only screen and (max-width: 62em){
        height: 250px;
    }

    @media only screen and (max-width: 50em){
        width: 100%;
    }
`

export default Trailers