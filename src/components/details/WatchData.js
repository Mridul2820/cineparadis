import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { API_URL } from '../../constants/constant';
import { img200, noPicture } from '../../config/imgConfig';
const apiKey = `api_key=${process.env.REACT_APP_TMDB}`;

const WatchData = ({ type, id }) => {
  // eslint-disable-next-line
  const [watchData, setCatchData] = useState([]);
  const [country, setCountry] = useState();

  const fetchWatchData = async () => {
    try {
      const country = await axios.get('http://ip-api.com/json');
      if (country.data.countryCode) {
        setCountry(country.data.countryCode);
      } else {
        setCountry('IN');
      }
    } catch (error) {
      setCountry('IN');
    }

    const { data } = await axios(
      `${API_URL}/${type}/${id}//watch/providers?${apiKey}`
    );
    setCatchData(data.results);
  };

  useEffect(() => {
    fetchWatchData();
    // eslint-disable-next-line
  }, []);

  const CountryWatchData = watchData[country];

  return (
    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
      {CountryWatchData?.flatrate?.map((item) => (
        <a
          target="_blank"
          rel="noreferrer"
          href={CountryWatchData?.link}
          key={uuidv4()}
          className="p-2 shadow-2xl border-2 border-blue-200 rounded-md flex items-center gap-2 cursor-pointer"
          title={`Watch now on ${item.provider_name}`}
        >
          <img
            src={item.logo_path ? `${img200}${item.logo_path}` : noPicture}
            alt={item.provider_name}
            className="w-10 h-10 rounded-full"
          />
          <div className="leading-4 -mt-1">
            <span className="text-sm ">Watch now on</span>{' '}
            <p className="font-semibold">{item.provider_name}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default WatchData;
