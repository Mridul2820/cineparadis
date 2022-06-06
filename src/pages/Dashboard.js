import React, { useState, useContext, useEffect } from 'react';
import DocumentMeta from 'react-document-meta';
import { v4 as uuidv4 } from 'uuid';
import UserContext from '../context/user';
import { getUserWatchlist } from '../services/firebase';
import { PageTitle, Container, ContentList } from '../styles/Styles';
import WatchItem from '../components/cards/WatchItem';

import { Redirect } from 'react-router-dom';
import { LOGIN } from '../constants/routes';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [listWatch, setListWatch] = useState();

  useEffect(() => {
    async function getWatchlist() {
      const userId = user?.uid;
      const response = await getUserWatchlist(userId);
      setListWatch(response[0].watchlist);
    }

    if (user) {
      getWatchlist();
    }
    // eslint-disable-next-line
  }, [user?.uid]);

  const meta = {
    title: `Dashboard - CineParadis`,
  };

  if (!user) {
    return <Redirect to={LOGIN} />;
  }

  return (
    <DocumentMeta {...meta} extend>
      <Container>
        <PageTitle>Watchlist</PageTitle>
        {listWatch ? (
          listWatch.length > 0 ? (
            <ContentList>
              {listWatch.map((listwt) => (
                <WatchItem key={uuidv4()} id={listwt.id} type={listwt.type} />
              ))}
            </ContentList>
          ) : (
            <p className="text-center font-semibold">
              Empty Much? Start adding movies/series to your watchlist and they
              will appear here.
            </p>
          )
        ) : (
          <p className="text-center font-semibold">
            Fetching Your Watchlist...
          </p>
        )}
      </Container>
    </DocumentMeta>
  );
};

export default Dashboard;
