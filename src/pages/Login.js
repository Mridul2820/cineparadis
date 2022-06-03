import React, { useContext, useEffect } from 'react';
import { provider } from '../lib/firebase';
import * as ROUTES from '../constants/routes';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { FcGoogle } from 'react-icons/fc';

import FirebaseContext from '../context/firebase';
import { doesGmailExist } from '../services/firebase';
import { Link } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const handleLogin = async () => {
    try {
      const createdUser = await firebase.auth().signInWithPopup(provider);

      const gmailExists = await doesGmailExist(createdUser.user.email);

      if (!gmailExists) {
        await firebase.firestore().collection('users').add({
          userId: createdUser.user.uid,
          gmail: createdUser.user.email,
          fullName: createdUser.user.displayName,
          userImg: createdUser.user.photoURL,
          dateCreated: Date.now(),
          watchlist: [],
        });
      }

      history.push(ROUTES.ROOT);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    document.title = 'Login - CineParadis';
  }, []);

  return (
    <Container>
      <Banner>
        <img
          src="./assets/movie_night_fldd.svg"
          alt="banner"
          className="w-full"
        />
      </Banner>
      <Text>
        <h1 className="text-5xl md:text-6xl font-semibold">CineParadis</h1>
        <button
          onClick={handleLogin}
          className="login-button flex justify-center items-center gap-2 border-pink-500"
        >
          <span>Login With Google</span>
          <FcGoogle size="25px" />
        </button>
        <Link to={ROUTES.ROOT} className="login-button border-blue-500">
          <span>Continue Without Login</span>
        </Link>
      </Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  min-height: 100vh;
  background-color: #212121;

  @media only screen and (max-width: 712px) {
    flex-direction: column-reverse;
  }
`;

const Text = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  padding-right: 40px;
  align-items: center;
  justify-content: center;
  gap: 40px;
  color: #fff;

  @media only screen and (max-width: 956px) {
    width: 50%;
  }

  @media only screen and (max-width: 712px) {
    width: 90%;
    padding-right: 0;
  }
`;

const Banner = styled.div`
  width: 60%;
  padding: 0 30px;

  @media only screen and (max-width: 956px) {
    width: 50%;
  }

  @media only screen and (max-width: 712px) {
    padding: 0 20px;
    width: 95%;
  }
`;

export default Login;
