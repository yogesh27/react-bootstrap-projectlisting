import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Jumbotron, Grid, Row, Col, Image, Button } from 'react-bootstrap';
import axios from 'axios';
import './AddProjects.css';
import StepZilla from 'react-stepzilla';
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'

class AddProjects extends Component {
	constructor(props) {
	    super(props);
	    this.state = {};

	    this.sampleStore = {
	      projectName: '',
	      floorArea: '',
	      savedToCloud: false
	    };
	  }

	componentDidMount() {}

	componentWillUnmount() {}

    getStore() {
        return this.sampleStore;
      }
    
    updateStore(update) {
      this.sampleStore = {
        ...this.sampleStore,
        ...update,
      }
    }

    render() {
        const steps =
            [
             {name: 'Project Details', component: <Step1 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
             {name: 'Owner Details', component: <Step2 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
             {name: 'Project Address', component: <Step3 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
             {name: 'Data Confirmation', component: <Step4 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
             {name: 'Confirmation', component: <Step5 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />}
           ]

        return (
        		<div className='container'>
                    <div className='step-progress'>
                    	<StepZilla steps={steps} hocValidationAppliedTo={[0,1,2]} nextTextOnFinalActionStep={"Save"}/>
                    </div>
                </div>
        );
    }
}

export default AddProjects;
