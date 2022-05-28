import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { img300, unavailableLandscape } from '../../helpers/config';
import { BiListPlus } from 'react-icons/bi';
import { AiFillStar } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';

import voteColor from '../../helpers/voteColor';
import truncate from '../../helpers/truncate';

import UserContext from '../../context/user';
import {
  deleteItemFromWatchlist,
  updateProfileWatchlist,
} from '../../services/firebase';

const MovieSeries = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
  description,
  showDeleteIcon,
  showWatch,
  recommended,
  nohover,
}) => {
  const { user } = useContext(UserContext);
  const userId = user.uid;

  const handleWatchlist = async (id, media_type) => {
    await updateProfileWatchlist(userId, id, media_type);

    alert('Added to Your Watchlist. Go to Your dashboard');
  };

  const handleDelete = async (id, media_type) => {
    await deleteItemFromWatchlist(userId, id, media_type);

    window.location.reload();
    // alert('Removed from Your Watchlist')
  };

  const LinkContent = () => (
    <>
      <h3 className="text-base mb-2 font-bold leading-5">
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
    </>
  );

  return (
    <Content nohover={nohover}>
      <img
        src={poster ? `${img300}${poster}` : unavailableLandscape}
        alt={title}
        className="poster"
      />

      {showDeleteIcon && (
        <DeleteIcon onClick={() => handleDelete(id, media_type)}>
          <BsFillTrashFill />
        </DeleteIcon>
      )}

      <Details>
        {recommended ? (
          <a href={`/${media_type}/${id}`}>
            <LinkContent />
          </a>
        ) : (
          <Link to={`/${media_type}/${id}`}>
            <LinkContent />
          </Link>
        )}

        <Expand>
          <p className="text-[10px]">{truncate(description, 35)}</p>
          {showWatch && !nohover && (
            <Watch
              onClick={() => handleWatchlist(id, media_type)}
              id="watchAdd"
            >
              <BiListPlus size="16px" />
              Add to watchlist
            </Watch>
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
  top: 5px;
  right: 5px;
  background-color: red;
  color: #fff;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  cursor: pointer;
`;

const Content = styled.div`
  width: 300px;
  height: 169px;
  margin: 20px;
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

  p {
    margin-left: 5px;
  }
`;

export default MovieSeries;
