import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SingleContent from '../../components/singles/SingleContent'

import { PageTitle, Container, ContentList } from '../../GlobalStyles'

const genresURL = 'https://api.themoviedb.org/3/discover/movie?'
const apiKey = `api_key=${process.env.REACT_APP_TMDB}`

const GenrePage = () => {
    const { gid } = useParams()
    const { name } = useParams()

    const [contentGens, setContentGens] = useState()

    const fetchDataGen = async () => {
        const { data } = await axios.get(
          `${genresURL}${apiKey}&with_genres=${gid}`
        );
    
        setContentGens(data.results);
        // console.log("content", data.results);
    };

    useEffect(() => {
        fetchDataGen();

        document.title = `${name} - CineParadis`
        // eslint-disable-next-line
    }, []);

    return (
        <Container>
            <PageTitle>{name}</PageTitle>
            <ContentList>
                {contentGens && contentGens.map(content => (
                    <SingleContent
                        key={content.id} 
                        id={content.id} 
                        poster={content.backdrop_path} 
                        title={content.title || content.name} 
                        date={content.release_date || content.first_air_date} 
                        media_type="movie"
                        vote_average={content.vote_average}
                        description={content.overview}
                    />
                ))}
            </ContentList>
        </Container>
    )
}

export default GenrePage
