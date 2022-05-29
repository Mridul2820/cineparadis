import React from 'react';
import { ContentList } from '../../styles/Styles';
import MovieSeries from '../cards/MovieSeries';

const ContentGrid = ({ items, media_type }) => {
  return (
    <ContentList>
      {items &&
        items.map((item) => (
          <MovieSeries
            key={item.id}
            id={item.id}
            poster={item.backdrop_path}
            title={item.title || item.name}
            date={item.release_date || item.first_air_date}
            media_type={media_type}
            vote_average={item.vote_average}
            description={item.overview}
            showWatch={true}
          />
        ))}
    </ContentList>
  );
};

export default ContentGrid;
