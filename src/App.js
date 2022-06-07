import React, { lazy, Suspense } from 'react';
import DocumentMeta from 'react-document-meta';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';

import UserContext from './context/user';
import useAuthListner from './hooks/useAuthListner';
import IsUserLoggedIn from './helpers/IsUserLoggedIn';

import { ogDefault, ogImage, twitterData } from './constants/constant';
import LoaderCustom from './components/loaders/LoaderCustom';

import Header from './components/nav/Header';
import Navbar from './components/nav/Navbar';
import Footer from './components/footer/Footer';
import ScrollTop from './components/widget/ScrollTop';
import { ToastContainer } from 'react-toastify';

const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Trending = lazy(() => import('./pages/topic/Trending'));
const Genres = lazy(() => import('./pages/topic/Genres'));

// Search
const MovieTVSearch = lazy(() => import('./pages/search/MovieTVSearch'));
const PersonSearch = lazy(() => import('./pages/search/PersonSearch'));

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
const PopularPersons = lazy(() => import('./pages/topic/Persons'));

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
        <ToastContainer />
        <Router>
          <Suspense fallback={<LoaderCustom />}>
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

                  <Route
                    path={ROUTES.Popular_Persons}
                    component={PopularPersons}
                  />

                  <Route path={ROUTES.Genre_Detail} component={GenreDetail} />
                  <Route path={ROUTES.Details} component={DetailsPage} />

                  <Route path={ROUTES.Search} component={MovieTVSearch} />
                  <Route path={ROUTES.Perosn_Search} component={PersonSearch} />

                  <Route path={ROUTES.Chats} component={ChatPage} />

                  <Route component={NotFound} />
                </Switch>
                <ScrollTop />
                <Footer />
              </>
            </Switch>
          </Suspense>
        </Router>
      </DocumentMeta>
    </UserContext.Provider>
  );
};

export default App;
