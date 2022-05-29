import React, { lazy, Suspense } from 'react';
import Loader from 'react-loader-spinner';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import * as ROUTES from './constants/routes';

import UserContext from './context/user';
import useAuthListner from './hooks/useAuthListner';
import IsUserLoggedIn from './helpers/IsUserLoggedIn';

import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Trending = lazy(() => import('./pages/topic/Trending'));
const DiscoverMovies = lazy(() => import('./pages/movies/DiscoverMovies'));
const DiscoverSeries = lazy(() => import('./pages/series/DiscoverSeries'));
// const TopRated = lazy(() => import('./pages/topic/TopRated'));
const Genres = lazy(() => import('./pages/topic/Genres'));
const Search = lazy(() => import('./pages/topic/Search'));

const ChatPage = lazy(() => import('./pages/ChatPage'));

const DetailsPage = lazy(() => import('./pages/withid/DetailsPage'));
const GenrePage = lazy(() => import('./pages/withid/GenrePage'));

const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => {
  const { user } = useAuthListner();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense
          fallback={
            <div className="flex flex-col justify-center items-center w-full min-h-screen">
              <Loader
                type="Circles"
                color="#00BFFF"
                height={50}
                width={200}
                className="m-5"
              />
            </div>
          }
        >
          <Switch>
            <IsUserLoggedIn
              user={user}
              loggedInPath={ROUTES.DASHBOARD}
              path={ROUTES.LOGIN}
            >
              <Login />
            </IsUserLoggedIn>

            {user ? (
              <>
                <Header />
                <Navbar />

                <Switch>
                  <Route path={ROUTES.DASHBOARD} component={Dashboard} exact />
                  <Route path={ROUTES.Trending} component={Trending} />
                  <Route path={ROUTES.Genres} component={Genres} exact />

                  {/* Movies */}
                  <Route
                    path={ROUTES.MoviesDiscover}
                    component={DiscoverMovies}
                    exact
                  />

                  {/* Series */}
                  <Route
                    path={ROUTES.SeriesDiscover}
                    component={DiscoverSeries}
                    exact
                  />

                  <Route path={ROUTES.Search} component={Search} />

                  <Route path={ROUTES.Chats} component={ChatPage} />

                  <Route path={ROUTES.GenreID} component={GenrePage} />

                  <Route path={ROUTES.Details} component={DetailsPage} />
                </Switch>
                <Footer />
              </>
            ) : (
              <Redirect to={{ pathname: ROUTES.LOGIN }} />
            )}

            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
