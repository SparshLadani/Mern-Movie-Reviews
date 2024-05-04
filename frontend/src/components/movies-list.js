import React, {useState, useEffect } from 'react'
import MovieDataService from "../services/movies"
import { Link } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const MoviesList= props => { 
  
  const [movies, setMovies] = useState([])
  const [searchTitle, setSearchTitle] = useState("")
  const [searchRating, setSearchRating] = useState("")
  const [ratings, setRatings] = useState(["All Ratings"])

  const [currentPage, setCurrentPage] = useState(0)
  const [entriesPerPage, setEntriesPerPage] = useState(0)
  const [currentSearchMode, setCurrentSearchMode] = useState("")

  useEffect(() =>{
    setCurrentPage(0)
  }, [currentSearchMode])
  
  useEffect(() =>{ 
    retrieveMovies()
    retrieveRatings()
  },[])

  useEffect(() =>{
    retrieveNextPage()
  }, [currentPage])

  const retrieveNextPage = () => {
    if(currentSearchMode === "findByTitle")
    {
        findByTitle()
    }

    else if(currentSearchMode === "findByRating")
    {
        findByRating()
    }
    else{
        retrieveMovies()
    }
  }

  const retrieveMovies = () =>{
    MovieDataService.getAll(currentPage)
      .then(response =>{
        console.log(response.data)
        setMovies(response.data.movies) 
        setCurrentPage(response.data.page)
        setEntriesPerPage(response.data.entries_per_page)
      })
      .catch( e =>{
        console.log(e)
      })
  }

  const retrieveRatings = () =>{
    MovieDataService.getRatings()
      .then(response =>{
        console.log(response.data)
        setRatings(["All Ratings"].concat(response.data)) 
      })
      .catch( e =>{
        console.log(e)
      })
  }  

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value
    setSearchTitle(searchTitle);
  }

  const onChangeSearchRating = e => {
    const searchRating = e.target.value
    setSearchRating(searchRating);
  }  

  

  const find =(query, by) =>{
    MovieDataService.find(query,by, currentPage)
      .then(response =>{
        console.log(response.data)
        setMovies(response.data.movies)
      })
      .catch(e =>{
        console.log(e)
      })
  }
// find function sypported by below two methods
  const findByTitle = () => {
    find(searchTitle, "title")    
  }
  const findByRating = () => {
    if(searchRating === "All Ratings"){
      retrieveMovies()
    }
    else{
      find(searchRating, "rated")
    }
  }  
        
    
    return(
        <div className="App">
            <Container>
                <Form>
                <Row style={{height: '6.8rem'}}>
                    <Col>
                        <Form.Group>
                          <Form.Control type="text" placeholder="Search by title" value={searchTitle} onChange={onChangeSearchTitle}/>
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={findByTitle}>
                        Search
                        </Button>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Control
                                as="select" onChange={onChangeSearchRating} >
                            {ratings.map(rating =>{
                                return(
                                    <option value={rating}>{rating}</option>
                                )
                            })}
                            </Form.Control>
                        </Form.Group>
                    <Button variant="primary" type="button" onClick={findByRating}>
                    Search</Button>
                    </Col>
                </Row>
                </Form>
                <Row>
                    {movies.map((movie) => (
                            <Col key={movie._id}>
                                <Card style={{ width: '18rem', marginTop: '2rem'}}>
                                    <Card.Img src={movie.poster + "/100px180"} />
                                    <Card.Body>
                                        <Card.Text>
                                            Rating: {movie.rated}
                                        </Card.Text>
                                        <Card.Text>{movie.plot}</Card.Text>
                                        <Link to={"/movies/" + movie._id}>View Review</Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                </Row>
                <br/>
                <Button
                    color='primary'
                    style={{margin: '2rem'}}
                    onClick={() => {if(currentPage > 0) setCurrentPage(currentPage - 1)}}
                >
                    Get Previous Page results
                </Button>
                Current Page: {currentPage + 1}
                <Button
                    color='primary'
                    style={{margin: '2rem'}}
                    onClick={() => {setCurrentPage(currentPage + 1)}}
                >
                    Get Next Page results
                </Button>
            </Container>
        </div>
    )
}

export default MoviesList;