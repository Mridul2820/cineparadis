import React, { useState, useEffect } from 'react'
import axios from 'axios'

import SingleContent from '../../components/singles/SingleContent'
import CustomPagination from '../../components/CustomPagination'
import GenresChip from '../../components/GenresChip'
import useGenre from '../../hooks/useGenre'

import { PageTitle, Container, ContentList } from '../../GlobalStyles'
import { baseUrl } from '../../../constant'

const seriesURL = `${baseUrl}/discover/tv?`
const apiKey = `api_key=${process.env.REACT_APP_TMDB}`

const Series = () => {

    const [page, setPage] = useState(1)
    const [series, setSeries] = useState([])
    const [numOfPages, setNumOfPages] = useState()

    const [genres, setGenres] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([])

    const genreForURL = useGenre(selectedGenres)

    const fetchMovies = async () => {
        const {data} = await axios.get(`${seriesURL}${apiKey}&page=${page}&with_genres=${genreForURL}`)

        // console.log(data)

        setSeries(data.results)
        setNumOfPages(data.total_pages)
    }

    useEffect(() => {
        fetchMovies()
        // eslint-disable-next-line
    }, [page, genreForURL])

    useEffect(() => {
        document.title = 'TV Series - CineParadis'
    }, [])

    return (
        <Container>
            <PageTitle>TV Series</PageTitle>
            <GenresChip 
                type="tv"
                genres={genres} 
                setGenres={setGenres}
                selectedGenres={selectedGenres} 
                setSelectedGenres={setSelectedGenres}
                setPage={setPage}
            />
            <ContentList>
                {series && series.map(tv => (
                    <SingleContent 
                        key={tv.id} 
                        id={tv.id} 
                        poster={tv.backdrop_path} 
                        title={tv.title || tv.name} 
                        date={tv.release_date || tv.first_air_date} 
                        media_type="tv"
                        vote_average={tv.vote_average}
                        description={tv.overview}
                        showWatch={true}
                    />
                ))}
            </ContentList>
            {numOfPages > 1 && 
                <CustomPagination 
                setPage={setPage} 
                numOfPages={numOfPages} 
            />}
        </Container>
    )
}

export default Series
