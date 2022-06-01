import React from 'react';
import { getAge } from '../../helpers/getAge';
import SocialLinks from '../widget/SocialLinks';

const DetailCard = ({ creditData }) => {
  const {
    external_ids,
    birthday,
    place_of_birth,
    also_known_as,
    known_for_department,
  } = creditData;
  return (
    <div className="w-80 rounded-md mx-auto md:mx-0 p-3">
      <SocialLinks
        facebook={external_ids.facebook_id}
        instagram={external_ids.instagram_id}
        twitter={external_ids.twitter_id}
        imdb={external_ids.imdb_id}
      />

      <div className="my-5">
        <p className="font-semibold text-base mb-3">Personal Info</p>
        {known_for_department && (
          <div className="fact-wrap">
            <p className="fact-item">
              <span className="fact-type">Known For : </span>
              <span className="fact-detail">{known_for_department}</span>
            </p>
          </div>
        )}
        {birthday && (
          <div className="fact-wrap">
            <p className="fact-item">
              <span className="fact-type">Birthday : </span>
              <span className="fact-detail">{birthday}</span>
            </p>
          </div>
        )}
        {birthday && (
          <div className="fact-wrap">
            <p className="fact-item">
              <span className="fact-type">Age : </span>
              <span className="fact-detail">{getAge(birthday)}</span>
            </p>
          </div>
        )}
        {place_of_birth && (
          <div className="fact-wrap">
            <p className="fact-item">
              <span className="fact-type">Place of birth : </span>
              <span className="fact-detail">{place_of_birth}</span>
            </p>
          </div>
        )}
        {also_known_as && also_known_as.length > 0 && (
          <div className="fact-wrap">
            <p className="fact-item">
              <span className="fact-type">Also Known As : </span>
              <div className="flex gap-y-2 gap-x-4 items-center flex-wrap">
                {also_known_as.map((name, index) => (
                  <div className="flex gap-2 items-center" key={index}>
                    <p>{index + 1}. </p>
                    <span className="fact-detail">{name}</span>
                  </div>
                ))}
              </div>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailCard;
