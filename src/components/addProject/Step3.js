'use strict';

import React, { Component } from 'react';

export default class Step3 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: props.getStore().email,
            name: props.getStore().name,
            floorArea: props.getStore().floorArea,
            projectType: props.getStore().projectType
        };

        this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms

        this.validationCheck = this.validationCheck.bind(this);
        this.isValidated = this.isValidated.bind(this);
    }

    componentDidMount() { }

    componentWillUnmount() { }

    isValidated() {
        const userInput = this._grabUserInput(); // grab user entered vals
        const validateNewInput = this._validateData(userInput); // run the new input against the validator
        let isDataValid = false;

        // if full validation passes then save to store and pass as valid
        if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {
            if (this.props.getStore().email != userInput.email || this.props.getStore().gender != userInput.gender) { // only update store of something changed
                this.props.updateStore({
                    ...userInput,
                    savedToCloud: false // use this to notify step4 that some changes took place and prompt the user to save again
                });  // Update store here (this is just an example, in reality you will do it via redux or flux)
            }

            isDataValid = true;
        }
        else {
            // if anything fails then update the UI validation state but NOT the UI Data State
            this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
        }

        return isDataValid;
    }

    validationCheck() {
        if (!this._validateOnDemand)
            return;

        const userInput = this._grabUserInput(); // grab user entered vals
        const validateNewInput = this._validateData(userInput); // run the new input against the validator

        this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
    }

    _validateData(data) {
        return {
            nameVal: (data.name != ''),
            floorAreaVal: (data.floorArea != ''),
            projectTypeVal: (data.projectType != 0), // required: anything besides N/A
            emailVal: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(data.email), // required: regex w3c uses in html5
        }
    }

    _validationErrors(val) {
        const errMsgs = {
            projectTypeValMsg: val.projectTypeVal ? '' : 'A project type selection is required',
            emailValMsg: val.emailVal ? '' : 'A valid email is required',
            nameValMsg: val.nameVal ? '' : 'A valid project name is required',
            floorAreaValMsg: val.floorAreaVal ? '' : 'A valid project area is required'
        }
        return errMsgs;
    }

    _grabUserInput() {
        return {
            projectType: this.refs.projectType.value,
            email: this.refs.email.value,
            name: this.refs.name.value,
            floorArea: this.refs.floorArea.value
        };
    }

    render() {
        // explicit class assigning based on validation
        let notValidClasses = {};

        if (typeof this.state.projectTypeVal == 'undefined' || this.state.projectTypeVal) {
            notValidClasses.projectTypeCls = 'no-error col-md-8';
        }
        else {
            notValidClasses.projectTypeCls = 'has-error col-md-8';
        }

        if (typeof this.state.emailVal == 'undefined' || this.state.emailVal) {
            notValidClasses.emailCls = 'no-error col-md-8';
        }
        else {
            notValidClasses.emailCls = 'has-error col-md-8';
        }

        if (typeof this.state.nameVal == 'undefined' || this.state.nameVal) {
            notValidClasses.nameCls = 'no-error col-md-8';
        }
        else {
            notValidClasses.nameCls = 'has-error col-md-8';
        }

        if (typeof this.state.floorAreaVal == 'undefined' || this.state.floorAreaVal) {
            notValidClasses.floorAreaCls = 'no-error col-md-8';
        }
        else {
            notValidClasses.floorAreaCls = 'has-error col-md-8';
        }

        return (
            <div className="step step3">
                <div className="row">
                    <form id="Form" className="form-horizontal">

                        <div className="form-group col-md-12 content form-block-holder">
                            <label className="control-label col-md-4">
                                Name
                            </label>
                            <div className={notValidClasses.nameCls}>
                                <input ref="name" autoComplete="off" type="text" placeholder="Enter a valid project name" 
                                    className="form-control" required defaultValue={this.state.name} onBlur={this.validationCheck} />
                                <div>{this.state.nameValMsg}</div>
                            </div>
                        </div>

                        <div className="form-group col-md-12 content form-block-holder">
                            <label className="control-label col-md-4">
                                Project Type
                            </label>
                            <div className={notValidClasses.projectTypeCls}>
                                <select ref="projectType" autoComplete="off" className="form-control" required 
                                    defaultValue={this.state.projectType} onBlur={this.validationCheck}>
                                    <option value="">Please select</option>
                                    <option value="buildings">Buildings</option>
                                    <option value="cities">Cities</option>
                                    <option value="communities">Communities</option>
                                </select>
                                <div>{this.state.projectTypeValMsg}</div>
                            </div>
                        </div>

                        <div className="form-group col-md-12 content form-block-holder">
                            <label className="control-label col-md-4">
                                Floor Area
                            </label>
                            <div className={notValidClasses.floorAreaCls}>
                                <input ref="floorArea" autoComplete="off" type="number" placeholder="Enter project floor area" 
                                    className="form-control" required defaultValue={this.state.floorArea} onBlur={this.validationCheck} />
                                <div>{this.state.floorAreaValMsg}</div>
                            </div>
                        </div>

                        <div className="form-group col-md-12 content form-block-holder">
                            <label className="control-label col-md-4">
                                Email
                            </label>
                            <div className={notValidClasses.emailCls}>
                                <input ref="email" autoComplete="off" type="email" placeholder="" className="form-control" required 
                                    defaultValue={this.state.email} onBlur={this.validationCheck} />
                                <div>{this.state.emailValMsg}</div>
                            </div>
                        </div>

                        
                    </form>
                </div>
            </div>
        )
    }
}
