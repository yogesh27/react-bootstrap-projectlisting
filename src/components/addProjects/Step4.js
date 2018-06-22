import React, { Component } from 'react';
import Promise from 'promise';
import axios from 'axios';

export default class Step4 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      saving: false
    };

    this.isValidated = this.isValidated.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  // This review screen had the 'Save' button, on clicking this is called
  isValidated() {
    // typically this method needs to return true or false (to indicate if the local forms are validated, so StepZilla can move to the next step),
    // but in this example we simulate an ajax request which is async. In the case of async validation or server saving etc. return a Promise and StepZilla will wait
    // ... for the resolve() to work out if we can move to the next step
    // So here are the rules:
    // ~~~~~~~~~~~~~~~~~~~~~~~~
    // SYNC action (e.g. local JS form validation).. if you return:
    // true/undefined: validation has passed. Move to next step.
    // false: validation failed. Stay on current step
    // ~~~~~~~~~~~~~~~~~~~~~~~~
    // ASYNC return (server side validation or saving data to server etc).. you need to return a Promise which can resolve like so:
    // resolve(): validation/save has passed. Move to next step.
    // reject(): validation/save failed. Stay on current step

    this.setState({
      saving: true
    });

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.setState({
          saving: true
        });

        this.props.updateStore({savedToCloud: true});  // Update store here (this is just an example, in reality you will do it via redux or flux)

        var form_body = {
                "type": [{ "target_id": "arc_project" }],
                "title": [{ "value": this.props.getStore().projectName }],
                "field_area": [{ "value": this.props.getStore().floorArea }],
                "field_owner_country": [{ "value": this.props.getStore().ownerCountry }],
                "field_owner_email": [{ "value": this.props.getStore().ownerEmail }],
                "field_owner_organization": [{ "value": this.props.getStore().ownerName }],
                "field_owner_type": [{ "value": this.props.getStore().ownerType }],
                "field_project_type": [{ "value": this.props.getStore().projectType }],
                "field_rating_system": [{ "value": this.props.getStore().ratingSystem }],
                "field_space_type": [{ "value": this.props.getStore().spaceType }],
                "field_unit_type": [{ "value": this.props.getStore().unitType }],
                "field_country": [{ "value": this.props.getStore().country }],
                "field_address": [{ "value": this.props.getStore().street }],
                "field_state": [{ "value": this.props.getStore().state }],
                "field_city": [{ "value": this.props.getStore().city }],
                "field_zip_code": [{ "value": this.props.getStore().zipcode }]
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
                	resolve();
                })
                .catch(err => {
                    this.setState({
                        saving: false,
                        error: true
                    });
                    reject();
                });
            })
            .catch(err => {
            	this.setState({
                    saving: false,
                    error: true
                });
            	reject();
            });       
        
        
        // call resolve() to indicate that server validation or other aync method was a success.
        // ... only then will it move to the next step. reject() will indicate a fail
        //resolve();
        // reject(); // or reject
      }, 5000);
    });
  }

  render() {
    const savingCls = this.state.saving ? 'saving col-md-12 show' : 'saving col-md-12 hide';
    const errorCls = this.state.error ? 'error col-md-12 show' : 'error col-md-12 hide';

    return (
      <div className="step step4 review">
        <div className="row">
          <form id="Form" className="form-horizontal">
            <div className="form-group">
              <label className="col-md-12 control-label">
                <h1>Step 4: Review your Details and 'Submit'</h1>
              </label>
            </div>
            <div className="form-group">
              <div className="col-md-12 control-label">
                <div className="col-md-12 txt">
                  <div className="col-md-4">
                    Project Name
                  </div>
                  <div className="col-md-4">
                    {this.props.getStore().projectName}
                  </div>
                </div>
                <div className="col-md-12 txt">
                  <div className="col-md-4">
                  Floor Area
                  </div>
                  <div className="col-md-4">
                    {this.props.getStore().floorArea}
                  </div>
                </div>
                <div className="col-md-12 txt">
                  <div className="col-md-4">
                  Project Type
                  </div>
                  <div className="col-md-4">
                    {this.props.getStore().projectType}
                  </div>
                </div>
                <div className="col-md-12 txt">
                <div className="col-md-4">
                Rating System
                </div>
                <div className="col-md-4">
                  {this.props.getStore().ratingSystem}
                </div>
              </div>
              <div className="col-md-12 txt">
              <div className="col-md-4">
              Space Type
              </div>
              <div className="col-md-4">
                {this.props.getStore().spaceType}
              </div>
            </div>
            <div className="col-md-12 txt">
            <div className="col-md-4">
            Unit Type
            </div>
            <div className="col-md-4">
              {this.props.getStore().unitType}
            </div>
          </div>
          <div className="col-md-12 txt">
          <div className="col-md-4">
          Owner Name
          </div>
          <div className="col-md-4">
            {this.props.getStore().ownerName}
          </div>
        </div>
        <div className="col-md-12 txt">
        <div className="col-md-4">
        Owner Email
        </div>
        <div className="col-md-4">
          {this.props.getStore().ownerEmail}
        </div>
      </div>
      <div className="col-md-12 txt">
      <div className="col-md-4">
      Owner Country
      </div>
      <div className="col-md-4">
        {this.props.getStore().ownerCountry}
      </div>
    </div>
    <div className="col-md-12 txt">
    <div className="col-md-4">
    Owner Type
    </div>
    <div className="col-md-4">
      {this.props.getStore().ownerType}
    </div>
  </div>
  <div className="col-md-12 txt">
  <div className="col-md-4">
  Project Country
  </div>
  <div className="col-md-4">
    {this.props.getStore().country}
  </div>
</div>
<div className="col-md-12 txt">
<div className="col-md-4">
Project Street
</div>
<div className="col-md-4">
  {this.props.getStore().street}
</div>
</div>
<div className="col-md-12 txt">
<div className="col-md-4">
Project City
</div>
<div className="col-md-4">
  {this.props.getStore().city}
</div>
</div>
<div className="col-md-12 txt">
<div className="col-md-4">
Project State
</div>
<div className="col-md-4">
  {this.props.getStore().state}
</div>
</div>
<div className="col-md-12 txt">
<div className="col-md-4">
Project Zip Code
</div>
<div className="col-md-4">
  {this.props.getStore().zipcode}
</div>
</div>
                <h2 className={savingCls}>Saving to Cloud, pls wait...</h2>
                <h2 className={errorCls}>There was an error registering your project. Please check data and try again...</h2>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}