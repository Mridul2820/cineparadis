import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

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
    <Container>
      <Link
        to={user ? ROUTES.DASHBOARD : ROUTES.ROOT}
        className="flex items-center gap-1"
      >
        <img src={logo} alt="logo" className="h-10" />
        <h2 className="font-bold leading-4 hidden md:block">
          Cine
          <br />
          Paradis
        </h2>
      </Link>

      <div className="hidden md:block">
        <NavOptions />
      </div>

      <HeaderRight>
        {/* <Chat to={ROUTES.Chats}>
          <IoChatbubblesOutline />
          <span>Chats</span>
        </Chat> */}

        {user && (
          <User>
            <img src={user.photoURL} alt="user" />
          </User>
        )}

        <Logout>
          {user ? (
            <Button
              onClick={() => {
                firebase.auth().signOut();
                history.push(ROUTES.LOGIN);
              }}
            >
              Logout
            </Button>
          ) : (
            <Link to={ROUTES.LOGIN}>
              <Button type="button">Log In</Button>
            </Link>
          )}
        </Logout>
      </HeaderRight>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #fff;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10000;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

const User = styled.div`
  margin-right: 10px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
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
