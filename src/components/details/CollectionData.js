import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';

import { img300 } from '../../helpers/config';
import { Container, ContentList } from '../../styles/Styles';
import { baseUrl } from '../../constants/constant';
import MovieSeries from '../cards/MovieSeries';

const apiKey = `api_key=${process.env.REACT_APP_TMDB}`;

const CollectionData = ({ collectionId, type }) => {
  const [loading, setLoading] = useState(false);
  const [collectionData, setCollectionData] = useState([]);

  const fetchCollection = async () => {
    setLoading(true);
    const { data } = await axios(
      `${baseUrl}/collection/${collectionId}?${apiKey}`
    );

    setCollectionData(data);
    setLoading(false);
  };

  console.log(collectionData);

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
      <p className="fact-item">
        <span className="fact-type">Collection : </span>
        <span className="fact-detail">{collectionData.name}</span>
      </p>
      <p className="mt-5 text-center font-medium">Collection Details</p>
      <div className="block mt-2">
        <div className="sm:pl-5">
          <div className="shadow-bs5 p-3 my-3 rounded-sm border-2 border-blue-400">
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
                <div className="min-w-[208px] mx-auto">
                  <img
                    className="w-52 h-52 rounded-full overflow-hidden"
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
              <span className="fact-type">Parts : </span>
              <span className="fact-detail">
                {collectionData?.parts?.length}
              </span>
            </p>

            <p className="text-center font-medium mt-4">Parts</p>
            <ContentList>
              {collectionData.parts.map((part) => (
                <MovieSeries
                  key={part.id}
                  id={part.id}
                  poster={part.backdrop_path}
                  title={part.title || part.original_title}
                  date={part.release_date || part.first_air_date}
                  media_type={type}
                  vote_average={part.vote_average}
                  description={part.overview}
                  recommended
                  nohover
                />
              ))}
            </ContentList>
          </>
        )}
      </div>
    </div>
  );
};

export default CollectionData;
