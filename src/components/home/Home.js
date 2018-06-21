import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Jumbotron, Grid, Row, Col, Image, Button } from 'react-bootstrap';
import './Home.css';

class Home extends Component {
    render() {
        return (
            <Grid className="content-wrapper">
                <Jumbotron>
                    <h2>Welcome to USGBC</h2>
                    <p>The U.S. Green Building Council is committed to a sustainable, prosperous future through LEED, the leading program for green buildings and communities worldwide.</p>
                    <a href="https://new.usgbc.org/" target="_blank">
                        <Button bsStyle="primary">Learn More</Button>
                    </a>
                </Jumbotron>
                <Row className="show-grid text-center">
                    <Col xs={12} sm={6} md={3} className="logo-grid">
                        <a href="https://www.usgbc.org/resources/grid/leed" target="_blank">
                            <Image src="assets/leed-logo.png" className="logo_w220_h220_px" />
                        </a>
                    </Col>
                    <Col xs={12} sm={6} md={3} className="logo-grid">
                        <a href="https://www.usgbc.org/resources/grid/credentialing" target="_blank">
                            <Image src="assets/credentialing-logo.png" className="logo_w220_h220_px" />
                        </a>
                    </Col>
                    <Col xs={12} sm={6} md={3} className="logo-grid">
                        <a href="https://www.usgbc.org/resources/grid/advocacy-policy" target="_blank">
                            <Image src="assets/advocacy-policy-logo.png" className="logo_w220_h220_px" />
                        </a>
                    </Col>
                    <Col xs={12} sm={6} md={3} className="logo-grid">
                        <a href="https://www.usgbc.org/resources/grid/leed" target="_blank">
                            <Image src="assets/leed-logo.png" className="logo_w220_h220_px" />
                        </a>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default Home;
