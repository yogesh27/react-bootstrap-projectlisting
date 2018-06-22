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
                        <NavItem eventKey={2} componentClass={Link} href="/projects" to="/projects">
                            Projects
                         </NavItem>
                        <NavItem eventKey={3} componentClass={Link} href="/add-project" to="/add-project">
                            Add Project
                        </NavItem>
                        <NavItem eventKey={3} componentClass={Link} href="/add-projects" to="/add-projects">
                            Add Project (multi-step)
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header;
