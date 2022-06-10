import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { img200, noUserImg } from '../../config/imgConfig';
import SearchWithIcon from '../search/SearchWithIcon';

const CastnCrew = ({ credits, title }) => {
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
            <a href={`/person/${credit.id}`} key={uuidv4()}>
              <Cast>
                <div className="p-2">
                  <img
                    src={
                      credit.profile_path
                        ? `${img200}${credit.profile_path}`
                        : noUserImg
                    }
                    alt={credit?.name}
                    className="w-14 h-14 rounded-full object-cover align-top"
                  />
                </div>
                <div className="flex flex-col justify-center px-3 py-1">
                  <h4 className="text-black font-bold">{credit.name}</h4>
                  {credit.character && (
                    <p className="text-slate-500">
                      as <span className="font-medium">{credit.character}</span>
                    </p>
                  )}
                </div>
              </Cast>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-500 mt-3">No Cast Found</p>
      )}
    </section>
  );
};

const Cast = styled.div`
  display: flex;
  align-items: center;
  border-left: 5px solid #f99185;
  padding-left: 2px;
  width: 350px;
  min-width: 280px;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
`;

export default CastnCrew;
