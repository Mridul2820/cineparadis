import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Paginate from '../widget/Paginate';

import { PageTitle, Container } from '../../styles/Styles';
import { API_URL } from '../../constants/constant';

import ContentGrid from '../widget/ContentGrid';
import MovieOptions from '../options/MovieOptions';

const PageContent = ({ title, media_type, uri }) => {
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

  useEffect(() => {
    document.title = 'Top Rated - CineParadis';
  }, []);

  return (
    <Container>
      <MovieOptions />
      <PageTitle className="mt-4">{title}</PageTitle>
      <ContentGrid items={items} media_type={media_type} />
      {items.length > 0 && <Paginate setPage={setPage} />}
    </Container>
  );
};

export default PageContent;
