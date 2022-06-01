import React from 'react';
import { img500 } from '../../helpers/config';

const PersonIntro = ({ creditData }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start">
      <img
        src={
          creditData?.profile_path
            ? `${img500}${creditData?.profile_path}`
            : 'https://via.placeholder.com/500x750'
        }
        alt={creditData?.name}
        className="w-60 rounded-md mx-auto md:mx-0"
      />
      <div>
        <h1 className="text-2xl md:text-4xl font-bold mb-3">
          {creditData?.name}
        </h1>
        <p className="font-semibold text-xl mb-1">Biography</p>
        <p
          className="-sm prose-slate"
          dangerouslySetInnerHTML={{ __html: creditData?.biography }}
        />
      </div>
    </div>
  );
};

export default PersonIntro;
