import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DocumentMeta from 'react-document-meta';

import Paginate from '../widget/Paginate';

import { PageTitle, Container } from '../../styles/Styles';
import { API_URL, BASE_URL } from '../../constants/constant';

import ContentGrid from '../widget/ContentGrid';
import MovieOptions from '../options/MovieOptions';
import SeriesOptions from '../options/SeriesOptions';

const PageContent = ({
  title,
  media_type,
  uri,
  seoTitle,
  seoDescription,
  route,
}) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  const trendURL = `${API_URL}/${media_type}/${uri}?`;
  const apiKey = `api_key=${process.env.REACT_APP_TMDB}`;

  const fetchData = async () => {
    const { data } = await axios.get(`${trendURL}${apiKey}&page=${page}`);
    setItems(data.results);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [page]);

  const meta = {
    title: seoTitle,
    description: seoDescription,
    canonical: `${BASE_URL}${route}`,
    meta: {
      property: {
        'og:title': seoTitle,
        'og:description': seoDescription,
        'og:url': `${BASE_URL}${route}`,
      },
    },
  };

  return (
    <DocumentMeta {...meta} extend>
      <Container>
        {media_type === 'movie' && <MovieOptions />}
        {media_type === 'tv' && <SeriesOptions />}
        <PageTitle className="mt-4">{title}</PageTitle>
        <ContentGrid items={items} media_type={media_type} />
        {items.length > 0 && <Paginate setPage={setPage} />}
      </Container>
    </DocumentMeta>
  );
};

export default PageContent;
