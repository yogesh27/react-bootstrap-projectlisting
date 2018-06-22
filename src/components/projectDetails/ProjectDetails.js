import React, { Component, Fragment } from 'react'
import { Jumbotron, Grid, Row, Col, Image, Button } from 'react-bootstrap';
import { BrowserRouter, Redirect  } from "react-router-dom";
import axios from 'axios';
import './ProjectDetails.css';

class ProjectDetails extends Component {
    state = {
        projectDetails: [
            {
                "title": "",
                "nid": "",
                "field_project_type": "",
                "field_country": "",
                "field_unit_type": "",
                "field_address": "",
                "field_area": "",
                "field_city": "",
                "field_owner_country": "",
                "field_owner_email": "",
                "field_owner_organization": "",
                "field_owner_type": "",
                "field_rating_system": "",
                "field_space_type": "",
                "field_state": "",
                "field_zip_code": ""
            }
        ],
        loading: true,
        error: null
    }

    getProjectDetails(nid){
        axios
        .get('http://dev-react-drupal8-app1.pantheonsite.io/api/v1/arcprojects/'+nid+'/?_format=json')
        .then(res => {
            const data = res.data[0];
            this.setState({
                projectDetails:{
                    "title": data.title,
                    "nid": data.nid,
                    "field_project_type": data.field_project_type,
                    "field_country": data.field_country,
                    "field_unit_type": data.field_unit_type,
                    "field_address": data.field_address,
                    "field_area": data.field_area,
                    "field_city": data.field_city,
                    "field_owner_country": data.field_owner_country,
                    "field_owner_email": data.field_owner_email,
                    "field_owner_organization": data.field_owner_organization,
                    "field_owner_type": data.field_owner_type,
                    "field_rating_system": data.field_rating_system,
                    "field_space_type": data.field_space_type,
                    "field_state": data.field_state,
                    "field_zip_code": data.field_zip_code
                },
                loading: false,
                error: null
            });
        })
        .catch(err => {
            this.setState({
                loading: false,
                error: err
            });
        });
    }

    componentDidMount() {
        this.getProjectDetails(this.props.match.params.nid);
    }

    renderLoading() {
        return <div>Loading...</div>;
    }

    renderError() {
        return (
            <div>
                Something went wrong: {this.state.error.message}
            </div>
        );
    }

    renderProjectDetails() {
        const data = this.state.projectDetails;
        const error = this.state.error;
        if (error) {
            return this.renderError();
        }
        return (
            <Fragment>
                <div>
                    <p><span className="detailsLabel"><b>Title:</b></span>{data.title}</p>
                    <p><span className="detailsLabel"><b>Country:</b></span>{data.field_country}</p>  
                    <p><span className="detailsLabel"><b>Node Id: </b></span>{data.nid}</p> 
                    <p><span className="detailsLabel"><b>Unit Type: </b></span>{data.field_unit_type}</p>
                    <p><span className="detailsLabel"><b>Address: </b></span>{data.field_address}</p>
                    <p><span className="detailsLabel"><b>Area: </b></span>{data.field_area}</p>
                    <p><span className="detailsLabel"><b>City: </b></span>{data.field_city}</p>
                    <p><span className="detailsLabel"><b>Owner Country: </b></span>{data.field_owner_country}</p>
                    <p><span className="detailsLabel"><b>Owner Email: </b></span>{data.field_owner_email}</p>
                    <p><span className="detailsLabel"><b>Owner Organization: </b></span>{data.field_owner_organization}</p>
                    <p><span className="detailsLabel"><b>Owner Type: </b></span>{data.field_owner_type}</p>
                    <p><span className="detailsLabel"><b>Rating System: </b></span>{data.field_rating_system}</p>
                    <p><span className="detailsLabel"><b>Space Type: </b></span>{data.field_space_type}</p>
                    <p><span className="detailsLabel"><b>State: </b></span>{data.field_state}</p>
                    <p><span className="detailsLabel"><b>Zip Code: </b></span>{data.field_zip_code}</p>
                </div>
            </Fragment>
        );
    }

    render() {
        const loading = this.state.loading;
        return (
            <Grid className="content-wrapper">
                <Row className="show-grid">
                    <h3>Project Details</h3>
                    {loading ? this.renderLoading() : this.renderProjectDetails()}
                </Row>
            </Grid>
        )
    }
}

export default ProjectDetails;