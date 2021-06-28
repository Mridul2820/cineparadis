import { useState, useEffect } from 'react'
import axios from 'axios';

import { Button, createMuiTheme, Tabs, Tab, TextField, ThemeProvider } from '@material-ui/core'
import { AiOutlineSearch } from 'react-icons/ai'
import { Container, ContentList } from '../../GlobalStyles'

import SingleContent from '../../components/singles/SingleContent';
import CustomPagination from '../../components/CustomPagination';

import styled from 'styled-components'

const searchURL = 'https://api.themoviedb.org/3/search/'
const apiKey = `api_key=${process.env.REACT_APP_TMDB}`

const Search = () => {
    const [type, setType] = useState(0)
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState('')
    const [contents, setContents] = useState([])
    const [numOfPages, setNumOfPages] = useState()

    const darkTheme = createMuiTheme({
        palette: {
            type: "light",
            primary: {
                main: "#000",
            },
        },
    });

    const handleChange = (event, newValue) => {
        setType(newValue);
        setPage(1)
    };

    const fetchSearch = async () => {
        const {data} = await axios.get(`${searchURL}${type ? 'tv' : 'movie'}?${apiKey}&language=en-US&query=${searchText}&page=${page}`)

        setContents(data.results)
        setNumOfPages(data.total_pages)
    }

    useEffect(() => {
        window.scroll(0, 0)
        if(searchText){
            fetchSearch()
        }
        
        // eslint-disable-next-line
    }, [page, type])

    useEffect(() => {
        document.title = 'Search - CineParadis'
    }, [])

    return (
        <Container>
            <ThemeProvider theme={darkTheme}>
                <SearchBox>
                    <SearchMain>
                        <TextField
                            className="searchbox"
                            label="Search"
                            variant="filled"
                            onChange={e => setSearchText(e.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    fetchSearch();
                                }
                            }}
                        />
                        <Button 
                            className="search-btn"
                            variant='contained'
                            onClick={fetchSearch}
                        >
                            <AiOutlineSearch size="20px" />
                        </Button>
                    </SearchMain>

                    <Tabs 
                        value={type} 
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange} 
                        className="tabs"
                        aria-label="disabled tabs example"
                    >
                        <Tab style={{ width: "50%" }} label="Search Movies" />
                        <Tab style={{ width: "50%" }} label="Search TV Series" />
                    </Tabs>
                </SearchBox>
            </ThemeProvider>
            <ContentList>
                {contents && contents.map(content => (
                    <SingleContent 
                        key={content.id} 
                        id={content.id} 
                        poster={content.backdrop_path} 
                        title={content.title || content.name} 
                        date={content.release_date || content.first_air_date} 
                        media_type={type ? "tv" : "movie"}
                        vote_average={content.vote_average}
                        description={content.overview}
                        showWatch={true}
                    />
                ))}
                {searchText && !contents && 
                    <h2>Try searching something else</h2>
                }
            </ContentList>
            {numOfPages > 1 && 
                <CustomPagination 
                setPage={setPage} 
                numOfPages={numOfPages} 
            />}
        </Container>
    )
}

const SearchBox = styled.div`
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`

const SearchMain = styled.div`
    margin-right: 50px;

    .search-btn {
        padding: 17px 12px;
        margin-left: 5px;
    }
`

export default Search
