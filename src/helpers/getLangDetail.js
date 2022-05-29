import { langData } from '../data/langData';

export const getLangDetail = (lang) => {
  const langDetail = langData.find((item) => item.iso_639_1 === lang);
  const language = {
    name: langDetail?.english_name,
    nativeName: langDetail?.name,
  };
  return langDetail ? language : lang;
};
