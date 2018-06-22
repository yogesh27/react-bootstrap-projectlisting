import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import Joi from 'joi';

class Step3 extends Component {
	constructor(props) {
		super(props);

		this.state = {
			country: props.getStore().country,
			street: props.getStore().street,
			state: props.getStore().state,
			city: props.getStore().city,
			zipcode: props.getStore().zipcode
		};

		this.validatorTypes = {
			country: Joi.string().required(),
			street: Joi.string().required(),
			state: Joi.string().required(),
			city: Joi.string().required(),
			zipcode: Joi.string().required()
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
			country: this.refs.country.value,
			state: this.refs.state.value,
			street: this.refs.street.value,
			city: this.refs.city.value,
			zipcode: this.refs.zipcode.value
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
		notValidClasses.countryCls = this.props.isValid('country') ?
			'no-error col-md-8' : 'has-error col-md-8';
		notValidClasses.stateCls = this.props.isValid('state') ?
			'no-error col-md-8' : 'has-error col-md-8';
		notValidClasses.streetCls = this.props.isValid('street') ?
				'no-error col-md-8' : 'has-error col-md-8';
		notValidClasses.cityCls = this.props.isValid('city') ?
				'no-error col-md-8' : 'has-error col-md-8';
		notValidClasses.zipcodeCls = this.props.isValid('zipcode') ?
				'no-error col-md-8' : 'has-error col-md-8';

		return (
			<div className="step step1">
				<div className="row">
					<form id="Form" className="">
						<div className="form-group">
							<label className="control-label col-md-12 ">
								<h1>Step 3: Project Address</h1>
							</label>
						</div>
						<div className="form-group col-md-12 content form-block-holder">
						<label className="control-label col-md-4">
						Project Country
					</label>
					<div className={notValidClasses.countryCls}>
						<select
							ref="country"
							name="country"
							autoComplete="off"
							type="input"
							className="form-control"
							required
							defaultValue={this.state.country}
							onBlur={this.props.handleValidation('country')}
							onChange={this.onChange.bind(this)}
						>
						<option value="">Please select</option>
				        <option value="US">US</option>
				        <option value="IN">India</option>
				        <option value="CA">Canada</option>
						</select>

						{this.props.getValidationMessages('country').map(this.renderHelpText)}
					</div>
						</div>
						<div className="form-group col-md-12 content form-block-holder">
							<label className="control-label col-md-4">
								Street
							</label>
							<div className={notValidClasses.streetCls}>
								<input
									ref="street"
									name="street"
									autoComplete="off"
									type="input"
									className="form-control"
									placeholder="Enter your Street"
									required
									defaultValue={this.state.street}
									onBlur={this.props.handleValidation('street')}
									onChange={this.onChange.bind(this)}
								/>
	
								{this.props.getValidationMessages('street').map(this.renderHelpText)}
							</div>
						</div>
						<div className="form-group col-md-12 content form-block-holder">
						<label className="control-label col-md-4">
							City
						</label>
						<div className={notValidClasses.cityCls}>
							<input
								ref="city"
								name="city"
								autoComplete="off"
								type="input"
								className="form-control"
								placeholder="Enter your City"
								required
								defaultValue={this.state.city}
								onBlur={this.props.handleValidation('city')}
								onChange={this.onChange.bind(this)}
							/>

							{this.props.getValidationMessages('city').map(this.renderHelpText)}
						</div>
					</div>
					<div className="form-group col-md-12 content form-block-holder">
					<label className="control-label col-md-4">
						State
					</label>
					<div className={notValidClasses.stateCls}>
						<select
							ref="state"
							name="state"
							autoComplete="off"
							type="input"
							className="form-control"
							required
							defaultValue={this.state.state}
							onBlur={this.props.handleValidation('state')}
							onChange={this.onChange.bind(this)}
						>
						<option value="">Please select</option>
				        <option value="NC">NC</option>
				        <option value="SC">SC</option>
				        <option value="WI">WI</option>
						</select>

						{this.props.getValidationMessages('state').map(this.renderHelpText)}
					</div>
				</div>
				<div className="form-group col-md-12 content form-block-holder">
				<label className="control-label col-md-4">
				Zip code
			</label>
			<div className={notValidClasses.zipcodeCls}>
				<input
					ref="zipcode"
					name="zipcode"
					autoComplete="off"
					type="input"
					className="form-control"
					placeholder="Enter your Zip Code"
					required
					defaultValue={this.state.zipcode}
					onBlur={this.props.handleValidation('zipcode')}
					onChange={this.onChange.bind(this)}
				/>

				{this.props.getValidationMessages('zipcode').map(this.renderHelpText)}
			</div>
			</div>
					</form>
				</div>
			</div>
		)
	}
}

Step3.propTypes = {
	errors: PropTypes.object,
	validate: PropTypes.func,
	isValid: PropTypes.func,
	handleValidation: PropTypes.func,
	getValidationMessages: PropTypes.func,
	clearValidations: PropTypes.func,
	getStore: PropTypes.func,
	updateStore: PropTypes.func
};

export default validation(strategy)(Step3);