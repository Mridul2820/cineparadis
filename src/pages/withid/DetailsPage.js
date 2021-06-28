import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '../../GlobalStyles'
import styled from 'styled-components'

import MainInfo from '../../components/details/MainInfo'
import CastnCrew from '../../components/details/CastnCrew'
import Trailers from '../../components/details/Trailers'
import FactBox from '../../components/details/FactBox'
import Recommended from '../../components/details/Recomamded'

const detailURL = 'https://api.themoviedb.org/3/'
const apiKey = `api_key=${process.env.REACT_APP_TMDB}`

const DetailsPage = () => {
    const { type } = useParams()
    const { id } = useParams()

    const [content, setContent] = useState()
    const [videos, setVideos] = useState()
    const [recommended, setRecommended] = useState()
    const [credits, setCredits] = useState()

    const fetchData = async () => {
        const { data } = await axios.get(
            `${detailURL}${type}/${id}?${apiKey}&language=en&append_to_response=external_ids%2Cvideos%2Crecommendations%2Ccredits`
        );

        console.log('detaildata', data);
    
        setContent(data);
        setVideos(data.videos.results);
        setRecommended(data.recommendations.results);
        setCredits(data.credits.cast)
    };

    useEffect(() => {
        fetchData();

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        document.title = content ? `${content.name || content.title} - CineParadis` : 'CineParadis'
    }, [content]);

    return (
        <Container>
            <MainInfo content={content} />
            <DetailInfo>
                <DetailLeft>
                    <CastnCrew 
                        credits={credits}
                        title={content?.name || content?.title} 
                    />
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

                    {recommended?.length > 0 && <Recommended recommended={recommended} />}
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
