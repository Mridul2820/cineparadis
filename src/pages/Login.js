import React, { useContext, useEffect } from 'react'
import { Button } from '../GlobalStyles'
import { provider } from '../lib/firebase'
import * as ROUTES from '../constants/routes'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import banner from '../assets/3658600.png'
import FirebaseContext from '../context/firebase'

const Login = () => {
    const history = useHistory()
    const { firebase } = useContext(FirebaseContext)

    const handleLogin = async () => {
        try {
            await firebase.auth().signInWithRedirect(provider);
            history.push(ROUTES.DASHBOARD)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        document.title = 'Login - MovieBuff'
    }, [])

    return (
        <Container>
            <Text>
                <h1>The one place for watchlist</h1>
                <Button onClick={handleLogin}>Login With Google</Button>
            </Text>
            <Banner>
                <img src={banner} alt="banner" />
            </Banner>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    min-height: 100vh;
`

const Text = styled.div`
    width: 50%;
    text-align: center;

    h1 {
        font-size: 36px;
        margin-bottom: 20px;
    }

    ${Button} {
        padding: 10px 20px;
        font-size: 18px;
    }
`

const Banner = styled.div`
    width: 50%;
    padding: 0 30px;

    img {
        width: 100%;
    }
`

export default Login
