import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Navbar, Nav, NavDropdown} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import logo from '../assets/img/logo-transparent.png'
import { logout } from '../actions/userActions'

const Header = () => {
    const dispatch = useDispatch()
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin 

    const logoutHandler = () => {
        dispatch(logout())
    }
    
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                     <LinkContainer to="/">
                        <Navbar.Brand>
                            <img src={logo} alt="planet succulent logo" style={{ width: '25px', position: 'relative', marginRight: '5px', top: '-5px'}} />
                            Planet Succulent
                        </Navbar.Brand>
                     </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">

                        <LinkContainer to="/cart">
                            <Nav.Link>
                                <FaShoppingCart />
                                Cart
                            </Nav.Link>
                        </LinkContainer>
                        {userInfo ? 
                        (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>
                                        Profile
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : 
                        (
                            <LinkContainer to="/login">
                                <Nav.Link>
                                    <FaUser />
                                    Sign In
                                </Nav.Link>
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
