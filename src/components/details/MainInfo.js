import React, { useContext } from 'react';
import styled from 'styled-components';
import { img300, img500, unavailable } from '../../helpers/config';
import { Chip } from '@mui/material';

import { GrFacebook, GrInstagram, GrTwitter } from 'react-icons/gr';
import UserContext from '../../context/user';
import { updateProfileWatchlist } from '../../services/firebase';
import { BiListPlus } from 'react-icons/bi';

const MainInfo = ({ content, type }) => {
  const { user } = useContext(UserContext);

  const id = content.id;

  const handleWatchlist = async (id, type) => {
    const userId = user.uid;

    await updateProfileWatchlist(userId, id, type);

    alert('Added to You Watchlist. Go to Your dashboard');
  };

  return (
    <>
      {content && (
        <section
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(30, 39, 44, 0.9) 0%, rgba(30, 39, 44, 0.8) 100%), url(${img500}${content.backdrop_path})`,
          }}
          className="flex flex-col justify-start items-start sm:flex-row gap-4 bg-cover bg-center"
        >
          <div className="w-full xs:max-w-[280px] mx-auto flex justify-center sm:justify-start">
            <img
              className="max-w-[250px] xs:max-w-[280px] w-full object-cover align-middle"
              src={
                content.poster_path
                  ? `${img300}${content.poster_path}`
                  : unavailable
              }
              alt={content.title}
            />
          </div>
          <Details className="space-y-4">
            <span className="mb-4 text-white text-xl md:text-2xl lg:text-3xl font-bold">
              {content.name || content.title} (
              {(
                content.first_air_date ||
                content.release_date ||
                ' '
              ).substring(0, 4)}
              )
            </span>

            {content.tagline && <i className="block">{content.tagline}</i>}

            <div className="flex items-center flex-wrap gap-3">
              {content.genres?.map((genre) => (
                <Chip
                  key={genre.id}
                  className="chip"
                  label={genre.name}
                  color="primary"
                  size="small"
                />
              ))}
            </div>

            <p className="text-base">{content.overview}</p>

            <Social>
              {content?.external_ids?.facebook_id && (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`https://www.facebook.com/${content.external_ids.facebook_id}`}
                >
                  <GrFacebook size="22px" />
                </a>
              )}

              {content?.external_ids?.instagram_id && (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`https://www.instagram.com/${content.external_ids.instagram_id}`}
                >
                  <GrInstagram size="22px" />
                </a>
              )}

              {content?.external_ids?.twitter_id && (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`https://www.twitter.com/${content.external_ids.twitter_id}`}
                >
                  <GrTwitter size="22px" />
                </a>
              )}
            </Social>

            <Watch onClick={() => handleWatchlist(id, type)}>
              <BiListPlus size="24px" />
              <p>Add to watchlist</p>
            </Watch>
          </Details>
        </section>
      )}
    </>
  );
};

const Details = styled.div`
  color: #fff;
  padding: 20px 10px;

  @media only screen and (max-width: 640px) {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 20px 25px;
  }
`;

const Social = styled.div`
  display: flex;
  margin-top: 20px;

  a {
    margin-right: 15px;
  }
`;

const Watch = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
  font-size: 10px;
  color: #fff;
  margin-top: 5px;

  p {
    font-size: 17px;
    margin-left: 8px;
  }
`;

export default MainInfo;
