import React from 'react';
import styled from 'styled-components';
import { img200, noPicture } from '../../helpers/config';
import formatTime from '../../helpers/formatTime';

const FactBox = ({
  status,
  release,
  lang,
  budget,
  revenue,
  runtime,
  networks,
  title,
}) => {
  return (
    <section className="px-3 py-5">
      <h2 className="text-center font-bold text-2xl mt-2">
        Facts About {title}
      </h2>

      <div className="max-w-2xl mx-auto mt-4 space-y-3">
        {budget && budget > 0 ? (
          <div>
            <b>budget : </b>
            <span>{budget}</span>
          </div>
        ) : (
          ''
        )}
        {revenue && revenue > 0 ? (
          <div>
            <b>Revenue : </b>
            <span>{revenue === 0 ? '-' : `$${revenue.toLocaleString()}`}</span>
          </div>
        ) : (
          ''
        )}
        {status && (
          <div>
            <b>Status : </b>
            <span>{status}</span>
          </div>
        )}
        {release && (
          <div>
            <b>Release Date : </b>
            <span>{release}</span>
          </div>
        )}

        {networks && (
          <div className="flex flex-wrap items-center gap-2">
            <b>Networks : </b>
            <div>
              {networks.map((network) => (
                <img
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
          <div>
            <b>Original Language : </b>
            <span>{lang}</span>
          </div>
        )}

        {runtime && (
          <div>
            <b>Runtime : </b>
            <span>{formatTime(runtime)}</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default FactBox;
