import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import MainInfo from '../../components/details/MainInfo'
import CastnCrew from '../../components/details/CastnCrew'
import Trailers from '../../components/details/Trailers'
import FactBox from '../../components/details/FactBox'
import Recommended from '../../components/details/Recomamded'

// import { AiFillYoutube, AiFillHeart } from 'react-icons/ai'
// import { BsFillPeopleFill } from 'react-icons/bs'
// import { SiCodefactor } from 'react-icons/si'

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
            <TopTabs >

            </TopTabs>
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

const Container = styled.div`
    padding: 20px 40px;
    margin: 0 auto;

    @media only screen and (max-width: 480px){
        padding: 10px 0;
    }
`

const DetailInfo = styled.div`
    display: flex;
    margin-top: 20px;

    @media only screen and (max-width: 768px){
        display: none;
    }
`
const TopTabs = styled.div`
    display: none;

    @media only screen and (max-width: 768px){
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

`
const DetailLeft = styled.div``
const DetailRight = styled.div``

export default DetailsPage
