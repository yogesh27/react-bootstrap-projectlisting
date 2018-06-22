import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import Joi from 'joi';

class Step1 extends Component {
	constructor(props) {
		super(props);

		this.state = {
			projectName: props.getStore().projectName,
			floorArea: props.getStore().floorArea,
			projectType: props.getStore().projectType,
			ratingSystem: props.getStore().ratingSystem,
			spaceType: props.getStore().spaceType,
			unitType: props.getStore().unitType
		};

		this.validatorTypes = {
			projectName: Joi.string().required(),
			floorArea: Joi.string().required(),
			projectType: Joi.string().required(),
			ratingSystem: Joi.string().required(),
			spaceType: Joi.string().required(),
			unitType: Joi.string().required()
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
			projectName: this.refs.projectName.value,
			floorArea: this.refs.floorArea.value,
			projectType: this.refs.projectType.value,
			ratingSystem: this.refs.ratingSystem.value,
			spaceType: this.refs.spaceType.value,
			unitType: this.refs.unitType.value
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
		notValidClasses.projectNameCls = this.props.isValid('projectName') ?
			'no-error col-md-8' : 'has-error col-md-8';
		notValidClasses.floorAreaCls = this.props.isValid('floorArea') ?
			'no-error col-md-8' : 'has-error col-md-8';
		notValidClasses.projectTypeCls = this.props.isValid('projectType') ?
				'no-error col-md-8' : 'has-error col-md-8';
		notValidClasses.ratingSystemCls = this.props.isValid('ratingSystem') ?
				'no-error col-md-8' : 'has-error col-md-8';
		notValidClasses.spaceTypeCls = this.props.isValid('spaceType') ?
				'no-error col-md-8' : 'has-error col-md-8';
		notValidClasses.unitTypeCls = this.props.isValid('unitType') ?
				'no-error col-md-8' : 'has-error col-md-8';

		return (
			<div className="step step1">
				<div className="row">
					<form id="Form" className="form-horizontal">
						<div className="form-group">
							<label className="control-label col-md-12 ">
								<h1>Step 1: Project Details</h1>
							</label>
						</div>
						<div className="form-group col-md-12 content form-block-holder">
							<label className="control-label col-md-4">
								Project Name
							</label>
							<div className={notValidClasses.projectNameCls}>
								<input
									ref="projectName"
									name="projectName"
									autoComplete="off"
									type="input"
									className="form-control"
									placeholder="Enter your Project Name"
									required
									defaultValue={this.state.projectName}
									onBlur={this.props.handleValidation('projectName')}
									onChange={this.onChange.bind(this)}
								/>

								{this.props.getValidationMessages('projectName').map(this.renderHelpText)}
							</div>
						</div>
						<div className="form-group col-md-12 content form-block-holder">
							<label className="control-label col-md-4">
								Floor Area
							</label>
							<div className={notValidClasses.floorAreaCls}>
								<input
									ref="floorArea"
									name="floorArea"
									autoComplete="off"
									type="input"
									className="form-control"
									placeholder="Enter your Floor Area"
									required
									defaultValue={this.state.floorArea}
									onBlur={this.props.handleValidation('floorArea')}
									onChange={this.onChange.bind(this)}
								/>
	
								{this.props.getValidationMessages('floorArea').map(this.renderHelpText)}
							</div>
						</div>
						<div className="form-group col-md-12 content form-block-holder">
						<label className="control-label col-md-4">
							Project Type
						</label>
						<div className={notValidClasses.projectTypeCls}>
							<input
								ref="projectType"
								name="projectType"
								autoComplete="off"
								type="input"
								className="form-control"
								placeholder="Enter your Project Type"
								required
								defaultValue={this.state.projectType}
								onBlur={this.props.handleValidation('projectType')}
								onChange={this.onChange.bind(this)}
							/>

							{this.props.getValidationMessages('projectType').map(this.renderHelpText)}
						</div>
					</div>
					<div className="form-group col-md-12 content form-block-holder">
					<label className="control-label col-md-4">
						Rating System
					</label>
					<div className={notValidClasses.ratingSystemCls}>
						<select
							ref="ratingSystem"
							name="ratingSystem"
							autoComplete="off"
							type="input"
							className="form-control"
							required
							defaultValue={this.state.ratingSystem}
							onBlur={this.props.handleValidation('ratingSystem')}
							onChange={this.onChange.bind(this)}
						>
						<option value="">Please select</option>
				        <option value="LEED">LEED</option>
				        <option value="LEED v4.1 O+M: EB">LEED v4.1 O+M: EB</option>
				        <option value="LEED v4.1 O+M: Interiors">LEED v4.1 O+M: Interiors</option>
						</select>

						{this.props.getValidationMessages('ratingSystem').map(this.renderHelpText)}
					</div>
				</div>
				<div className="form-group col-md-12 content form-block-holder">
				<label className="control-label col-md-4">
					Space Type
				</label>
				<div className={notValidClasses.spaceTypeCls}>
					<select
						ref="spaceType"
						name="spaceType"
						autoComplete="off"
						type="input"
						className="form-control"
						required
						defaultValue={this.state.spaceType}
						onBlur={this.props.handleValidation('spaceType')}
						onChange={this.onChange.bind(this)}
					>
					<option value="">Please select</option>
			        <option value="Airport">Airport</option>
			        <option value="School">School</option>
			        <option value="Warehouse">Warehouse</option>
					</select>

					{this.props.getValidationMessages('spaceType').map(this.renderHelpText)}
				</div>
			</div>
			<div className="form-group col-md-12 content form-block-holder">
			<label className="control-label col-md-4">
				Unit Type
			</label>
			<div className={notValidClasses.unitTypeCls}>
				<select
					ref="unitType"
					name="unitType"
					autoComplete="off"
					type="input"
					className="form-control"
					required
					defaultValue={this.state.unitType}
					onBlur={this.props.handleValidation('unitType')}
					onChange={this.onChange.bind(this)}
				>
		        <option value="">Please select</option>
		        <option value="SI">SI</option>
		        <option value="PI">PI</option>
		        </select>

				{this.props.getValidationMessages('unitType').map(this.renderHelpText)}
			</div>
		</div>

					</form>
				</div>
			</div>
		)
	}
}

Step1.propTypes = {
	errors: PropTypes.object,
	validate: PropTypes.func,
	isValid: PropTypes.func,
	handleValidation: PropTypes.func,
	getValidationMessages: PropTypes.func,
	clearValidations: PropTypes.func,
	getStore: PropTypes.func,
	updateStore: PropTypes.func
};

export default validation(strategy)(Step1);
