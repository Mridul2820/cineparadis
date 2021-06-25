import React, { lazy, Suspense } from 'react'
import GlobalStyles from './GlobalStyles'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import * as ROUTES from './constants/routes'

import UserContext from './context/user'
import useAuthListner from './hooks/useAuthListner'
import IsUserLoggedIn from './helpers/IsUserLoggedIn'

import Header from './components/Header'
import Navbar from './components/Navbar'

const Login = lazy(() => import ('./pages/Login'))
const Dashboard = lazy(() => import ('./pages/Dashboard'))
const Trending = lazy(() => import ('./pages/topic/Trending'))
const Movies = lazy(() => import ('./pages/topic/Movies'))
const Series = lazy(() => import ('./pages/topic/Series'))
const Genres = lazy(() => import ('./pages/topic/Genres'))
const NotFound = lazy(() => import ('./pages/NotFound'))

const App = () => {
    const { user } = useAuthListner()
    // console.log('user', user);

    return (
        <UserContext.Provider value={{ user }}>
            <GlobalStyles />
            <Router>
                <Suspense fallback={<p>Loading...</p>} >
                    <Switch>
                        <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.LOGIN}>
                            <Login />
                        </IsUserLoggedIn>

                        {user ? (
                            <>
                            <Header />
                            <Navbar />
                
                            <Switch>
                                <Route path={ROUTES.DASHBOARD} component={Dashboard} exact />
                                <Route path={ROUTES.Trending} component={Trending} />
                                <Route path={ROUTES.Movies} component={Movies} />
                                <Route path={ROUTES.Series} component={Series} />
                                <Route path={ROUTES.Genres} component={Genres} />
                            </Switch>
                            </>
                        ) : <Redirect to={{ pathname: ROUTES.LOGIN }}/>
                        }

                        <Route component={NotFound} />
                    </Switch>
                </Suspense>
            </Router>
        </UserContext.Provider>
    )
}

export default App
