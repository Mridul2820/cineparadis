import React from 'react'
import styled from 'styled-components';
import { img300, unavailable } from "../helpers/config";
import Badge from '@material-ui/core/Badge';
import { BiListPlus } from 'react-icons/bi'

const SingleContent = ({ id, poster, title, date, media_type, vote_average, description }) => {

    const voteColor = (voteAvg) => {
        if(voteAvg > 7){
            return "primary"
        }
        else if(voteAvg < 7 && voteAvg > 4){
            return "secondary"
        }
        else {
            return "error"
        }
    }

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string
    }

    return (
        <Content id={id} media_type={media_type} >
            <Badge 
                badgeContent={vote_average}
                color={voteColor(vote_average)}>
            </Badge>
            <img 
                src={ poster ? `${img300}${poster}` : unavailable} 
                alt={title} 
                className="poster"
            />

            <Details>
                <b className="title">{truncate(title, 40)}</b>
                <span>
                    {media_type === "movie" ? "Movie" : "TV Series"}
                </span>
                <span>{date}</span>

                <Expand>
                    <p>{truncate(description, 50)}</p>

                    <Watch>
                        <BiListPlus size="16px" /> 
                        Add to watchlist
                    </Watch>
                </Expand>
            </Details>
        </Content>
    )
}

const Expand = styled.div`
    visibility: hidden;
    margin-top: 5px;

    p {
        font-size: 10px;
    }
`

const Content = styled.div`
    width: 300px;
    margin: 20px;
    transition: all.5s;
    position: relative;
    border-radius: 5px;

    &:hover {
        transform: scale(1.25);
        z-index: 50;
        box-shadow: 3px 6px 10px rgba(0, 0, 0, .5);

        ${Expand} {
            visibility: visible;
        }
    }

    img {
        border-radius: 5px;
        object-fit: cover;
        vertical-align: bottom;
    }
`

const Details = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    color: #fff;
    padding-left: 15px;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-image: linear-gradient(to right, #000, transparent);

    b {
        font-size: 17px;
        padding: 5px 0;
    }

    span {
        font-size: 14px;
    }
`

const Watch = styled.p`
    margin-top: 5px;
    font-size: 18px;
    display: flex;
    align-items: center;
`



export default SingleContent
