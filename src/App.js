import React, { lazy, Suspense } from 'react';
import Loader from 'react-loader-spinner';
import DocumentMeta from 'react-document-meta';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';

import UserContext from './context/user';
import useAuthListner from './hooks/useAuthListner';
import IsUserLoggedIn from './helpers/IsUserLoggedIn';

import Header from './components/nav/Header';
import Navbar from './components/nav/Navbar';
import Footer from './components/footer/Footer';
import ScrollTop from './components/widget/ScrollTop';
import { ogDefault, ogImage, twitterData } from './constants/constant';

const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Trending = lazy(() => import('./pages/topic/Trending'));
const Genres = lazy(() => import('./pages/topic/Genres'));
const Search = lazy(() => import('./pages/topic/Search'));

// Movies
const DiscoverMovies = lazy(() => import('./pages/movies/DiscoverMovies'));
const MoviesInTheatre = lazy(() => import('./pages/movies/MoviesInTheatre'));
const MoviesPopular = lazy(() => import('./pages/movies/MoviesPopular'));
const MoviesTopRated = lazy(() => import('./pages/movies/MoviesTopRated'));
const MoviesUpcoming = lazy(() => import('./pages/movies/MoviesUpcoming'));

// Series
const DiscoverSeries = lazy(() => import('./pages/series/DiscoverSeries'));
const SeriesPopular = lazy(() => import('./pages/series/SeriesPopular'));
const SeriesTopRated = lazy(() => import('./pages/series/SeriesTopRated'));
const SeriesUpcoming = lazy(() => import('./pages/series/SeriesUpcoming'));

const ChatPage = lazy(() => import('./pages/ChatPage'));
const DetailsPage = lazy(() => import('./pages/withid/DetailsPage'));
const GenreDetail = lazy(() => import('./pages/withid/GenreDetail'));
const PersonDetail = lazy(() => import('./pages/withid/PersonDetail'));

const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => {
  const { user } = useAuthListner();

  const meta = {
    title: `CineParadis`,
    description: `CineParadis`,
    meta: {
      name: {
        ...twitterData,
      },
      property: {
        ...ogDefault,
        'og:image': ogImage,
        'og:title': `CineParadis`,
        'og:description': ` CineParadis`,
      },
    },
  };

  return (
    <UserContext.Provider value={{ user }}>
      <DocumentMeta {...meta}>
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
                loggedInPath={ROUTES.Trending}
                path={ROUTES.LOGIN}
              >
                <Login />
              </IsUserLoggedIn>

              <>
                <Header />
                <Navbar />

                <Switch>
                  <Route path={ROUTES.DASHBOARD} component={Dashboard} exact />
                  <Route path={ROUTES.Trending} component={Trending} exact />
                  <Route path={ROUTES.ROOT} component={Trending} exact />
                  <Route path={ROUTES.Genres} component={Genres} exact />

                  {/* Movies */}
                  <Route
                    path={ROUTES.Movies_Discover}
                    component={DiscoverMovies}
                    exact
                  />
                  <Route
                    path={ROUTES.Movies_In_Theatre}
                    component={MoviesInTheatre}
                    exact
                  />
                  <Route
                    path={ROUTES.Movies_Popular}
                    component={MoviesPopular}
                    exact
                  />
                  <Route
                    path={ROUTES.Movies_Top_Rated}
                    component={MoviesTopRated}
                    exact
                  />
                  <Route
                    path={ROUTES.Movies_Upcoming}
                    component={MoviesUpcoming}
                    exact
                  />

                  {/* Series */}
                  <Route
                    path={ROUTES.Series_Discover}
                    component={DiscoverSeries}
                    exact
                  />
                  <Route
                    path={ROUTES.Series_Popular}
                    component={SeriesPopular}
                    exact
                  />
                  <Route
                    path={ROUTES.Series_Top_Rated}
                    component={SeriesTopRated}
                    exact
                  />
                  <Route
                    path={ROUTES.Series_Upcoming}
                    component={SeriesUpcoming}
                    exact
                  />

                  <Route path={ROUTES.Person_Detail} component={PersonDetail} />

                  <Route path={ROUTES.Genre_Detail} component={GenreDetail} />

                  <Route path={ROUTES.Details} component={DetailsPage} />

                  <Route path={ROUTES.Search} component={Search} />

                  <Route path={ROUTES.Chats} component={ChatPage} />
                </Switch>
                <ScrollTop />
                <Footer />
              </>

              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </Router>
      </DocumentMeta>
    </UserContext.Provider>
  );
};

export default App;
