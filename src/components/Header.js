import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button } from '../GlobalStyles'

import * as ROUTES from '../constants/routes'

import FirebaseContext from '../context/firebase'
import UserContext from '../context/user'

import logo from '../assets/logo-black.PNG'
import styled from 'styled-components'


const Header = () => {
    const history = useHistory()
    const { firebase } = useContext(FirebaseContext)
    const { user } = useContext(UserContext)

    // console.log('user', user);

    return (
        <Container>
            <Logo to={ROUTES.DASHBOARD}>
                <img src={logo} alt="logo" />
                <h2>CineParadis</h2>
            </Logo>

            <HeaderRight>
                <User>
                    <img src={user.photoURL} alt="user" />
                </User>

                <Logout>
                    {user ? (
                        <Button
                            onClick={() => {
                                firebase.auth().signOut()
                                history.push(ROUTES.LOGIN)
                            }}
                        >Logout</Button>
                    ) : (
                        <Link to={ROUTES.LOGIN}>
                            <Button type="button">Log In</Button>
                        </Link>
                    )}
                </Logout>
            </HeaderRight>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #fff;
    box-shadow: 2px 4px 6px rgba(0, 0, 0, .1);
    position: sticky;
    top: 0;
    left: 0;
    z-index: 100;
`

const Logo = styled(Link)`
    display: flex;
    align-items: center;

    img {
        height: 45px;
        margin-right: 5px;
    }
`

const HeaderRight = styled.div`
    display: flex;
    align-items: center;
`

const User = styled.div`
    margin-right: 10px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    overflow: hidden;

    img {
        width: 100%;
    }
`

const Logout = styled.div`
    ${Button} {
        margin: 0;
    }
`

export default Header
