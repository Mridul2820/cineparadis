import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button } from '../GlobalStyles'

import * as ROUTES from '../constants/routes'

import FirebaseContext from '../context/firebase'
import UserContext from '../context/user'

const Header = () => {
    const history = useHistory()
    const { firebase } = useContext(FirebaseContext)
    const { user } = useContext(UserContext)

    return (
        <div>
            header
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
        </div>
    )
}

export default Header
