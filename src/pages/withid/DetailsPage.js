import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '../../GlobalStyles'
import styled from 'styled-components'

import MainInfo from '../../components/details/MainInfo'
import CastnCrew from '../../components/details/CastnCrew'
import Trailers from '../../components/details/Trailers'
import FactBox from '../../components/details/FactBox'

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
            <MainInfo content={content}  />
            <DetailInfo>
                <DetailLeft>
                    <CastnCrew id={id} type={type} title={content?.name} />
                    <Trailers videos={videos} />
                </DetailLeft>
                <DetailRight>
                    {content && 
                        <FactBox 
                            status={content.status}
                            release={content.release_date}
                            lang={content.original_language}
                            budget={content.budget}
                            revenue={content.revenue}
                            runtime={content.runtime}
                            networks={content.networks}
                        />
                    }
                </DetailRight>
            </DetailInfo>
        </Container>
    )
}

const DetailInfo = styled.div`
    display: flex;
    margin-top: 20px;

`
const DetailLeft = styled.div``
const DetailRight = styled.div``

export default DetailsPage
