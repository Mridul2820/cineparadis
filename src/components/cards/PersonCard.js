import React from 'react';
import { img300, noUserImg } from '../../config/imgConfig';

const PersonCard = ({ person }) => {
  return (
    <a
      href={`/person/${person.id}`}
      className="shadow-md rounded-md overflow-hidden w-36 md:w-40 border-2 border-blue-500"
    >
      <img
        src={
          person.profile_path ? `${img300}${person.profile_path}` : noUserImg
        }
        alt={person?.name}
        className="w-36 md:w-40 object-cover align-top"
      />
      <p className="font-semibold p-2 text-center">{person.name}</p>
    </a>
  );
};

export default PersonCard;
