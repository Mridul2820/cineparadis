import React, { useEffect, useState } from "react"
import axios from "axios"

import SingleContent from '../../components/singles/SingleContent'
import CustomPagination from '../../components/CustomPagination'

import { PageTitle, Container, ContentList } from '../../GlobalStyles'
import { baseUrl } from "../../constants/constant"

const trendURL = `${baseUrl}/movie/top_rated?`
const apiKey = `api_key=${process.env.REACT_APP_TMDB}`

const TopRated = () => {
    const [top, setTop] = useState([])
    const [page, setPage] = useState(1)

    const fetchTrending = async () => {
        const {data} = await axios.get(`${trendURL}${apiKey}&page=${page}`)

        // console.log('data', data)
        setTop(data.results)
    }

    useEffect(() => {
        fetchTrending()
        // eslint-disable-next-line
    }, [page])

    useEffect(() => {
        document.title = 'Top Rated - CineParadis'
    }, [])

    return (
        <Container>
            <PageTitle>Top Rated</PageTitle>
            <ContentList>
                {top && top.map(trend => (
                    <SingleContent
                        key={trend.id} 
                        id={trend.id} 
                        poster={trend.backdrop_path} 
                        title={trend.title || trend.name} 
                        date={trend.release_date || trend.first_air_date} 
                        media_type="movie"
                        vote_average={trend.vote_average}
                        description={trend.overview}
                        showWatch={true}
                    />
                ))}
            </ContentList>
            <CustomPagination setPage={setPage} />
        </Container>
    )
}

export default TopRated
