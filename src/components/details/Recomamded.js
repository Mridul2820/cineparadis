import React from 'react';
import { ContentList } from '../../GlobalStyles';
import SingleContent from '../singles/SingleContent';

const Recommended = ({ recommended }) => {
  return (
    <section>
      <h2 className="text-center font-bold text-2xl mt-3">More Like This</h2>

      <ContentList>
        {recommended.slice(0, 9).map((recom) => (
          <SingleContent
            key={recom.id}
            id={recom.id}
            poster={recom.backdrop_path}
            title={recom.title || recom.name}
            date={recom.release_date || recom.first_air_date}
            media_type={recom.media_type}
            vote_average={recom.vote_average}
            description={recom.overview}
          />
        ))}
      </ContentList>
    </section>
  );
};

export default Recommended;
