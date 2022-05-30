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

import { PageTitle, Container } from '../../styles/Styles';
import ContentGrid from '../../components/widget/ContentGrid';

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
    canonical: `${BASE_URL}${getSlug}`,
    meta: {
      name: {
        ...twitterData,
      },
      property: {
        ...ogDefault,
        'og:image': ogImage,
        'og:title': `Discover ${getType}s in ${name} Genre - CineParadis`,
        'og:description': `Discover ${getType}s in ${name} Genre - CineParadis`,
        'og:url': `${BASE_URL}${getSlug}`,
      },
    },
  };

  return (
    <Container>
      <DocumentMeta {...meta} />

      <PageTitle>
        Discover {getType} in {name}
      </PageTitle>

      <ContentGrid items={contentGens} media_type={type} />
    </Container>
  );
};

export default GenreDetail;
