import React from 'react'
import SingleItem from './SingleItem';

const SingleRecomand = ({ id, poster, title, date, media_type, vote_average, description }) => {

    return (
        <a href={`/${media_type}/${id}`}>
            <SingleItem
                poster={poster}
                title={title} 
                date={date} 
                vote_average={vote_average} 
                description={description}
                media_type={media_type}
            />
        </a>
    )
}

export default SingleRecomand
