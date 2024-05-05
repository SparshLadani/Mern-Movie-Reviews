import React, {useEffect} from 'react';
import { Switch, BrowserRouter ,Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AddReview from "./components/add-review";
import MoviesList from "./components/movies-list";
import Movie from "./components/movie";
import Login from "./components/login";

function App() {
  const [user, setUser] = React.useState(null)

  async function login(user=null){
    setUser(user)
  }

  async function logout(){
    setUser(null)
  }

  useEffect(() => {
    document.title = 'Movie Reviews';
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary" style={{height: '3rem'}}>
          <Container>
            <Navbar.Brand href="/">Movie Review</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link>
                  <Link to={"/movies"}>Movies</Link>
                </Nav.Link>
                <Nav.Link>
                  {user ? (
                    <a onClick={logout}>Logout User</a>
                  ) : (
                      <Link to={"/login"}>Login</Link>
                    )}
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div style={{marginTop: '2rem'}}>
          <Switch>
            <Route exact path={["/", "/movies"]} component={MoviesList}>
            </Route>
            <Route path="/movies/:id/review" render={(props)=>
            <AddReview {...props} user={user} />
            }>
            </Route>
            <Route path="/movies/:id/" render={(props)=>
            <Movie {...props} user={user} />
            }>
            </Route>
            <Route path="/login" render={(props)=>
            <Login {...props} login={login} />
            }>
            </Route>
          </Switch>
        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
