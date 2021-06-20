import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, Row, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { logout } from '../actions/userActions'


function Header(props) {

    console.log(props,'props')
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
        
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    {userInfo && <LinkContainer to='/home'>
                        <Navbar.Brand>Digikull</Navbar.Brand>
                    </LinkContainer>}

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                   
                        <Nav className="ml-auto">

                            {userInfo &&  userInfo.isAdmin && (
                                <LinkContainer to='/createbatch'>
                                <Nav.Link >Create Batch</Nav.Link>
                            </LinkContainer>
                            )}
                            
                            {userInfo &&  !userInfo.isAdmin && (
                                <LinkContainer to='/uploadgrade'>
                                <Nav.Link >Upload Grades</Nav.Link>
                            </LinkContainer>
                            )}

                              {userInfo &&  !userInfo.isAdmin && (
                                <LinkContainer to='/attendence'>
                                <Nav.Link >Upload Attendence</Nav.Link>
                            </LinkContainer>
                            )}



                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>

                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                                </NavDropdown>
                            ) : (
                                    <LinkContainer to='/'>
                                        <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                                    </LinkContainer>
                                )}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header