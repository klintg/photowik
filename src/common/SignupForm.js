import React, {Component, PropTypes} from 'react';

class SignupForm extends Component {

  handleSignup(event) {
    const email = this.refs.email;
    const password = this.refs.password;
    const creds = { email: email.value.trim(), password: password.value.trim()};
    this.props.onSignupClick(creds);
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="form-group">
          <label className="col-sm-2 control-label">Email</label>
          <div className="col-sm-10">
            <input type="email" ref="email" className="form-control" placeholder="Email"/>
          </div>
        </div>

        <div className="form-group">
          <label className="col-sm-2 control-label">Password</label>
          <div className="col-sm-10">
            <input type="password" ref="password" className="form-control" placeholder="Password"/>
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" onClick={(event) => this.handleSignup(event)} className="btn btn-default">
              Sign Up
            </button>
          </div>
        </div>
      </form>
    );
  }

}

SignupForm.propTypes = {
  onSignupClick :PropTypes.func.isRequired
};

export default SignupForm;
