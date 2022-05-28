import React from 'react';
import styled from 'styled-components';
import { img200, noPicture } from '../../helpers/config';

const CastnCrew = ({ credits, title }) => {
  return (
    <section>
      <h2 className="text-center font-bold text-2xl mt-2">Cast of {title}</h2>
      {credits && credits.length > 0 ? (
        <div className="flex justify-center items-center flex-wrap my-8 gap-4">
          {credits.map((credit) => (
            <Cast key={credit.id}>
              <img
                src={
                  credit.profile_path
                    ? `${img200}/${credit.profile_path}`
                    : noPicture
                }
                alt={credit?.name}
                className="w-12 p-1"
              />
              <div className="flex flex-col justify-center px-3 py-1">
                <h4 className="text-black font-bold">{credit.name}</h4>
                <p className="text-slate-500">
                  as <span className="font-medium">{credit.character}</span>
                </p>
              </div>
            </Cast>
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
