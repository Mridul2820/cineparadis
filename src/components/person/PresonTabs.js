import React from 'react';
import PersonGallery from './PersonGallery';
import PersonMovies from './PersonMovies';

const PresonTabs = ({ creditData }) => {
  return (
    <div className="w-full">
      <PersonMovies credits={creditData.combined_credits} />
      <PersonGallery images={creditData.images} />
    </div>
  );
};

export default PresonTabs;
