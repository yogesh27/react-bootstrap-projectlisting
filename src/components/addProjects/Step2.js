import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import Joi from 'joi';

class Step2 extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ownerName: props.getStore().ownerName,
			ownerEmail: props.getStore().ownerEmail,
			ownerCountry: props.getStore().ownerCountry,
			ownerType: props.getStore().ownerType
		};

		this.validatorTypes = {
				ownerName: Joi.string().required(),
				ownerEmail: Joi.string().email().required(),
				ownerCountry: Joi.string().required(),
				ownerType: Joi.string().required()
		};

		this.getValidatorData = this.getValidatorData.bind(this);
		this.renderHelpText = this.renderHelpText.bind(this);
		this.isValidated = this.isValidated.bind(this);
	}

	isValidated() {
		return new Promise((resolve, reject) => {
			this.props.validate((error) => {
				if (error) {
					reject(); // form contains errors
					return;
				}

					this.props.updateStore({
						...this.getValidatorData(),
						savedToCloud: false
					});  // Update store here (this is just an example, in reality
					// you will do it via redux or flux)


				resolve(); // form is valid, fire action
			});
		});
	}

	getValidatorData() {
		return {
			ownerName: this.refs.ownerName.value,
			ownerEmail: this.refs.ownerEmail.value,
			ownerCountry: this.refs.ownerCountry.value,
			ownerType: this.refs.ownerType.value
		}
	};

	onChange(e) {
		let newState = {};
		newState[e.target.name] = e.target.value;
		this.setState(newState);
	}

	renderHelpText(message, id) {
		return (<div className="val-err-tooltip" key={id}><span>{message}</span></div>);
	};

	render() {

		// explicit class assigning based on validation
		let notValidClasses = {};
		notValidClasses.ownerNameCls = this.props.isValid('ownerName') ?
			'no-error col-md-8' : 'has-error col-md-8';
		notValidClasses.ownerEmailCls = this.props.isValid('ownerEmail') ?
			'no-error col-md-8' : 'has-error col-md-8';
		notValidClasses.ownerCountryCls = this.props.isValid('ownerCountry') ?
				'no-error col-md-8' : 'has-error col-md-8';
		notValidClasses.ownerTypeCls = this.props.isValid('ownerType') ?
				'no-error col-md-8' : 'has-error col-md-8';

		return (
			<div className="step step1">
				<div className="row">
					<form id="Form" className="form-horizontal">
						<div className="form-group">
							<label className="control-label col-md-12 ">
								<h1>Step 2: Owner Details</h1>
							</label>
						</div>
						<div className="form-group col-md-12 content form-block-holder">
							<label className="control-label col-md-4">
								Owner Name
							</label>
							<div className={notValidClasses.ownerNameCls}>
								<input
									ref="ownerName"
									name="ownerName"
									autoComplete="off"
									type="input"
									className="form-control"
									placeholder="Enter your Owner Name"
									required
									defaultValue={this.state.ownerName}
									onBlur={this.props.handleValidation('ownerName')}
									onChange={this.onChange.bind(this)}
								/>

								{this.props.getValidationMessages('ownerName').map(this.renderHelpText)}
							</div>
						</div>
						<div className="form-group col-md-12 content form-block-holder">
							<label className="control-label col-md-4">
								Owner Email
							</label>
							<div className={notValidClasses.ownerEmailCls}>
								<input
									ref="ownerEmail"
									name="ownerEmail"
									autoComplete="off"
									type="email"
									className="form-control"
									placeholder="Enter your Owner Email"
									required
									defaultValue={this.state.ownerEmail}
									onBlur={this.props.handleValidation('ownerEmail')}
									onChange={this.onChange.bind(this)}
								/>
	
								{this.props.getValidationMessages('ownerEmail').map(this.renderHelpText)}
							</div>
						</div>
						
					<div className="form-group col-md-12 content form-block-holder">
					<label className="control-label col-md-4">
						Owner Country
					</label>
					<div className={notValidClasses.ownerCountryCls}>
						<select
							ref="ownerCountry"
							name="ownerCountry"
							autoComplete="off"
							type="input"
							className="form-control"
							required
							defaultValue={this.state.ownerCountry}
							onBlur={this.props.handleValidation('ownerCountry')}
							onChange={this.onChange.bind(this)}
						>
						<option value="">Please select</option>
				        <option value="US">US</option>
				        <option value="IN">India</option>
				        <option value="CA">Canada</option>
						</select>

						{this.props.getValidationMessages('ownerCountry').map(this.renderHelpText)}
					</div>
				</div>
				<div className="form-group col-md-12 content form-block-holder">
				<label className="control-label col-md-4">
					Owner Type
				</label>
				<div className={notValidClasses.ownerTypeCls}>
					<select
						ref="ownerType"
						name="ownerType"
						autoComplete="off"
						type="input"
						className="form-control"
						required
						defaultValue={this.state.ownerType}
						onBlur={this.props.handleValidation('ownerType')}
						onChange={this.onChange.bind(this)}
					>
					<option value="">Please select</option>
			        <option value="Corporate">Corporate</option>
			        <option value="University">University</option>
			        <option value="Government">Government</option>
					</select>

					{this.props.getValidationMessages('ownerType').map(this.renderHelpText)}
				</div>
			</div>

					</form>
				</div>
			</div>
		)
	}
}

Step2.propTypes = {
	errors: PropTypes.object,
	validate: PropTypes.func,
	isValid: PropTypes.func,
	handleValidation: PropTypes.func,
	getValidationMessages: PropTypes.func,
	clearValidations: PropTypes.func,
	getStore: PropTypes.func,
	updateStore: PropTypes.func
};

export default validation(strategy)(Step2);
