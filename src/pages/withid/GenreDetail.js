import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DocumentMeta from 'react-document-meta';
import { useParams } from 'react-router-dom';

import { API_URL, BASE_URL } from '../../constants/constant';

import { PageTitle, Container } from '../../styles/Styles';
import ContentGrid from '../../components/widget/ContentGrid';
import Paginate from '../../components/widget/Paginate';

const GenreDetail = () => {
  const { gid } = useParams();
  const { name } = useParams();
  const { type } = useParams();

  const genresURL = `${API_URL}/discover/${type}?`;
  const apiKey = `api_key=${process.env.REACT_APP_TMDB}`;

  const [contentGens, setContentGens] = useState();
  const [page, setPage] = useState(1);

  const fetchDataGen = async () => {
    const { data } = await axios.get(
      `${genresURL}${apiKey}&with_genres=${gid}&page=${page}`
    );

    setContentGens(data.results);
  };

  useEffect(() => {
    fetchDataGen();
    // eslint-disable-next-line
  }, [page]);

  const getType = type === 'movie' ? 'Movies' : 'TV Series';
  const getSlug = `/genre/${type}/${name}/${gid}`;

  const meta = {
    title: `Discover ${getType}s in ${name} Genre - CineParadis`,
    description: `Discover ${getType}s in ${name} Genre - CineParadis`,
    canonical: `${BASE_URL}${getSlug}`,
    meta: {
      property: {
        'og:title': `Discover ${getType}s in ${name} Genre - CineParadis`,
        'og:description': `Discover ${getType}s in ${name} Genre - CineParadis`,
        'og:url': `${BASE_URL}${getSlug}`,
      },
    },
  };

  return (
    <DocumentMeta {...meta} extend>
      <Container>
        <PageTitle>
          Discover {getType} in {name}
        </PageTitle>

        <ContentGrid items={contentGens} media_type={type} />
        {contentGens?.length > 0 && <Paginate setPage={setPage} />}
      </Container>
    </DocumentMeta>
  );
};

export default GenreDetail;
