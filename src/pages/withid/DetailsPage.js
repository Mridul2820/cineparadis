import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '../../GlobalStyles'

import MainInfo from '../../components/details/MainInfo'
import CastnCrew from '../../components/details/CastnCrew'
import Trailers from '../../components/details/Trailers'

const detailURL = 'https://api.themoviedb.org/3/'
const apiKey = `api_key=${process.env.REACT_APP_TMDB}`

const DetailsPage = () => {
    const { type } = useParams()
    const { id } = useParams()

    const [content, setContent] = useState()
    const [videos, setVideos] = useState()

    const fetchData = async () => {
        const { data } = await axios.get(
          `${detailURL}${type}/${id}?${apiKey}&language=en-US`
        );
    
        setContent(data);
        console.log("content", data);
    };

    const fetchVideo = async () => {
        const { data } = await axios.get(
          `${detailURL}${type}/${id}/videos?${apiKey}&language=en-US`
        );

        // console.log(data)
        setVideos(data.results);
    };

    useEffect(() => {
        fetchData();
        fetchVideo();
        // eslint-disable-next-line
    }, []);

    return (
        <Container>
            <MainInfo content={content} />
            <CastnCrew id={id} type={type} />
            <Trailers videos={videos} />
        </Container>
    )
}

export default DetailsPage
