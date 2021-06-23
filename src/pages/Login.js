import React from 'react'
import { Button } from '../GlobalStyles'
import { firebase, provider } from '../lib/firebase'
import * as ROUTES from '../constants/routes'
import { useHistory } from 'react-router-dom'

const Login = () => {
    const history = useHistory()

    const HandleLogin = async () => {
        try {
            await firebase.auth().signInWithRedirect(provider)

            console.log("hshfgsdk");



            history.push(ROUTES.DASHBOARD)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Button onClick={HandleLogin}>Login</Button>
        </div>
    )
}

export default Login
