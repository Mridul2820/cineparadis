import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DocumentMeta from 'react-document-meta';

import Paginate from '../../components/widget/Paginate';
import GenresChip from '../../components/widget/GenresChip';
import useGenre from '../../hooks/useGenre';

import ContentGrid from '../../components/widget/ContentGrid';

import { PageTitle, Container } from '../../styles/Styles';
import { API_URL, BASE_URL } from '../../constants/constant';
import { Series_Discover } from '../../constants/routes';
import SeriesOptions from '../../components/options/SeriesOptions';

const seriesURL = `${API_URL}/discover/tv?`;
const apiKey = `api_key=${process.env.REACT_APP_TMDB}`;

const DiscoverSeries = () => {
  const [page, setPage] = useState(1);
  const [series, setSeries] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genreForURL = useGenre(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `${seriesURL}${apiKey}&page=${page}&with_genres=${genreForURL}`
    );

    setSeries(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [page, genreForURL]);

  const meta = {
    title: 'Discover TV shows by different types of data like - CineParadis',
    description:
      'Discover TV shows by different types of data like average rating, number of votes and genres',
    canonical: `${BASE_URL}${Series_Discover}`,
    meta: {
      property: {
        'og:title':
          'Discover TV shows by different types of data - CineParadis',
        'og:description':
          'Discover TV shows by different types of data like average rating, number of votes and genres',
        'og:url': `${BASE_URL}${Series_Discover}`,
      },
    },
  };

  return (
    <DocumentMeta {...meta} extend>
      <Container>
        <SeriesOptions />
        <PageTitle className="mt-4">Discover TV Series</PageTitle>

        <GenresChip
          type="tv"
          genres={genres}
          setGenres={setGenres}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          setPage={setPage}
        />

        <ContentGrid items={series} media_type="tv" />

        {numOfPages > 1 && series.length > 0 && (
          <Paginate setPage={setPage} numOfPages={numOfPages} />
        )}
      </Container>
    </DocumentMeta>
  );
};

export default DiscoverSeries;
