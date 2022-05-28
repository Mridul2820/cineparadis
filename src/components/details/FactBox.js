import React from 'react';
import { img200, noPicture } from '../../helpers/config';
import { formatUsd } from '../../helpers/formatCurrency';
import formatTime from '../../helpers/formatTime';

import CollectionData from './CollectionData';

const FactBox = ({
  status,
  release,
  lang,
  budget,
  revenue,
  runtime,
  networks,
  title,
  seasons,
  last_air_date,
  first_air_date,
  belongs_to_collection,
  type,
}) => {
  return (
    <section className="px-3 py-5">
      <h2 className="text-center font-bold text-2xl mt-2">
        Facts About {title}
      </h2>

      <div className="max-w-2xl mx-auto mt-4 space-y-3">
        {budget && budget > 0 ? (
          <p className="fact-item">
            <span className="fact-type">Budget : </span>
            <span className="fact-detail">{formatUsd.format(budget)}</span>
          </p>
        ) : (
          ''
        )}
        {revenue && revenue > 0 ? (
          <p className="fact-item">
            <span className="fact-type">Revenue : </span>
            <span className="fact-detail">{formatUsd.format(revenue)}</span>
          </p>
        ) : (
          ''
        )}
        {status && (
          <p className="fact-item">
            <span className="fact-type">Status : </span>
            <span className="fact-detail">{status}</span>
          </p>
        )}
        {release && (
          <p className="fact-item">
            <span className="fact-type">Release Date : </span>
            <span className="fact-detail">{release}</span>
          </p>
        )}

        {networks && (
          <div className="flex flex-wrap items-center gap-3 fact-item">
            <span className="fact-type">Networks : </span>
            {networks.map((network) => (
              <img
                title={network.name}
                className="w-14"
                key={network.id}
                src={
                  network.logo_path
                    ? `${img200}/${network.logo_path}`
                    : noPicture
                }
                alt={network.name}
              />
            ))}
          </div>
        )}

        {lang && (
          <p className="fact-item">
            <span className="fact-type">Original Language : </span>
            <span className="fact-detail">{lang}</span>
          </p>
        )}

        {runtime ? (
          <p className="fact-item">
            <span>Runtime : </span>
            <span className="fact-detail">{formatTime(runtime)}</span>
          </p>
        ) : (
          ' '
        )}

        {first_air_date && (
          <p className="fact-item">
            <span className="fact-type">First Air Date : </span>
            <span className="fact-detail">{first_air_date}</span>
          </p>
        )}

        {last_air_date && (
          <p className="fact-item">
            <span className="fact-type">Last Air Date : </span>
            <span className="fact-detail">{last_air_date}</span>
          </p>
        )}

        {seasons && seasons.length > 0 && (
          <div>
            <p className="fact-item">
              <span className="fact-type">Seasons : </span>
              <span className="fact-detail">{seasons.length}</span>
            </p>
            <p className="mt-5 text-center font-medium">Season Details</p>
            <div className="block pl-5 mt-1">
              {seasons.map((season) => (
                <div
                  key={season.id}
                  className="shadow-bs5 p-3 my-3 rounded-sm border-2 border-blue-400"
                >
                  <div className="flex flex-col gap-1">
                    <p>
                      <span className="fact-type">{season.season_number}.</span>{' '}
                      <span className="fact-detail">{season.name}</span>
                    </p>
                    {season.air_date && (
                      <p>
                        <span className="fact-type">Air Date : </span>
                        <span className="fact-detail">{season.air_date}</span>
                      </p>
                    )}
                    {season.episode_count && season.episode_count > 0 ? (
                      <p>
                        <span className="fact-type">Number of Episodes : </span>
                        <span className="fact-detail">
                          {season.episode_count}
                        </span>
                      </p>
                    ) : (
                      ' '
                    )}
                    {season.overview && <p>{season.overview}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {belongs_to_collection && (
          <CollectionData collectionId={belongs_to_collection.id} type={type} />
        )}
      </div>
    </section>
  );
};

export default FactBox;
