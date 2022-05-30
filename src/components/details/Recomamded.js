import React from 'react';
import ContentGrid from '../widget/ContentGrid';

const Recommended = ({ recommended }) => {
  return (
    <section className="tab-section">
      <h2 className="detail-tab-title">More Like This</h2>
      {recommended.length > 0 ? (
        <ContentGrid items={recommended} samepage />
      ) : (
        <p className="text-center text-slate-500 mt-3">
          Oops, no recommendations found
        </p>
      )}
    </section>
  );
};

export default Recommended;
