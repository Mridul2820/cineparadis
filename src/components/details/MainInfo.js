import React from 'react'
import styled from 'styled-components'
import { img300, img500, unavailable } from "../../helpers/config";
import { Chip } from '@material-ui/core'

import { GrFacebook, GrInstagram, GrTwitter } from 'react-icons/gr'

const MainInfo = ({ content }) => {
    return (
        <>
        {content && 
        <Wrap 
            style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, rgba(30, 39, 44, 0.9) 0%, rgba(30, 39, 44, 0.8) 100%), url(${img500}${content.backdrop_path})`
            }}>
            <Poster>
                <img 
                    src={ content.poster_path 
                        ? `${img300}${content.poster_path}`
                        : unavailable
                    } 
                    alt={content.title} 
                />
            </Poster>
            <Details>
                <span className="title">
                    {content.name || content.title} (
                        {(
                        content.first_air_date ||
                        content.release_date ||
                        "-----"
                        ).substring(0, 4)}
                    )
                </span>

                <div>
                    {content.tagline && (
                        <i className="tagline">{content.tagline}</i>
                    )}
                </div>

                <div className="chips">
                    {content.genres?.map(genre => (
                        <Chip
                            key={genre.id}
                            className="chip"
                            label={genre.name}
                            color="primary"
                            size="small"
                        />
                    ))}
                </div>

                <p className="description">
                    {content.overview}
                </p>
                
                <Social>
                    {content?.external_ids?.facebook_id && 
                    <a target="_blank" rel="noreferrer" href={`https://www.facebook.com/${content.external_ids.facebook_id}`}>
                        <GrFacebook size="22px" />
                    </a>
                    }

                    {content?.external_ids?.instagram_id && 

                    <a target="_blank" rel="noreferrer" href={`https://www.instagram.com/${content.external_ids.instagram_id}`}>
                        <GrInstagram size="22px"/>
                    </a>
                    }

                    {content?.external_ids?.twitter_id && 
                    <a target="_blank" rel="noreferrer" href={`https://www.twitter.com/${content.external_ids.twitter_id}`}>
                        <GrTwitter size="22px"/>
                    </a>
                    }
                </Social>
            </Details>
        </Wrap>
        }
        </>
    )
}

const Wrap = styled.div`
    background-size: cover;
    background-position: center center;
    display: flex;

    @media only screen and (max-width: 640px){
        flex-direction: column;
    }
`

const Poster = styled.div`
    margin-right: 20px;

    @media only screen and (max-width: 640px){
        margin-right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    img {
        object-fit: cover;
        vertical-align: middle;
    }
`

const Details = styled.div`
    color: #fff;
    padding: 20px 10px;

    .title {
        font-size: 3.5vw;
        text-align: center;
        margin-bottom: 15px;
        color: #fff ;

        @media only screen and (min-width: $bp-medium-1){
            font-size: 3.5vw;
        }
    }

    .description {
        font-size: 17px;

        @media only screen and (min-width: $bp-medium-1){
            font-size: 22px;
        }
    }

    .tagline {
        margin: 10px 0;
    }

    .chip{
        margin: 10px 5px;
    }
`

const Social = styled.div`
    display: flex;
    margin-top: 20px;

    a {
        margin-right: 15px;
    }
`


export default MainInfo
