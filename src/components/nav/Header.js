import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineLogout } from 'react-icons/ai';

import { Button } from '../../styles/Styles';
import * as ROUTES from '../../constants/routes';

import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

import logo from '../../assets/logo-black.PNG';
import NavOptions from '../options/NavOptions';

const Header = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  return (
    <NavWrap>
      <Link
        to={user ? ROUTES.DASHBOARD : ROUTES.ROOT}
        className="flex items-center gap-1"
      >
        <img src={logo} alt="logo" className="h-10" />
        <h2 className="font-bold hidden md:block">CineParadis</h2>
      </Link>

      <div className="hidden md:block">
        <NavOptions />
      </div>

      <h2 className="font-bold block md:hidden">CineParadis</h2>

      <HeaderRight>
        {/* <Chat to={ROUTES.Chats}>
          <IoChatbubblesOutline />
          <span>Chats</span>
        </Chat> */}

        {user && (
          <User>
            <img
              src={user.photoURL}
              alt="user"
              className="w-8 h-8 rounded-full"
            />
            <HoverBox className="absolute px-2 shadow-md bg-white border-2 border-blue-600 rounded-sm">
              <Link to={ROUTES.DASHBOARD} className="dropdown-item">
                Dashboard
              </Link>
            </HoverBox>
          </User>
        )}

        <Logout>
          {user ? (
            <Button
              onClick={async () => {
                await firebase.auth().signOut();
                history.push(ROUTES.LOGIN);
              }}
              title="Logout"
            >
              <span className="hidden md:block">Logout</span>
              <span className="block md:hidden">
                <AiOutlineLogout size={20} />
              </span>
            </Button>
          ) : (
            <Link to={ROUTES.LOGIN}>
              <Button type="button">Log In</Button>
            </Link>
          )}
        </Logout>
      </HeaderRight>
    </NavWrap>
  );
};

const NavWrap = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #fff;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;

  @media only screen and (max-width: 480px) {
    padding: 10px;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

const HoverBox = styled.div`
  top: 52px;
  opacity: 0;
  visibility: hidden;
  right: 72px;
  margin-top: 20px;
`;

const User = styled.div`
  margin-right: 10px;
  width: 32px;
  height: 44px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus-within,
  &:focus,
  &:hover {
    ${HoverBox} {
      opacity: 1;
      visibility: visible;
      top: 34px;
      transition: all 0.5s;
    }
  }
`;

// const Chat = styled(NavLink)`
//     margin-right: 30px;
//     box-shadow: 2px 4px 10px rgba(0, 0, 0, .2);
//     padding: 5px 7px;
//     border-radius: 5px;
//     display: flex;
//     justify-content: center;
//     align-items: center;

//     @media only screen and (max-width: 375px){
//         margin-right: 15px;
//     }

//     &.active,
//     &:hover {
//         box-shadow: 2px 4px 10px rgba(0, 0, 0, .3);
//     }

//     span {
//         margin-left: 5px;

//         @media only screen and (max-width: 375px){
//             display: none;
//         }
//     }
// `

const Logout = styled.div`
  ${Button} {
    margin: 0;
  }
`;

export default Header;
