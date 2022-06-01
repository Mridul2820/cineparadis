import React from 'react';
import { ContentList } from '../../styles/Styles';
import MovieSeries from '../cards/MovieSeries';

const ContentGrid = ({
  items,
  media_type,
  samepage,
  nohover,
  showWatch = true,
  showCredit = false,
}) => {
  return (
    <ContentList>
      {items &&
        items.map((item) => (
          <MovieSeries
            key={item.id}
            id={item.id}
            poster={item.poster_path}
            backdrop={item.backdrop_path}
            title={item.title || item.name}
            date={item.release_date || item.first_air_date}
            media_type={item.media_type || media_type}
            vote_average={item.vote_average}
            description={item.overview}
            showWatch={showWatch}
            samepage={samepage}
            nohover={nohover}
            showCredit={showCredit}
            character={item.character}
          />
        ))}
    </ContentList>
  );
};

export default ContentGrid;
