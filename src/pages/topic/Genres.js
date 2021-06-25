import { useState, useEffect } from 'react'
import axios from 'axios'

import { PageTitle, Container } from '../../GlobalStyles'
import styled from 'styled-components'

const genresURL = 'https://api.themoviedb.org/3/genre/'
const apiKey = `api_key=${process.env.REACT_APP_TMDB}`

const Genres = () => {

    const [genres, setGenres] = useState([])

    const fetchGenres = async () => {
        const { data } = await axios.get(`${genresURL}movie/list?${apiKey}&language=en-US`)

        setGenres(data.genres)

        console.log('genres', data)
    }

    useEffect(() => {
        document.title = 'Genre - MovieBuff'

        fetchGenres()
    }, [])

    return (
        <Container>
            <PageTitle>genres</PageTitle>
            <GenreList>
            {genres && genres.map(genre => (
                <GenreItem key={genre.id}>
                    <img src="" alt="" />

                    <h3>{genre.name}</h3>
                </GenreItem>
            ))}
            </GenreList>
        </Container>
    )
}

const GenreList = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const GenreItem = styled.div`
    margin: 10px 20px;
    width: 150px;
    height: 150px;
`

export default Genres
