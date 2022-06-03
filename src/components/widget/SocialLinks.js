import React from 'react';
import { GrFacebook, GrInstagram, GrTwitter } from 'react-icons/gr';
import { FaImdb } from 'react-icons/fa';

const SocialLinks = ({ facebook, instagram, twitter, imdb }) => {
  return (
    <div className="flex gap-4">
      {facebook && (
        <a
          target="_blank"
          rel="noreferrer"
          title="Facebook"
          href={`https://www.facebook.com/${facebook}`}
        >
          <GrFacebook size={22} />
        </a>
      )}

      {instagram && (
        <a
          target="_blank"
          rel="noreferrer"
          title="Instagram"
          href={`https://www.instagram.com/${instagram}`}
        >
          <GrInstagram size={22} />
        </a>
      )}

      {twitter && (
        <a
          target="_blank"
          rel="noreferrer"
          title="Twitter"
          href={`https://www.twitter.com/${twitter}`}
        >
          <GrTwitter size={22} />
        </a>
      )}

      {twitter && (
        <a
          target="_blank"
          rel="noreferrer"
          title="IMDB"
          href={`https://www.imdb.com/title/${imdb}`}
        >
          <FaImdb size={24} />
        </a>
      )}
    </div>
  );
};

export default SocialLinks;
