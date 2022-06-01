import React, { useContext } from 'react';
import styled from 'styled-components';
import { Chip } from '@mui/material';
import { useHistory } from 'react-router-dom';

import { AiFillStar } from 'react-icons/ai';
import { BiListPlus } from 'react-icons/bi';

import UserContext from '../../context/user';
import { updateProfileWatchlist } from '../../services/firebase';
import { img300, img500, unavailable } from '../../helpers/config';
import formatTime from '../../helpers/formatTime';
import voteColor from '../../helpers/voteColor';
import { LOGIN } from '../../constants/routes';
import SocialLinks from '../widget/SocialLinks';

const BannerInfo = ({ content, type, runtime }) => {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const id = content?.id;

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
          <div className="w-full xs:max-w-[280px] mx-auto sm:mx-0 flex justify-center sm:justify-start">
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
          <Details className="space-y-3">
            <p className="mb-4 text-white text-xl md:text-2xl lg:text-3xl font-bold text-center sm:text-left">
              {content.name || content.title}{' '}
              {content.first_air_date || content.release_date
                ? `(${(
                    content.first_air_date || content.release_date
                  ).substring(0, 4)})`
                : ''}
            </p>

            <div className="flex items-center gap-1">
              <Rating vote_average={content.vote_average} voteColor={voteColor}>
                <AiFillStar />
                <p>{Math.round(content.vote_average * 10) / 10}</p>
              </Rating>
              {runtime ? <span>• {formatTime(runtime)}</span> : ' '}
            </div>

            {content.tagline && (
              <i className="block text-center sm:text-left">
                {content.tagline}
              </i>
            )}

            <div className="flex items-center flex-wrap gap-3 justify-center sm:justify-start">
              {content.genres?.map((genre) => (
                <a
                  key={genre.id}
                  href={`/genre/${type}/${genre.name}/${genre.id}`}
                >
                  <div className="cursor-pointer">
                    <Chip
                      className="chip"
                      label={genre.name}
                      color="primary"
                      size="small"
                    />
                  </div>
                </a>
              ))}
            </div>

            <p className="text-base text-center sm:text-left">
              {content.overview}
            </p>

            <SocialLinks
              facebook={content?.external_ids?.facebook_id}
              instagram={content?.external_ids?.instagram_id}
              twitter={content?.external_ids?.twitter_id}
              imdb={content?.external_ids?.imdb_id}
            />

            <Watch
              onClick={() => {
                if (user) {
                  handleWatchlist(id, type);
                } else {
                  history.push(LOGIN);
                }
              }}
            >
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

const Rating = styled.div`
  padding: 3px 10px;
  font-size: 14px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background-color: ${({ vote_average, voteColor }) => voteColor(vote_average)};
`;

export default BannerInfo;
