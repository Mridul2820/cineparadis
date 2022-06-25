import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { IoMdArrowDropdownCircle } from 'react-icons/io';
import { AiFillCloseCircle } from 'react-icons/ai';

import SearchWithIcon from '../search/SearchWithIcon';
import { API_URL } from '../../constants/constant';
import { img200, noPicture } from '../../config/imgConfig';
import { countryFullName } from '../../helpers/countryFull';

const apiKey = `api_key=${process.env.REACT_APP_TMDB}`;

const WatchData = ({ type, id }) => {
  const dropdownRef = useRef();
  const [search, setSearch] = useState('');
  const [watchData, setWatchData] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const [country, setCountry] = useState(
    localStorage.getItem('country') || 'IN'
  );

  const fetchWatchData = async () => {
    const { data } = await axios(
      `${API_URL}/${type}/${id}//watch/providers?${apiKey}`
    );
    setWatchData(data.results);
  };

  useEffect(() => {
    fetchWatchData();
    // eslint-disable-next-line
  }, [country]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        dropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setDropdown(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [dropdown]);

  const CountryWatchData = watchData[country];
  const CountryCodes = Object.keys(watchData);

  const FilteredCodes = CountryCodes.filter(
    (code) =>
      code.toLowerCase().includes(search.toLowerCase()) ||
      countryFullName(code).toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      {CountryWatchData?.flatrate?.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start">
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
                  src={
                    item.logo_path ? `${img200}${item.logo_path}` : noPicture
                  }
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

          <div className="relative">
            <div
              className="flex gap-1 items-center p-2 cursor-pointer w-16"
              onClick={() => setDropdown(!dropdown)}
              title={countryFullName(country)}
            >
              <span className="font-semibold">{country}</span>
              {dropdown ? (
                <AiFillCloseCircle size={24} />
              ) : (
                <IoMdArrowDropdownCircle size={27} />
              )}
            </div>
            <div className="absolute -left-16 dropdown">
              {dropdown && (
                <div
                  ref={dropdownRef}
                  className="bg-white shadow-lg rounded-sm max-h-60 w-48 overflow-y-scroll p-2 block select-none"
                >
                  <SearchWithIcon
                    search={search}
                    handleChange={handleChange}
                    placeHolder={`Search Country`}
                    searchId={`search-country`}
                    small
                  />
                  {FilteredCodes.map((code) => (
                    <div
                      key={uuidv4()}
                      className={`${
                        country === code && 'bg-gray-300'
                      } text-black text-sm cursor-pointer px-2 py-1 flex gap-2`}
                      onClick={() => {
                        setCountry(code);
                        localStorage.setItem('country', code);
                        setDropdown(false);
                      }}
                    >
                      <span className="font-semibold">{code}</span>
                      <span className="font-medium">
                        {countryFullName(code)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WatchData;
