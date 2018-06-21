import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css'

class Header extends Component {
    render() {
        return (
            <Navbar default collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">USGBC</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem eventKey={1} componentClass={Link} href="/home" to="/home">
                            Home
                        </NavItem>
                        <NavItem eventKey={2} componentClass={Link} href="/projects" to="/projects">
                            Projects
                         </NavItem>
                        <NavItem eventKey={3} componentClass={Link} href="/add-project" to="/add-project">
                            Add Project
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header;
