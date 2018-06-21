import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { Jumbotron, Grid, Row, Col, Image, Button } from 'react-bootstrap';
import axios from 'axios';
import './AddProject.css';

class TextBox extends Component {
    render() {
        return (
            <input className='form-control'
                name={this.props.name}
                type='text'
                required
                value={this.props.value}
                onChange={this.props.onChange}
                placeholder={this.props.placeholder} />
        );
    }
}

class AddProject extends Component {

    state = {
        form:{
            "type": "",
            "title": "",
            "field_area": "",
            "field_owner_country": "",
            "field_owner_email": "",
            "field_owner_organization": "",
            "field_owner_type": "",
            "field_project_type": "",
            "field_rating_system": "",
            "field_space_type": "",
            "field_unit_type": "",
            "field_country": "",
            "field_address": "",
            "field_state": "",
            "field_city": "",
            "field_zip_code": ""
        }
    }

    onChange(event) {
        
        const form = Object.assign([], this.state.form);
        form[event.target.name] = event.target.value;
        
        
        this.setState({ form: form });
    }

    onSubmit(event) {
        event.preventDefault();

        var form_body = {
            "type": [{ "target_id": "arc_project" }],
            "title": [{ "value": this.state.form.title }],
            "field_area": [{ "value": this.state.form.field_area }],
            "field_owner_country": [{ "value": this.state.form.field_owner_country }],
            "field_owner_email": [{ "value": this.state.form.field_owner_email }],
            "field_owner_organization": [{ "value": this.state.form.field_owner_organization }],
            "field_owner_type": [{ "value": this.state.form.field_owner_type }],
            "field_project_type": [{ "value": this.state.form.field_project_type }],
            "field_rating_system": [{ "value": this.state.form.field_rating_system }],
            "field_space_type": [{ "value": this.state.form.field_space_type }],
            "field_unit_type": [{ "value": this.state.form.field_unit_type }],
            "field_country": [{ "value": this.state.form.field_country }],
            "field_address": [{ "value": this.state.form.field_address }],
            "field_state": [{ "value": this.state.form.field_state }],
            "field_city": [{ "value": this.state.form.field_city }],
            "field_zip_code": [{ "value": this.state.form.field_zip_code }]
        }

        //get csrf token
        axios
        .get(`http://dev-react-drupal8-app1.pantheonsite.io/session/token`)
        .then(res => {
            var csrf_token = res.data;
            var header = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic eWFzdGhhbmE6aW5pdHBhc3M=",
                    "X-CSRF-Token": csrf_token
                }
            }
    
            axios.post(`http://dev-react-drupal8-app1.pantheonsite.io/node?_format=json`, form_body, header)
            .then(res => {
                document.getElementById("arc-error-msg").style.display = "none";
                document.getElementById("arc-success-msg").style.display = "block";
                // setTimeout(function(){ 
                //     this.props.history.push('/projects');
                // }, 3000);
            })
            .catch(err => {
                console.log(err);
                document.getElementById("arc-error-msg").style.display = "block"; 
                this.setState({
                    loading: false,
                    error: err
                });
            });
        })
        .catch(err => {
            
        });       

    }

    render() {
        var self = this;
        return (
            <Fragment>
                <Grid className="content-wrapper">
                    <div id="myform">
                        <h1>Create Arc Project</h1>
                        <form onSubmit={this.onSubmit.bind(this)}>
                            <TextBox name='title'
                                value={this.state.form.title}
                                onChange={this.onChange.bind(this)} placeholder="Enter your Project Name" />
                            <TextBox name='field_area'
                                value={this.state.form.field_area} placeholder="Enter floor area"
                                onChange={this.onChange.bind(this)} />
                            <TextBox name='field_owner_country'
                                value={this.state.form.field_owner_country} placeholder="Enter Owner Country (as US)"
                                onChange={this.onChange.bind(this)} />
                            <TextBox name='field_owner_email'
                                value={this.state.form.field_owner_email} placeholder="Enter Owner Email"
                                onChange={this.onChange.bind(this)} />
                            <TextBox name='field_owner_organization'
                                value={this.state.form.field_owner_organization} placeholder="Enter Owner Organization (as USGBC)"
                                onChange={this.onChange.bind(this)} />
                            <TextBox name='field_owner_type'
                                value={this.state.form.field_owner_type} placeholder="Enter Owner Type (as Corporate)"
                                onChange={this.onChange.bind(this)} />
                            <TextBox name='field_project_type'
                                value={this.state.form.field_project_type} placeholder="Enter Project Type (as Buildings)"
                                onChange={this.onChange.bind(this)} />
                            <TextBox name='field_rating_system'
                                value={this.state.form.field_rating_system} placeholder="Enter Rating System (as LEED)"
                                onChange={this.onChange.bind(this)} />
                            <TextBox name='field_space_type'
                                value={this.state.form.field_space_type} placeholder="Enter Space Type (as Airport)"
                                onChange={this.onChange.bind(this)} />
                            <TextBox name='field_unit_type'
                                value={this.state.form.field_unit_type} placeholder="Enter Unit Type (as SI/IP)"
                                onChange={this.onChange.bind(this)} />
                            <TextBox name='field_country'
                                value={this.state.form.field_country} placeholder="Enter Country (as US)"
                                onChange={this.onChange.bind(this)} />   
                            <TextBox name='field_address'
                                value={this.state.form.field_address} placeholder="Enter Address"
                                onChange={this.onChange.bind(this)} />
                            <TextBox name='field_state'
                                value={this.state.form.field_state} placeholder="Enter State"
                                onChange={this.onChange.bind(this)} />
                            <TextBox name='field_city'
                                value={this.state.form.field_city} placeholder="Enter City"
                                onChange={this.onChange.bind(this)} />
                            <TextBox name='field_zip_code'
                                value={this.state.form.field_zip_code} placeholder="Enter Zip Code"
                                onChange={this.onChange.bind(this)} />

                            <button className='btn btn-success'
                                type='submit' id="create-project-btn">Create Project</button>
                            
                            <div className="alert alert-success" id="arc-success-msg">
                                <strong>Congratulations!</strong> You Project has been created.
                            </div>

                            <div className="alert alert-danger" id="arc-error-msg">
                                <strong>Error!</strong> Please check your data.
                            </div>
                            
                        </form>
                    </div>
                </Grid>
            </Fragment>
        );
    }
}

export default AddProject;
