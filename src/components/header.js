import PropTypes from "prop-types"
import React from "react"
import {Navbar, Nav, Container} from 'react-bootstrap';
import {Link} from 'gatsby'

const Header = ({siteTitle}) => (
    <header className="bg-dark">
        <Container>
            <Navbar expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">{siteTitle}</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarResponsive" />
                <Navbar.Collapse id="navbarResponsive">
                    <Nav as="ul" className="ms-auto">
                        
                        <Nav.Item as="li">
                            <Link to="/blog" className="nav-link" activeClassName="active">Blog</Link>
                           
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    </header>
)

export default Header