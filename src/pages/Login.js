import React, { useContext, useEffect } from 'react'
import { Button } from '../GlobalStyles'
import { provider } from '../lib/firebase'
import * as ROUTES from '../constants/routes'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { FcGoogle } from 'react-icons/fc'

import FirebaseContext from '../context/firebase'
import { doesGmailExist } from '../services/firebase'

const Login = () => {
    const history = useHistory()
    const { firebase } = useContext(FirebaseContext)

    const handleLogin = async () => {
        try {
            const createdUser = await firebase.auth().signInWithPopup(provider);
            console.log('createdUser', createdUser.user);

            const gmailExists = await doesGmailExist(createdUser.user.email)


            if(!gmailExists){
                await firebase
                .firestore()
                .collection('users')
                .add({
                    userId: createdUser.user.uid,
                    gmail: createdUser.user.email,
                    fullName: createdUser.user.displayName,
                    userImg: createdUser.user.photoURL,
                    dateCreated: Date.now()
                });
            }

            history.push(ROUTES.DASHBOARD)

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        document.title = 'Login - CineParadis'
    }, [])

    return (
        <Container>
            <Banner>
                <img src='./assets/movie_night_fldd.svg' alt="banner" />
            </Banner>
            <Text>
                <h1>CineParadis</h1>
                <Button onClick={handleLogin}>
                    <span>Login With Google</span>
                    <FcGoogle size="25px" />
                </Button>
            </Text>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    min-height: 100vh;
    background-color: #212121;
`

const Text = styled.div`
    width: 40%;
    text-align: center;
    display: flex;
    flex-direction: column;
    padding-right: 40px;
    align-items: center;
    color: #fff;

    h1 {
        font-size: 60px;
        margin-bottom: 20px;
    }

    ${Button} {
        padding: 10px 20px;
        font-size: 18px;
        background-color: transparent;
        border: 1px solid #ff6584;
        display: flex;
        align-items: center;

        span {
            margin-right: 5px;
            font-size: 22px;
        }
    }
`

const Banner = styled.div`
    width: 60%;
    padding: 0 30px;

    img {
        width: 100%;
    }
`

export default Login
