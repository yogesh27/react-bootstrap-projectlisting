import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { Jumbotron, Grid, Row, Col, Image, Button } from 'react-bootstrap';
import axios from 'axios';
import './Projects.css';

class Projects extends Component {
    state = {
        projects: [],
        loading: true,
        error: null,
        isNextDisabled: false,
        isBackDisabled: true,
        currentPage:0
    }

    getProjects(page){
        axios
        .get('http://dev-react-drupal8-app1.pantheonsite.io/api/v1/arcprojects/?page='+page+'&_format=json')
        .then(res => {
            const projects = res.data;
            this.setState({
                projects,
                loading: false,
                error: null,
                currentPage: page,
                isNextDisabled: (projects.length < 15) ? true:false,
                isBackDisabled: (page==0)?true:false
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
        let page = this.state.currentPage;
        this.getProjects(page);
    }   

    navigatePage(direction){
        let page = this.state.currentPage + 1 ;
        if(direction=='back')
            page = this.state.currentPage - 1 ;        
        this.getProjects(page);
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

    renderProjects() {
        const projects = this.state.projects;
        const error = this.state.error;

        if (error) {
            return this.renderError();
        }        
        
        return (
            <Fragment>
                {projects.map(project =>
                    <Col xs={12} sm={6} md={3} 
                    key = {project.nid} 
                    onClick={this.getProjectDetails.bind(this, project.nid)} className="projectItem--wrapper">
                        <div className="projectItem">
                            <p className="projectItem--title">{project.title}</p>
                            <p className="projectItem--country">{project.field_country}</p>                        
                        </div>
                    </Col>
                )}
            </Fragment>
        );
    }

    getProjectDetails = (nid,event) => {
        this.props.history.push('/project/'+nid);
    }

    render() {
        const loading = this.state.loading;
        return (
        <Fragment>
            <Grid className="content-wrapper">
                <h3>My Projects</h3>
                <Row className="show-grid text-center">
                    {loading ? this.renderLoading() : this.renderProjects()}
                </Row>
                <Row className="pagination-wrapper">
                    <Col xs={12} sm={12} md={12} >
                        <Button className="pagination-btn__back" 
                            onClick={this.navigatePage.bind(this, 'back')} disabled={this.state.isBackDisabled}>&lt; Back</Button>
                        <Button className="pagination-btn__next" 
                            onClick={this.navigatePage.bind(this, 'next')} disabled={this.state.isNextDisabled}>Next &gt;</Button>
                    </Col>
                </Row>
            </Grid>
            
        </Fragment>
        )
    }
}

export default Projects;
