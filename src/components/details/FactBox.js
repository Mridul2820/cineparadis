import React from 'react';
import { img200, noPicture } from '../../helpers/config';
import formatTime from '../../helpers/formatTime';
import CollectionData from './CollectionData';

const FactBox = ({
  status,
  release,
  lang,
  runtime,
  networks,
  title,
  seasons,
  last_air_date,
  first_air_date,
  belongs_to_collection,
  production_companies,
  type,
}) => {
  return (
    <section className="tab-section">
      <h2 className="detail-tab-title">Facts About {title}</h2>

      <div className="max-w-2xl mx-auto">
        {status && (
          <div className="fact-wrap">
            <p className="fact-item">
              <span className="fact-type">Status : </span>
              <span className="fact-detail">{status}</span>
            </p>
          </div>
        )}
        {release && (
          <div className="fact-wrap">
            <p className="fact-item">
              <span className="fact-type">Release Date : </span>
              <span className="fact-detail">{release}</span>
            </p>
          </div>
        )}

        {networks && (
          <div className="fact-wrap">
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
          </div>
        )}

        {lang && (
          <div className="fact-wrap">
            <p className="fact-item">
              <span className="fact-type">Original Language : </span>
              <span className="fact-detail">{lang}</span>
            </p>
          </div>
        )}

        {runtime ? (
          <div className="fact-wrap">
            <p className="fact-item">
              <span>Runtime : </span>
              <span className="fact-detail">{formatTime(runtime)}</span>
            </p>
          </div>
        ) : (
          ' '
        )}

        {first_air_date && (
          <div className="fact-wrap">
            <p className="fact-item">
              <span className="fact-type">First Air Date : </span>
              <span className="fact-detail">{first_air_date}</span>
            </p>
          </div>
        )}

        {last_air_date && (
          <div className="fact-wrap">
            <p className="fact-item">
              <span className="fact-type">Last Air Date : </span>
              <span className="fact-detail">{last_air_date}</span>
            </p>
          </div>
        )}

        {production_companies && production_companies.length > 0 && (
          <div className="fact-wrap">
            <div className="fact-item flex gap-2 items-center flex-wrap">
              <span className="fact-type whitespace-nowrap">
                Production companies :{' '}
              </span>
              <div className="flex gap-y-2 gap-x-4 items-center flex-wrap">
                {production_companies.map((company, index) => (
                  <div className="flex gap-2 items-center" key={company.id}>
                    <p>{index + 1}. </p>
                    <span className="fact-detail">{company.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {seasons && seasons.length > 0 && (
          <div>
            <div className="fact-wrap">
              <p className="fact-item">
                <span className="fact-type">Seasons : </span>
                <span className="fact-detail">{seasons.length}</span>
              </p>
            </div>
            <div className="flex justify-center">
              <span className="fact-section-title">Season Details</span>
            </div>
            <div className="block sm:pl-5 mt-1">
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
