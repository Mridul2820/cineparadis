import React from 'react'
import styled from 'styled-components'
import SingleRecomand from '../singles/SingleRecomand'
import { PageTitle } from '../../GlobalStyles'

const Recommended = ({ recommended }) => {
    return (
        <Container>
            <PageTitle>Recommended for you</PageTitle>
            <Wrap>
            {recommended.slice(0,9).map(recom => (
                <SingleRecomand
                    key={recom.id} 
                    id={recom.id} 
                    poster={recom.backdrop_path} 
                    title={recom.title || recom.name} 
                    date={recom.release_date || recom.first_air_date} 
                    media_type={recom.media_type}
                    vote_average={recom.vote_average}
                    description={recom.overview}
                />
            ))}
            </Wrap>
        </Container>
    )
}

const Container = styled.div`
    border-top: 1px solid #000;

    ${PageTitle} {
        font-size: 20px;
        padding-top: 10px;
        margin-bottom: 10px;
    }
`

const Wrap = styled.div`
    max-width: 300px;
    display: flex;
    flex-direction: column;
`

export default Recommended
