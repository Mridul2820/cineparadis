import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { API_URL } from '../../constants/constant';
const apiKey = `api_key=${process.env.REACT_APP_TMDB}`;

const WatchData = ({ type, id }) => {
  const [watchData, setCatchData] = useState([]);

  const fetchWatchData = async () => {
    const { data } = await axios(
      `${API_URL}/${type}/${id}//watch/providers?${apiKey}`
    );

    setCatchData(data.results);
  };

  useEffect(() => {
    fetchWatchData();
    // eslint-disable-next-line
  }, []);

  console.log(watchData);

  return <div></div>;
};

export default WatchData;
