import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DocumentMeta from 'react-document-meta';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import BannerInfo from '../../components/details/BannerInfo';
import CastMovie from '../../components/details/CastMovie';
import CastTV from '../../components/details/CastTV';
import Trailers from '../../components/details/Trailers';
import FactBox from '../../components/details/FactBox';
import Recommended from '../../components/details/Recomamded';
import Gallery from '../../components/details/Gallery';

import { API_URL, BASE_URL } from '../../constants/constant';
import { img500 } from '../../config/imgConfig';

import { Container } from '../../styles/Styles';
import LoaderCustom from '../../components/loaders/LoaderCustom';

const detailURL = `${API_URL}/`;
const apiKey = `api_key=${process.env.REACT_APP_TMDB}`;

const DetailsPage = () => {
  const { type } = useParams();
  const { id } = useParams();

  const [content, setContent] = useState();
  const [videos, setVideos] = useState();
  const [photos, setPhotos] = useState();
  const [recommended, setRecommended] = useState();
  const [credits, setCredits] = useState();
  const [creditsAll, setCreditsAll] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `${detailURL}${type}/${id}?${apiKey}&language=en&append_to_response=external_ids,videos,images,recommendations,aggregate_credits,credits,collection,keywords`
    );

    setContent(data);
    setVideos(data.videos.results);
    setPhotos(data.images);
    setRecommended(data.recommendations.results);
    setCredits(data.credits?.cast);
    setCreditsAll(data.aggregate_credits?.cast);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const getSlug = `${type}/${id}`;
  const getBackdrop = content?.backdrop_path
    ? `${img500}${content.backdrop_path}`
    : '';

  const meta = {
    title: `Discover all detils of ${
      content?.name || content?.title
    } - CineParadis`,
    description: `Get Cast, Crew, Facts, Trivia Info, Photos, Posters, Trailars, Recomandation, Season and Collection info of ${
      content?.name || content?.title
    } - CineParadis`,
    canonical: `${BASE_URL}${getSlug}`,
    meta: {
      property: {
        'og:image': getBackdrop,
        'og:title': `Discover all detils of ${
          content?.name || content?.title
        } - CineParadis`,
        'og:description': `Get Cast, Crew, Facts, Trivia Info, Photos, Posters, Trailars, Recomandation, Season and Collection info of ${
          content?.name || content?.title
        } - CineParadis`,
        'og:url': `${BASE_URL}/${getSlug}`,
      },
    },
  };

  // Tabs
  const [active, setActive] = useState(0);

  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };

  if (loading) {
    return <LoaderCustom />;
  }

  return (
    <DocumentMeta {...meta} extend>
      {content && (
        <BannerInfo content={content} type={type} runtime={content.runtime} />
      )}
      <Container>
        <div className="flex flex-col justify-center mt-2">
          <div className="mb-3 sm:mb-4 flex justify-center gap-3 px-2 md:px-4">
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
              Details
            </Tab>
            <Tab
              className="tab-item"
              onClick={handleClick}
              active={active === 2}
              id={2}
            >
              Photos
            </Tab>

            <Tab
              className="tab-item"
              onClick={handleClick}
              active={active === 3}
              id={3}
            >
              Videos
            </Tab>
            <Tab
              className="tab-item"
              onClick={handleClick}
              active={active === 4}
              id={4}
            >
              More Like This
            </Tab>
          </div>
          <>
            {active === 0 && content && (
              <>
                {type === 'movie' && (
                  <CastMovie
                    credits={credits}
                    title={content?.name || content?.title}
                  />
                )}
                {type === 'tv' && (
                  <CastTV
                    credits={creditsAll}
                    title={content?.name || content?.title}
                  />
                )}
              </>
            )}
            {active === 1 && content && (
              <FactBox content={content} type={type} />
            )}
            {active === 2 && content && (
              <Gallery
                photos={photos}
                title={content?.name || content?.title}
                backdrop_path={content.backdrop_path}
                poster_path={content.poster_path}
              />
            )}
            {active === 3 && content && (
              <Trailers
                videos={videos}
                title={content?.name || content?.title}
              />
            )}
            {active === 4 && content && (
              <Recommended recommended={recommended} />
            )}
          </>
        </div>
      </Container>
    </DocumentMeta>
  );
};

const Tab = styled.div`
  width: 20%;
  padding: 10px 5px;
  border: ${(props) =>
    props.active ? '2px solid rgb(96, 165, 250)' : '2px solid transparent'};
  opacity: ${(props) => (props.active ? '1' : '.8')};
  background-color: ${(props) =>
    props.active ? 'white' : 'rgb(195, 221, 253)'};
  transition: background-color 0.5s ease-in-out;
`;

export default DetailsPage;
