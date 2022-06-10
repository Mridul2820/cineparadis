import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { img200, noPicture } from '../../config/imgConfig';
import { formatTime } from '../../helpers/formatTime';
import { getDirector, getProducer } from '../../helpers/getCrew';
import { getLangDetail } from '../../helpers/getLangDetail';
import CollectionData from './CollectionData';
import { dateSettings } from '../../helpers/dateSettings';

const FactBox = ({ content, type }) => {
  const {
    crew,
    original_title,
    status,
    release,
    lang,
    runtime,
    networks,
    title,
    seasons,
    release_date,
    last_air_date,
    first_air_date,
    belongs_to_collection,
    production_companies,
    keywords,
  } = content;

  return (
    <section className="tab-section">
      <h2 className="detail-tab-title">Facts About {title}</h2>

      <div className="max-w-2xl mx-auto">
        {original_title && (
          <div className="fact-wrap">
            <p className="fact-item">
              <span className="fact-type">Original Title : </span>
              <span className="fact-detail">{original_title}</span>
            </p>
          </div>
        )}

        {crew && getDirector(crew).length > 0 && (
          <div className="fact-wrap">
            <div className="flex flex-wrap items-center gap-3 fact-item">
              <span className="fact-type">Director : </span>

              {getDirector(crew).map((producer) => (
                <div className="flex items-center gap-2" key={uuidv4()}>
                  <img
                    title={producer.name}
                    className="w-9 h-9 object-cover rounded-full"
                    src={
                      producer.profile_path
                        ? `${img200}${producer.profile_path}`
                        : noPicture
                    }
                    alt={producer.name}
                  />
                  <span className="text-base font-semibold">
                    {producer.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {crew && getProducer(crew).length > 0 && (
          <div className="fact-wrap">
            <div className="flex flex-wrap items-center gap-3 fact-item">
              <span className="fact-type">Producer : </span>
              {getProducer(crew).map((producer) => (
                <div className="flex items-center gap-2" key={uuidv4()}>
                  <img
                    title={producer.name}
                    className="w-9 h-9 object-cover rounded-full"
                    key={uuidv4()}
                    src={
                      producer.profile_path
                        ? `${img200}${producer.profile_path}`
                        : noPicture
                    }
                    alt={producer.name}
                  />{' '}
                  <span className="text-base font-semibold">
                    {producer.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {status && (
          <div className="fact-wrap">
            <p className="fact-item">
              <span className="fact-type">Status : </span>
              <span className="fact-detail">{status}</span>
            </p>
          </div>
        )}

        {release_date && (
          <div className="fact-wrap">
            <p className="fact-item">
              <span className="fact-type">Release Date : </span>
              <span className="fact-detail">
                {new Date(release_date).toLocaleDateString(
                  'en-US',
                  dateSettings
                )}
              </span>
            </p>
          </div>
        )}

        {release && (
          <div className="fact-wrap">
            <p className="fact-item">
              <span className="fact-type">Release Date : </span>
              <span className="fact-detail">
                {new Date(release).toLocaleDateString('en-US', dateSettings)}
              </span>
            </p>
          </div>
        )}

        {first_air_date && (
          <div className="fact-wrap">
            <p className="fact-item">
              <span className="fact-type">First Air Date : </span>
              <span className="fact-detail">
                {new Date(first_air_date).toLocaleDateString(
                  'en-US',
                  dateSettings
                )}
              </span>
            </p>
          </div>
        )}

        {last_air_date && (
          <div className="fact-wrap">
            <p className="fact-item">
              <span className="fact-type">Last Air Date : </span>
              <span className="fact-detail">
                {new Date(last_air_date).toLocaleDateString(
                  'en-US',
                  dateSettings
                )}
              </span>
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

        {lang && (
          <div className="fact-wrap">
            <p className="fact-item">
              <span className="fact-type">Original Language : </span>
              <span className="fact-detail">
                {getLangDetail(lang).name}
                {getLangDetail(lang).nativeName &&
                  getLangDetail(lang).nativeName !== ' ' &&
                  ` (${getLangDetail(lang).nativeName})`}
              </span>
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
                  key={uuidv4()}
                  src={
                    network.logo_path
                      ? `${img200}${network.logo_path}`
                      : noPicture
                  }
                  alt={network.name}
                />
              ))}
            </div>
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
                  key={uuidv4()}
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

        {keywords && keywords.length > 0 && (
          <div className="fact-item flex gap-2 items-center flex-wrap">
            <span className="fact-type whitespace-nowrap">
              Keywords{` (${keywords.length})`} :{' '}
            </span>
            <div className="flex gap-y-2 gap-x-4 items-center flex-wrap">
              {keywords.map((keyword) => (
                <span
                  key={uuidv4()}
                  className="font-medium bg-blue-200 rounded-full px-2 text-sm"
                >
                  {keyword.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FactBox;
