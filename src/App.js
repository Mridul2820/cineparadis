import React, { lazy, Suspense } from 'react'
import GlobalStyles from './GlobalStyles'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import * as ROUTES from './constants/routes'

const Login = lazy(() => import ('./pages/Login'))
const Dashboard = lazy(() => import ('./pages/Dashboard'))


const App = () => {
    return (
        <div>
            <GlobalStyles />
            <Router>
                <Suspense fallback={<p>Loading...</p>} >
                    <Switch>
                        <Route path={ROUTES.LOGIN} component={Login} />
                        <Route path={ROUTES.DASHBOARD} component={Dashboard} />
                    </Switch>
                </Suspense>
            </Router>
        </div>
    )
}

export default App
