import { useState, useEffect } from 'react'
import axios from 'axios'

import { PageTitle } from '../../GlobalStyles'
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
            <p>Get Movies and Series by genres</p>
            <GenreList>
            {genres && genres.map(genre => (
                <GenreItem key={genre.id}>
                    <h3>{genre.name}</h3>
                </GenreItem>
            ))}
            </GenreList>
        </Container>
    )
}

export const Container = styled.div`
    padding: 20px 40px;
    margin: 0 auto;

    p {
        text-align: center;
        margin-bottom: 10px;
    }
`

const GenreList = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const GenreItem = styled.div`
    margin: 10px 15px;
    padding: 0 10px;
    width: 150px;
    height: 50px;
    background-image: radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%);
    border-radius: 10px;
    box-shadow: 3px 6px 10px rgba(0,0,0,.2);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    cursor: pointer;
    transition: all .5s;

    &:hover {
        box-shadow: 3px 6px 10px rgba(0,0,0,.4);
    }
`

export default Genres
