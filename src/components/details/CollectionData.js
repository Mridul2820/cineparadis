import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';

import { img300 } from '../../helpers/config';
import { Container } from '../../styles/Styles';
import { API_URL } from '../../constants/constant';
import ContentGrid from '../widget/ContentGrid';

const apiKey = `api_key=${process.env.REACT_APP_TMDB}`;

const CollectionData = ({ collectionId, type }) => {
  const [loading, setLoading] = useState(false);
  const [collectionData, setCollectionData] = useState([]);

  const fetchCollection = async () => {
    setLoading(true);
    const { data } = await axios(
      `${API_URL}/collection/${collectionId}?${apiKey}`
    );

    setCollectionData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCollection();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <Container className="flex flex-col justify-center items-center w-full">
        <Loader
          type="Circles"
          color="#00BFFF"
          height={50}
          width={200}
          className="m-5"
        />
      </Container>
    );
  }

  return (
    <div className="mt-5">
      <div className="fact-wrap">
        <p className="fact-item">
          <span className="fact-type">Collection : </span>
          <span className="fact-detail">{collectionData.name}</span>
        </p>
      </div>
      <div className="flex justify-center">
        <span className="fact-section-title">Collection Details</span>
      </div>
      <div className="block mt-2">
        <div className="sm:pl-5">
          <div className="p-3 my-3 rounded-sm border-2 border-blue-400 shadow-bs5">
            <div className="flex flex-col justify-start items-center sm:flex-row gap-3">
              <div className="">
                <p>
                  <span className="fact-type">
                    {collectionData.collection_number}
                  </span>{' '}
                  <span className="fact-detail">{collectionData.name}</span>
                </p>
                {collectionData.overview && <p>{collectionData.overview}</p>}
              </div>
              {collectionData.poster_path && (
                <div className="min-w-[192px] mx-auto">
                  <img
                    className="w-48 h-48 rounded-full overflow-hidden object-cover shadow-bs5"
                    src={`${img300}/${collectionData.poster_path}`}
                    alt={collectionData.name}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {collectionData.parts && collectionData.parts.length > 0 && (
          <>
            <p className="fact-item">
              <span className="fact-type">Total Parts : </span>
              <span className="fact-detail">
                {collectionData?.parts?.length}
              </span>
            </p>

            <div className="flex justify-center">
              <span className="fact-section-title">
                All the Parts of <b>{collectionData.name}</b>
              </span>
            </div>
            <ContentGrid
              items={collectionData.parts}
              media_type={type}
              samepage
              nohover
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CollectionData;
