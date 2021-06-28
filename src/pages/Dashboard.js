import React, { useState, useContext, useEffect } from 'react'
import UserContext from '../context/user'
import { getUserWatchlist } from '../services/firebase'
import { PageTitle, Container, ContentList } from '../GlobalStyles'
import WatchItem from '../components/WatchItem'

const Dashboard = () => {
    const { user }  = useContext(UserContext)
    const [listWatch, setListWatch] = useState()

    useEffect(() => {
        async function getWatchlist(){
            const userId = user.uid
            const response = await getUserWatchlist(userId)

            setListWatch(response[0].watchlist)
        }

        getWatchlist()

        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        document.title = 'Dashboard - CineParadis'
    }, [])

    return (
        <Container>
            <PageTitle>Watchlist</PageTitle>
            {listWatch? listWatch.length > 0 ? (
                <ContentList>
                    {listWatch.map(listwt => (
                        <WatchItem 
                            key={listwt.id}
                            id={listwt.id} 
                            type={listwt.type} 
                        />
                    ))}
                </ContentList>
            ) : (
                <p>Empty Much? Start adding movies/series to your watchlist and they will appear here.</p>
            ) : (
                <p>Fetching Your list</p>
            )
            }
        </Container>
    )
}

export default Dashboard
