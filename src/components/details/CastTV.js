import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { img200, noUserImg } from '../../config/imgConfig';
import SearchWithIcon from '../search/SearchWithIcon';

const CastTV = ({ credits, title }) => {
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filtered = credits.filter((person) => {
    return (
      person?.name?.toLowerCase().includes(search.toLowerCase()) ||
      person?.roles[0]?.character?.toLowerCase().includes(search.toLowerCase())
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
              <Cast title={credit.name}>
                <div>
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
                <div className="flex flex-col justify-center w-[calc(100%-72px)]">
                  <h4 className="text-black font-bold">{credit.name}</h4>
                  {credit.roles && (
                    <div className="text-sm space-x-2">
                      {credit.roles.map((role, index) => (
                        <span key={uuidv4()}>
                          {index > 0 && ', '}
                          <span className="font-medium text-slate-700">
                            {role.character}
                          </span>
                          <span className="text-slate-500">
                            {' (' + role.episode_count + ' episodes)'}
                          </span>
                        </span>
                      ))}
                    </div>
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
  padding: 7px 10px;
  gap: 10px;
  width: 350px;
  min-width: 280px;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
`;

export default CastTV;
