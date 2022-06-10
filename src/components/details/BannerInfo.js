import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Chip } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

import { AiFillStar } from 'react-icons/ai';
import { BiListPlus } from 'react-icons/bi';
import { BsFillTrashFill } from 'react-icons/bs';

import UserContext from '../../context/user';
import {
  checkIfInWatchlist,
  deleteItemFromWatchlist,
  updateProfileWatchlist,
} from '../../services/firebase';

import { img300, img500, unavailable } from '../../config/imgConfig';
import { formatTime } from '../../helpers/formatTime';
import voteColor from '../../helpers/voteColor';
import { LOGIN } from '../../constants/routes';
import SocialLinks from '../widget/SocialLinks';
import { notificationSettings } from '../../helpers/notificationSettings';
import ButtonLoading from '../loaders/ButtonLoading';
import WatchData from './WatchData';

const BannerInfo = ({ content, type, runtime }) => {
  const [loading, setLoading] = useState(false);
  const [inWatchlist, setInWatchlist] = useState();

  const { user } = useContext(UserContext);
  const history = useHistory();
  const id = content?.id;

  useEffect(() => {
    const checkIfThisInWatchlist = async () => {
      const userId = user?.uid;
      const watchlist = await checkIfInWatchlist(userId, id, type);
      setInWatchlist(watchlist);
    };

    checkIfThisInWatchlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inWatchlist]);

  const handleDelete = async (id, media_type, title) => {
    setLoading(true);
    try {
      const userId = user?.uid;
      await deleteItemFromWatchlist(userId, id, media_type);
      setInWatchlist(false);
      toast.warn(`${title} removed from Your Watchlist`, {
        ...notificationSettings,
      });
      setLoading(false);
    } catch (error) {
      toast.error('Something Went Wrong', {
        ...notificationSettings,
      });
      setLoading(false);
    }
  };

  const handleWatchlist = async (id, type, title) => {
    setLoading(true);
    try {
      const userId = user.uid;
      await updateProfileWatchlist(userId, id, type);
      setInWatchlist(true);

      toast.success(`${title} Added to Your Watchlist`, {
        ...notificationSettings,
      });
      setLoading(false);
    } catch (error) {
      toast.error('Something Went Wrong', {
        ...notificationSettings,
      });
      setLoading(false);
    }
  };

  return (
    <>
      {content && (
        <section
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(30, 39, 44, 0.9) 0%, rgba(30, 39, 44, 0.8) 100%), url(${img500}${content.backdrop_path})`,
          }}
          className="flex flex-col justify-start items-start sm:flex-row bg-cover bg-center shadow-lg"
        >
          <img
            className="max-w-[300px] xs:max-w-[320px] mx-auto sm:mx-0 w-full object-cover align-middle rounded-sm shadow-lg p-3 sm:p-5"
            src={
              content.poster_path
                ? `${img300}${content.poster_path}`
                : unavailable
            }
            alt={content.title}
          />
          <Details className="space-y-3">
            <p className="text-white text-xl md:text-2xl lg:text-3xl font-bold text-center sm:text-left">
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

            <WatchData type={type} id={content.id} />

            {content.tagline && (
              <i className="block text-center sm:text-left">
                {content.tagline}
              </i>
            )}

            <div className="flex items-center flex-wrap gap-3 justify-center sm:justify-start">
              {content.genres?.map((genre) => (
                <ChipLink
                  key={uuidv4()}
                  href={`/genre/${type}/${genre.name}/${genre.id}`}
                >
                  <Chip
                    className="chip"
                    label={genre.name}
                    color="primary"
                    size="small"
                  />
                </ChipLink>
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

            {inWatchlist === undefined ? (
              ''
            ) : inWatchlist ? (
              <button
                className="flex justify-center items-center disabled:cursor-not-allowed"
                onClick={() =>
                  handleDelete(id, type, content.name || content.title)
                }
                disabled={loading}
              >
                {loading && <ButtonLoading />}
                <BsFillTrashFill size={18} />
                <p className="text-base ml-2 leading-4">
                  Remove from watchlist
                </p>
              </button>
            ) : (
              <button
                className="flex justify-center items-center disabled:cursor-not-allowed"
                onClick={() => {
                  if (user) {
                    handleWatchlist(id, type, content.name || content.title);
                  } else {
                    history.push(LOGIN);
                  }
                }}
                disabled={loading}
              >
                {loading && <ButtonLoading />}
                <BiListPlus size={24} />
                <p className="text-base ml-2 leading-4">Add to watchlist</p>
              </button>
            )}
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

const ChipLink = styled.a`
  .MuiChip-root {
    cursor: pointer !important;
  }
`;

export default BannerInfo;
