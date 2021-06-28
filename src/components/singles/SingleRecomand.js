import React from 'react'
import styled from 'styled-components';
import SingleItem from './SingleItem';

const SingleRecomand = ({ 
    id, 
    poster, 
    title, 
    date, 
    media_type, 
    vote_average, 
    description 
}) => {

    return (
        <Link href={`/${media_type}/${id}`}>
            <SingleItem
                id={id}
                poster={poster}
                title={title} 
                date={date} 
                vote_average={vote_average} 
                description={description}
                media_type={media_type}
            />
        </Link>
    )
}

const Link = styled.a`
    > div {
        margin: 0 0 20px 0;

        &:hover {
            transform: scale(1);
            box-shadow: 3px 6px 10px rgba(0, 0, 0, .5);
        }
    }
`


export default SingleRecomand
