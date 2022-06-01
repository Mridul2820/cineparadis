import React from 'react';
import ContentGrid from '../widget/ContentGrid';

const PersonMovies = ({ credits }) => {
  return (
    <div>
      <ContentGrid items={credits.cast} nohover showCredit />
    </div>
  );
};

export default PersonMovies;
