import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css'

class Footer extends Component {
    render() {
        return (
            <Grid fluid={true} className="footer">
                <Row className="show-grid text-center copyright">
                    <Col xs={12} sm={12}>
                    © 2018 U.S. Green Building Council 
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default Footer;
