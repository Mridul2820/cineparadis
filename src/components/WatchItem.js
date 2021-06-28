import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SingleContent from './singles/SingleContent'

const movieURL = 'https://api.themoviedb.org/3/'
const apiKey = `api_key=${process.env.REACT_APP_TMDB}`

const WatchItem = ({ id, type }) => {
    const [content, setContent] = useState()

    const fetchData = async () => {
        const { data } = await axios.get(
            `${movieURL}${type}/${id}?${apiKey}&language=en`
        );

        setContent(data)
    };

    useEffect(() => {
        fetchData();

        // eslint-disable-next-line
    }, []);

    return (
        <div>
            {content && 
                <SingleContent
                    key={id} 
                    id={id} 
                    media_type={type}
                    poster={content.backdrop_path} 
                    title={content.title || content.name} 
                    date={content.release_date || content.first_air_date} 
                    vote_average={content.vote_average}
                    description={content.overview}
                />
            }
        </div>
    )
}

export default WatchItem
