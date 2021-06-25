import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import * as ROUTES from '../constants/routes'

const Navbar = () => {
    return (
        <Navmain>
            <NavLink to={ROUTES.DASHBOARD}>
                Trending
            </NavLink>
            <NavLink to={ROUTES.Movies}>
                Movies
            </NavLink>
            <NavLink to={ROUTES.Series}>
                Series
            </NavLink>
            <NavLink to={ROUTES.Genres}>
                Genres
            </NavLink>
            <NavLink to={ROUTES.Search}>
                Search
            </NavLink>
        </Navmain>
    )
}

const Navmain = styled.nav`

`

export default Navbar
