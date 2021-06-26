import React from 'react'
import { Link } from 'react-router-dom';
import SingleItem from './SingleItem';

const SingleContent = ({ id, poster, title, date, media_type, vote_average, description }) => {

    return (
        <Link to={`/${media_type}/${id}`}>
            <SingleItem
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

export default SingleContent
