import { allCountry } from '../data/countryData';

export const countryFullName = (country) => {
  const countryFull = allCountry.find((item) => item.iso_3166_1 === country);
  return countryFull?.english_name;
};
