import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

import MainInfo from '../../components/details/MainInfo';
import CastnCrew from '../../components/details/CastnCrew';
import Trailers from '../../components/details/Trailers';
import FactBox from '../../components/details/FactBox';
import Recommended from '../../components/details/Recomamded';
import { baseUrl } from '../../constants/constant';

// import { AiFillYoutube, AiFillHeart } from 'react-icons/ai'
// import { BsFillPeopleFill } from 'react-icons/bs'
// import { SiCodefactor } from 'react-icons/si'

const detailURL = `${baseUrl}/`;
const apiKey = `api_key=${process.env.REACT_APP_TMDB}`;

const DetailsPage = () => {
  const { type } = useParams();
  const { id } = useParams();

  const [content, setContent] = useState();
  const [videos, setVideos] = useState();
  const [recommended, setRecommended] = useState();
  const [credits, setCredits] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `${detailURL}${type}/${id}?${apiKey}&language=en&append_to_response=external_ids%2Cvideos%2Cimages%2Crecommendations%2Ccredits`
    );

    setContent(data);
    setVideos(data.videos.results);
    setRecommended(data.recommendations.results);
    setCredits(data.credits.cast);
    setLoading(false);
  };

  console.log(content);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.title = content
      ? `${content.name || content.title} - CineParadis`
      : 'CineParadis';
  }, [content]);

  // Tabs
  const [active, setActive] = useState(0);

  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };

  if (loading) {
    return (
      <Container className="flex flex-col justify-center items-center w-full">
        <Loader
          type="Circles"
          color="#00BFFF"
          height={50}
          width={200}
          className="m-5"
        />
      </Container>
    );
  }

  return (
    <Container>
      {content && <MainInfo content={content} type={type} />}
      <div className="flex flex-col justify-center mt-5">
        <div className="mb-8 flex justify-center gap-3 md:px-2">
          <Tab
            className="tab-item"
            onClick={handleClick}
            active={active === 0}
            id={0}
          >
            Top Cast
          </Tab>
          <Tab
            className="tab-item"
            onClick={handleClick}
            active={active === 1}
            id={1}
          >
            Facts
          </Tab>
          <Tab
            className="tab-item"
            onClick={handleClick}
            active={active === 2}
            id={2}
          >
            Videos
          </Tab>
          <Tab
            className="tab-item"
            onClick={handleClick}
            active={active === 3}
            id={3}
          >
            More Like This
          </Tab>
        </div>
        <>
          {active === 0 && content && (
            <CastnCrew
              credits={credits}
              title={content?.name || content?.title}
            />
          )}
          {active === 1 && content && (
            <FactBox
              status={content.status}
              release={content.release_date}
              lang={content.original_language}
              budget={content.budget}
              revenue={content.revenue}
              runtime={content.runtime}
              networks={content.networks}
            />
          )}
          {active === 2 && content && (
            <Trailers videos={videos} title={content?.name || content?.title} />
          )}
          {active === 3 && content && recommended?.length > 0 && (
            <Recommended recommended={recommended} />
          )}
        </>
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding: 0px 40px 20px 40px;
  margin: 0 auto;
  min-height: calc(100vh - 190px);

  @media only screen and (max-width: 480px) {
    padding: 10px 0;
  }
`;

const Tab = styled.div`
  padding: 10px 5px;
  border: ${(props) => (props.active ? '1px solid #ccc' : '')};
  background-color: ${(props) => (props.active ? 'white' : 'lightgray')};
  transition: background-color 0.5s ease-in-out;
`;

export default DetailsPage;
