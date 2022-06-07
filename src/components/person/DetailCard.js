import React from 'react';
import { getAge } from '../../helpers/getAge';
import SocialLinks from '../widget/SocialLinks';
import { v4 as uuidv4 } from 'uuid';
import { dateSettings } from '../../helpers/dateSettings';

const DetailCard = ({ creditData }) => {
  const {
    external_ids,
    birthday,
    deathday,
    place_of_birth,
    also_known_as,
    known_for_department,
  } = creditData;

  return (
    <div className="w-full xs:w-80 rounded-md mx-auto md:mx-0 p-1 xs:p-3">
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
              <span className="fact-type">Born : </span>
              <span className="fact-detail">
                {new Date(birthday).toLocaleDateString('en-US', dateSettings)}
              </span>
            </p>
          </div>
        )}
        {deathday && (
          <div className="fact-wrap">
            <p className="fact-item">
              <span className="fact-type">Died : </span>
              <span className="fact-detail">
                {new Date(deathday).toLocaleDateString('en-US', dateSettings)}
              </span>
            </p>
          </div>
        )}
        {birthday && !deathday && (
          <div className="fact-wrap">
            <p className="fact-item">
              <span className="fact-type">Age : </span>
              <span className="fact-detail">{getAge(birthday)} Years</span>
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
            <div className="fact-item">
              <span className="fact-type">Also Known As : </span>
              <div className="flex gap-y-2 gap-x-4 items-center flex-wrap">
                {also_known_as.map((name, index) => (
                  <div className="flex gap-2 items-center" key={uuidv4()}>
                    <p>{index + 1}. </p>
                    <span className="fact-detail">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailCard;
