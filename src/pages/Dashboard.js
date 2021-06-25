import React, { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import * as ROUTES from '../constants/routes'

import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Movies from './Movies'
import Trending from './Trending'

const Dashboard = () => {
    useEffect(() => {
        document.title = 'Dashboard - MovieBuff'
    }, [])

    return (
        <div>
            <Header />
            <Navbar />

            <Router>
                <Suspense fallback={<p>Loading...</p>} >
                    <Switch>
                        {/* <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.LOGIN}>
                            <Login />
                        </IsUserLoggedIn> */}

                        {/* <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
                            <Dashboard />
                        </ProtectedRoute> */}

                        <Route path={ROUTES.DASHBOARD} component={Trending} />
                        <Route path={ROUTES.Movies} component={Movies} />
                    </Switch>
                </Suspense>
            </Router>
        </div>
    )
}

export default Dashboard
