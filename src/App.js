import React, { Component } from 'react';
import './App.css';

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

const formValid = ({ formErrors, ...rest}) => {
  let valid = true;

  // validate from errors being empty
  Object.values(formErrors).forEach( val => {
    val.length > 0 && (valid = false);
  });
  
  // validate the form was filled out
  Object.values(rest).forEach( val => {
    val === null && (valid = false)
  });
  return valid;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirmPassword: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();   
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;  
    formErrors.confirmPassword = "";

    if (formValid(this.state) && this.state.password === this.state.confirmPassword) {
    // Form will be submitted
    }else {
      formErrors.confirmPassword = "The password don't match";
      this.setState({ formErrors, [name]: value });
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      // Form will not be submitted
    }
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors; 
    switch(name) {
      case 'firstName':
        formErrors.firstName = value.length < 3 ? 'Minimum 3 characters required.' : "";
        break;
      case 'lastName':
        formErrors.lastName = value.length < 3 ? 'Minimum 3 characters required.' : "";
        break;
      case 'email':
        formErrors.email = emailRegex.test(value) ? "" : 'Invalide e-mail address.';
        break;
      case 'password':
        formErrors.password = value.length < 6 ? 'Minimum 6 characters required.' : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value })
  }

  render() {
    const { formErrors } = this.state;
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Welcome</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input 
                className={formErrors.firstName.length > 0 ? "error" : null}
                type="text"  
                placeholder="First Name" 
                name="firstName" 
                noValidate  
                onChange={this.handleChange}
                />
                {formErrors.firstName.length > 0 && (
                  <span className="errorMessage">{formErrors.firstName}</span>
                )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input 
                className={formErrors.lastName.length > 0 ? "error" : null}
                type="text"  
                placeholder="Last Name" 
                name="lastName" 
                noValidate  
                onChange={this.handleChange}
                />
                {formErrors.lastName.length > 0 && (
                  <span className="errorMessage">{formErrors.lastName}</span>
                )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input 
                className={formErrors.email.length > 0 ? "error" : null}
                type="email"  
                placeholder="Email" 
                name="email" 
                noValidate  
                onChange={this.handleChange}
                />
                {formErrors.email.length > 0 && (
                  <span className="errorMessage">{formErrors.email}</span>
                )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input 
                className={formErrors.password.length > 0 ? "error" : null}
                type="password"  
                placeholder="Password" 
                name="password" 
                noValidate  
                onChange={this.handleChange}
                />
                {formErrors.password.length > 0 && (
                  <span className="errorMessage">{formErrors.password}</span>
                )}
            </div>
            <div className="password">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input 
                type="password"  
                placeholder="Confirm password" 
                name="confirmPassword"
                noValidate  
                onChange={this.handleChange}
                />
                {formErrors.confirmPassword.length > 0 && (
                  <span className="errorMessage">{formErrors.confirmPassword}</span>
                )}
            </div>
            <div className="createAccount">
              <button type="submit">Create Account</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


export default App;
