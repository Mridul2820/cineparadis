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
}) => {
  return (
    <FactWrap>
      <h2>Facts</h2>
      {status && (
        <FactItem>
          <b>Status : </b>
          <span>{status}</span>
        </FactItem>
      )}
      {release && (
        <FactItem>
          <b>Release Date : </b>
          <span>{release}</span>
        </FactItem>
      )}

      {networks && (
        <FactItem>
          <b>Networks : </b>
          <Networks>
            {networks.map((network) => (
              <img
                key={network.id}
                src={
                  network.logo_path
                    ? `${img200}/${network.logo_path}`
                    : noPicture
                }
                alt={network.name}
              />
            ))}
          </Networks>
        </FactItem>
      )}

      {lang && (
        <FactItem>
          <b>Original Language : </b>
          <span>{lang}</span>
        </FactItem>
      )}

      {runtime && (
        <FactItem>
          <b>Runtime : </b>
          <span>{formatTime(runtime)}</span>
        </FactItem>
      )}

      {revenue && (
        <FactItem>
          <b>Revenue : </b>
          <span>{revenue === 0 ? '-' : `$${revenue.toLocaleString()}`}</span>
        </FactItem>
      )}
    </FactWrap>
  );
};

const FactWrap = styled.div`
  width: 250px;
  padding: 10px;
`;

const FactItem = styled.div`
  margin: 10px 0;
`;

const Networks = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;

  img {
    width: 50px;
    margin-right: 10px;
  }
`;

export default FactBox;
