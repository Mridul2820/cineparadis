import React, { useContext } from 'react'
import styled from 'styled-components';
import { img300, unavailableLandscape } from "../../helpers/config";
import { BiListPlus } from 'react-icons/bi'
import { AiFillStar } from 'react-icons/ai'

import voteColor from '../../helpers/voteColor'
import truncate from '../../helpers/truncate'
import UserContext from '../../context/user';
import { updateProfileWatchlist } from '../../services/firebase';

const SingleRecomand = ({ 
    id, 
    poster, 
    title, 
    date, 
    media_type, 
    vote_average, 
    description 
}) => {
    const { user }  = useContext(UserContext)

    const handleWatchlist = async( id, media_type) => {
        const userId = user.uid

        await updateProfileWatchlist( userId, id, media_type )

        alert('Added to You Watchlist. Go to Your dashboard')
    }

    return (
        <Content>
            <img 
                src={ poster ? `${img300}${poster}` : unavailableLandscape} 
                alt={title} 
                className="poster"
            />

            <Details>
                <a href={`/${media_type}/${id}`}>
                    <b className="title">{truncate(title, 35)}</b>
                    <Rating vote_average={vote_average} voteColor={voteColor}>
                        <AiFillStar/>
                        <p>{Math.round(vote_average * 10) / 10}</p>
                    </Rating>
                    <span>
                        {media_type === "movie" ? "Movie" : "TV Series"} • {new Date(date).getFullYear()}
                    </span>
                </a>
                <Expand>
                    <p>{truncate(description, 50)}</p>
                    <Watch onClick={() => handleWatchlist(id)}>
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
    margin: 20px 0;
    transition: all.5s;
    position: relative;
    border-radius: 5px;
    box-shadow: 3px 6px 10px rgba(0, 0, 0, 0.2);

    &:hover {
        z-index: 50;
        box-shadow: 3px 6px 10px rgba(0, 0, 0, .5);

        ${Expand} {
            visibility: visible;
        }
    }

    img {
        width: 100%;
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
        margin-bottom: 2px;
    }

    span {
        font-size: 13px;
    }
`

const Watch = styled.p`
    margin-top: 5px;
    font-size: 18px;
    display: flex;
    align-items: center;
`

const Rating = styled.div`
    padding: 1px 5px;
    margin: 5px 0;
    font-size: 12px;
    border-radius: 50px;
    width: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ vote_average, voteColor }) => voteColor(vote_average)};

    p {
        margin-left: 5px;
    }
`

export default SingleRecomand
