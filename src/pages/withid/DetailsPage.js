import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import MainInfo from '../../components/details/MainInfo'
import CastnCrew from '../../components/details/CastnCrew'
import Trailers from '../../components/details/Trailers'
import FactBox from '../../components/details/FactBox'
import Recommended from '../../components/details/Recomamded'
import { baseUrl } from '../../../constant'

// import { AiFillYoutube, AiFillHeart } from 'react-icons/ai'
// import { BsFillPeopleFill } from 'react-icons/bs'
// import { SiCodefactor } from 'react-icons/si'

const detailURL = `${baseUrl}/`
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

        // console.log('detaildata', data);
    
        setContent(data);
        setVideos(data.videos.results);
        setRecommended(data.recommendations.results);
        setCredits(data.credits.cast)
    };

    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 768;

    useEffect(() => {
        fetchData();
        window.addEventListener("resize", () => setWidth(window.innerWidth));

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        document.title = content ? `${content.name || content.title} - CineParadis` : 'CineParadis'
    }, [content]);

    // Tabs
    const [active, setActive] = useState(0);

    const handleClick = e => {
        const index = parseInt(e.target.id, 0);
        if (index !== active) {
            setActive(index);
        }
    };

    return (
        <Container>
            {content && <MainInfo content={content} type={type}/> }
            {width < breakpoint ?
            <TopTabs >
                <Tabs>
                    <Tab 
                        onClick={handleClick} 
                        active={active === 0} 
                        id={0}
                    >
                        Cast
                    </Tab>

                    <Tab 
                        onClick={handleClick} 
                        active={active === 1} 
                        id={1}
                    >
                        Facts
                    </Tab>
                    <Tab 
                        onClick={handleClick} 
                        active={active === 2} 
                        id={2}
                    >
                        Trailers
                    </Tab>
                    <Tab 
                        onClick={handleClick} 
                        active={active === 3} 
                        id={3}
                    >
                        More
                    </Tab>
                </Tabs>
                <>
                    <Content active={active === 0}>
                        <CastnCrew 
                            credits={credits}
                            title={content?.name || content?.title} 
                        />
                    </Content>
                    <Content active={active === 1}>
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
                    </Content>
                    <Content active={active === 2}>
                        <Trailers videos={videos} />
                    </Content>
                    <Content active={active === 3}>
                        {recommended?.length > 0 && <Recommended recommended={recommended} />}
                    </Content>
                </>
            </TopTabs>
            :
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
            }
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

const Tabs = styled.div`
    overflow: hidden;
    background: #fff;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
`

const Tab = styled.button`
    border: none;
    outline: none;
    cursor: pointer;
    width: 20%;
    position: relative;
    padding: 10px 5px;

    margin-right: 0.1em;
    font-size: 1em;
    border: ${props => (props.active ? "1px solid #ccc" : "")};
    border-bottom: ${props => (props.active ? "none" : "")};
    background-color: ${props => (props.active ? "white" : "lightgray")};
    transition: background-color 0.5s ease-in-out;
`

const Content = styled.div`
    ${props => (props.active ? "" : "display: none")}
`


const DetailLeft = styled.div``
const DetailRight = styled.div``

export default DetailsPage
