import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DocumentMeta from 'react-document-meta';
import { useParams } from 'react-router-dom';

import {
  API_URL,
  BASE_URL,
  ogDefault,
  ogImage,
  twitterData,
} from '../../constants/constant';

import MovieSeries from '../../components/cards/MovieSeries';

import { PageTitle, Container, ContentList } from '../../styles/Styles';

const GenreDetail = () => {
  const { gid } = useParams();
  const { name } = useParams();
  const { type } = useParams();

  const genresURL = `${API_URL}/discover/${type}?`;
  const apiKey = `api_key=${process.env.REACT_APP_TMDB}`;

  const [contentGens, setContentGens] = useState();

  const fetchDataGen = async () => {
    const { data } = await axios.get(
      `${genresURL}${apiKey}&with_genres=${gid}`
    );
    setContentGens(data.results);
  };

  useEffect(() => {
    fetchDataGen();
    // eslint-disable-next-line
  }, []);

  const getType = type === 'movie' ? 'Movies' : 'TV Series';
  const getSlug = `/genre/${type}/${name}/${gid}`;

  const meta = {
    title: `Discover ${getType}s in ${name} Genre - CineParadis`,
    description: `Discover ${getType}s in ${name} Genre - CineParadis`,
    canonical: `${BASE_URL}/${getSlug}`,
    meta: {
      name: {
        ...twitterData,
      },
      property: {
        ...ogDefault,
        'og:image': ogImage,
        'og:title': `Discover ${getType}s in ${name} Genre - CineParadis`,
        'og:description': `Discover ${getType}s in ${name} Genre - CineParadis`,
        'og:url': `${BASE_URL}/${getSlug}`,
      },
    },
  };

  return (
    <Container>
      <DocumentMeta {...meta} />

      <PageTitle>
        Discover {getType} in {name}
      </PageTitle>
      <ContentList>
        {contentGens &&
          contentGens.map((content) => (
            <MovieSeries
              key={content.id}
              id={content.id}
              poster={content.backdrop_path}
              title={content.title || content.name}
              date={content.release_date || content.first_air_date}
              media_type="movie"
              vote_average={content.vote_average}
              description={content.overview}
              showWatch={true}
            />
          ))}
      </ContentList>
    </Container>
  );
};

export default GenreDetail;
