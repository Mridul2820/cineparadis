import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BiListPlus } from 'react-icons/bi';
import { AiFillStar } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';

import voteColor from '../../helpers/voteColor';
import truncate from '../../helpers/truncate';

import UserContext from '../../context/user';
import {
  checkIfInWatchlist,
  deleteItemFromWatchlist,
  updateProfileWatchlist,
} from '../../services/firebase';

import { img300, unavailableLandscape } from '../../config/imgConfig';

import { LOGIN } from '../../constants/routes';
import { notificationSettings } from '../../helpers/notificationSettings';
import ButtonLoading from '../loaders/ButtonLoading';

const MovieSeries = ({
  id,
  poster,
  backdrop,
  title,
  date,
  media_type,
  vote_average,
  description,
  showWatch,
  samepage,
  nohover,
  character,
  showCredit,
}) => {
  const [loading, setLoading] = useState(false);
  const [inWatchlist, setInWatchlist] = useState();

  const { user } = useContext(UserContext);
  const history = useHistory();
  const userId = user?.uid;

  useEffect(() => {
    const checkIfThisInWatchlist = async () => {
      const userId = user?.uid;
      const watchlist = await checkIfInWatchlist(userId, id, media_type);
      setInWatchlist(watchlist);
    };

    checkIfThisInWatchlist();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inWatchlist]);

  const handleWatchlist = async (id, media_type, title) => {
    setLoading(true);
    try {
      await updateProfileWatchlist(userId, id, media_type);
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

  const LinkContent = () => (
    <>
      <h3 className="text-base mb-2 font-bold leading-5 drop-shadow-xl">
        {truncate(title, 36)}
      </h3>
      <Rating vote_average={vote_average} voteColor={voteColor}>
        <AiFillStar />
        <p>{Math.round(vote_average * 10) / 10}</p>
      </Rating>
      <span className="font-semibold text-sm">
        {media_type === 'movie' ? 'Movie' : 'TV Series'} •{' '}
        {date ? new Date(date).getFullYear() : ' '}
      </span>
      {showCredit && character && (
        <p className="text-sm drop-shadow-xl">
          <span>As </span>
          <span className="font-semibold">{character}</span>{' '}
        </p>
      )}
    </>
  );

  return (
    <Content nohover={nohover}>
      <img
        src={
          backdrop
            ? `${img300}${backdrop}`
            : poster
            ? `${img300}${poster}`
            : unavailableLandscape
        }
        alt={title}
        className="poster"
      />

      {inWatchlist && (
        <DeleteIcon
          disabled={loading}
          onClick={() => handleDelete(id, media_type, title)}
          title="Remove From Watchlist"
        >
          {loading ? <ButtonLoading /> : <BsFillTrashFill size={15} />}
        </DeleteIcon>
      )}

      <Details>
        {samepage ? (
          <a href={`/${media_type}/${id}`}>
            <LinkContent />
          </a>
        ) : (
          <Link to={`/${media_type}/${id}`}>
            <LinkContent />
          </Link>
        )}
        <Expand>
          {!showCredit && (
            <p className="text-[10px]">{truncate(description, 35)}</p>
          )}
          {showWatch && (
            <>
              {inWatchlist === undefined && ''}
              {!inWatchlist && (
                <Watch
                  onClick={() => {
                    if (user) {
                      handleWatchlist(id, media_type, title);
                    } else {
                      history.push(LOGIN);
                    }
                  }}
                  disabled={loading}
                  id="watchAdd"
                >
                  {loading && <ButtonLoading />}
                  <BiListPlus size={22} />
                  <p className="text-xs">Add to watchlist</p>
                </Watch>
              )}
            </>
          )}
        </Expand>
      </Details>
    </Content>
  );
};

const Expand = styled.div`
  visibility: hidden;
  margin-top: 5px;

  @media only screen and (max-width: 480px) {
    visibility: visible;
  }
`;

const DeleteIcon = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: red;
  color: #fff;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

const Content = styled.div`
  width: 300px;
  height: 169px;
  overflow: hidden;
  margin: ${(props) => (props.nohover ? '10px' : '20px')};
  transition: all 0.5s;
  position: relative;
  border-radius: 5px;
  box-shadow: 3px 6px 10px rgba(0, 0, 0, 0.2);

  @media only screen and (max-width: 480px) {
    margin: 10px 5px;
  }

  &:hover {
    transform: ${(props) => (props.nohover ? 'scale(1)' : 'scale(1.25)')};
    box-shadow: 3px 6px 10px rgba(0, 0, 0, 0.5);
    z-index: 50;

    @media only screen and (max-width: 480px) {
      transform: scale(1);
    }

    ${Expand} {
      visibility: visible;
    }
  }

  img {
    width: 100%;
    border-radius: 5px;
    object-fit: cover;
    vertical-align: bottom;
  }
`;

const Details = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  color: #fff;
  padding-left: 15px;
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-image: linear-gradient(to right, #000, transparent);
`;

const Watch = styled.button`
  margin-top: 5px;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
  font-size: 10px;
  color: #fff;

  &:disabled {
    cursor: not-allowed;
  }
`;

const Rating = styled.div`
  padding: 1px 5px;
  margin: 5px 0;
  font-size: 12px;
  border-radius: 50px;
  width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ vote_average, voteColor }) => voteColor(vote_average)};
  gap: 5px;
`;

export default MovieSeries;
