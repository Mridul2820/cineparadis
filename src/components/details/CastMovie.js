import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import CastCard from '../cards/CastCard';
import SearchWithIcon from '../search/SearchWithIcon';

const CastMovie = ({ credits, title }) => {
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filtered = credits.filter((person) => {
    return (
      person?.name?.toLowerCase().includes(search.toLowerCase()) ||
      person?.character?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <section className="tab-section">
      <h2 className="detail-tab-title">Cast of {title}</h2>
      <SearchWithIcon
        search={search}
        handleChange={handleChange}
        placeHolder="Search in Cast"
        searchId="cast-search"
      />

      {credits && credits.length > 0 && filtered && filtered.length > 0 ? (
        <div className="flex justify-center items-center flex-wrap mb-6 gap-4">
          {filtered.map((credit) => (
            <CastCard credit={credit} key={uuidv4()} />
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-500 mt-3">No Cast Found</p>
      )}
    </section>
  );
};

export default CastMovie;
