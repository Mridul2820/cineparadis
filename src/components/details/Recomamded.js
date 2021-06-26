import React from 'react'
import styled from 'styled-components'
import SingleContent from '../SingleContent'
import { PageTitle } from '../../GlobalStyles'

const Recomamded = ({ recomamded }) => {
    return (
        <Container>
            <PageTitle>Recomamded for you</PageTitle>
            <Wrap>
                {recomamded.slice(0,9).map(recom => (
                    <SingleContent
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
`

const Wrap = styled.div`
    max-width: 300px;
    display: flex;
    flex-direction: column;

    > a {
        margin: 0 0 20px 0;
    }
`

export default Recomamded
