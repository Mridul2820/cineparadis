import React, { useEffect } from 'react'
import Header from '../components/Header'

const Dashboard = () => {
    useEffect(() => {
        document.title = 'Dashboard - MovieBuff'
    }, [])

    return (
        <div>
            <Header />
        </div>
    )
}

export default Dashboard
