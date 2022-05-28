import React from 'react';
import { ContentList } from '../../styles/Styles';
import MovieSeries from '../cards/MovieSeries';

const Recommended = ({ recommended }) => {
  return (
    <section className="tab-section">
      <h2 className="detail-tab-title">More Like This</h2>
      {recommended.length > 0 ? (
        <ContentList>
          {recommended.slice(0, 12).map((recom) => (
            <MovieSeries
              key={recom.id}
              id={recom.id}
              poster={recom.backdrop_path}
              title={recom.title || recom.name}
              date={recom.release_date || recom.first_air_date}
              media_type={recom.media_type}
              vote_average={recom.vote_average}
              description={recom.overview}
              recommended
            />
          ))}
        </ContentList>
      ) : (
        <p className="text-center text-slate-500 mt-3">
          Oops, no recommendations found
        </p>
      )}
    </section>
  );
};

export default Recommended;
