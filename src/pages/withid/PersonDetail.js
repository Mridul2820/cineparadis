import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import DetailCard from '../../components/person/DetailCard';
import PersonIntro from '../../components/person/PersonIntro';
import PresonTabs from '../../components/person/PresonTabs';
import { API_URL, BASE_URL } from '../../constants/constant';

import { Container } from '../../styles/Styles';

const detailURL = `${API_URL}/`;
const apiKey = `api_key=${process.env.REACT_APP_TMDB}`;

const PersonDetail = () => {
  const { id } = useParams();

  const [creditData, setCreditData] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await axios(
      `${detailURL}person/${id}?${apiKey}&language=en&append_to_response=external_ids,movie_credits,tv_credits,images`
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
      {creditData && <PersonIntro creditData={creditData} />}

      <div className="flex flex-col md:flex-row gap-4 items-start mt-4">
        {creditData && <DetailCard creditData={creditData} />}
        {creditData && <PresonTabs creditData={creditData} />}
      </div>
    </Container>
  );
};

export default PersonDetail;
