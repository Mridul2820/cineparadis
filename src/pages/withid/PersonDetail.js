import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import { API_URL, BASE_URL } from '../../constants/constant';
import { img500 } from '../../helpers/config';

import { Container } from '../../styles/Styles';

const detailURL = `${API_URL}/`;
const apiKey = `api_key=${process.env.REACT_APP_TMDB}`;

const PersonDetail = () => {
  const { id } = useParams();

  const [creditData, setCreditData] = useState();
  const [loading, setLoading] = useState(false);

  console.log(creditData);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await axios(
      `${detailURL}person/${id}?${apiKey}&language=en&append_to_response=external_ids,combined_credits,images,tagged_images`
    );

    setCreditData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
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
    <Container>
      <div className="flex gap-4">
        <img
          src={
            creditData?.profile_path
              ? `${img500}${creditData?.profile_path}`
              : 'https://via.placeholder.com/500x750'
          }
          alt={creditData?.name}
          className="w-60 rounded-md"
        />
        <div>
          <h1 className="text-2xl md:text-4xl font-bold mb-3">
            {creditData?.name}
          </h1>
          <p className="font-semibold text-xl mb-1">Biography</p>
          <p className="prose">{creditData?.biography}</p>
        </div>
      </div>
    </Container>
  );
};

export default PersonDetail;
