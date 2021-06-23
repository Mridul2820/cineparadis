import React, { lazy, Suspense } from 'react'
import GlobalStyles from './GlobalStyles'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import * as ROUTES from './constants/routes'
import UserContext from './context/user'
import useAuthListner from './hooks/useAuthListner'

import ProtectedRoute from './helpers/ProtectedRoute'
import IsUserLoggedIn from './helpers/IsUserLoggedIn'

const Login = lazy(() => import ('./pages/Login'))
const Dashboard = lazy(() => import ('./pages/Dashboard'))

const App = () => {
    const { user } = useAuthListner()
    console.log('user', user);
    return (
        <UserContext.Provider value={{ user }}>
            <GlobalStyles />
            <Router>
                <Suspense fallback={<p>Loading...</p>} >
                    <Switch>
                        <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.LOGIN}>
                            <Login />
                        </IsUserLoggedIn>
                        <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
                            <Dashboard />
                        </ProtectedRoute>
                    </Switch>
                </Suspense>
            </Router>
        </UserContext.Provider>
    )
}

export default App
