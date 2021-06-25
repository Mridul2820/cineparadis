import React, { useEffect } from 'react'
import styled from 'styled-components'

const NotFound = () => {
    useEffect(() => {
        document.title = 'Page not found'
    }, [])

    return (
        <NotFoundWrap>
            <h1>Not Found</h1>
        </NotFoundWrap>
    )
}

const NotFoundWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`

export default NotFound
