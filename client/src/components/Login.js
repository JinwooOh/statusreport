import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthService from './AuthService';

class Login extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
  }

  // Add redirection if we are already loggedIn
  componentWillMount() {
    if (this.Auth.loggedIn()) this.props.history.replace('/');
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.Auth.login(this.state.username, this.state.password)
      .then(res => {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
          this.props.history.push('/editname/');
        } else {
          // production
          this.props.history.push('/all-status-reports/editname/');
        }
      })
      .catch(err => {
        alert(err);
      });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  render() {
    return (
      <div className="wrapper">
        <h1 className="App-title">Login for Naming Guide</h1>

        <div className="login__container">
          <button
            className="btn btn__login--back"
            onClick={() => {
              if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                this.props.history.push('/');
              } else {
                // production code
                this.props.history.push('/all-status-reports/');
              }
            }}
          >
            BACK TO REPORT PAGE
          </button>
          <form className="login__form" onSubmit={this.handleFormSubmit}>
            <h2 className="center login__form--title">Login</h2>
            <input
              className="login__form--username"
              placeholder="User name"
              name="username"
              type="text"
              onChange={this.handleChange}
              required
            />
            <input
              className="login__form--password"
              placeholder="Password"
              name="password"
              type="password"
              onChange={this.handleChange}
              required
            />
            <button className="btn btn__submit login__form--submit" type="submit">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
Login.propTypes = {
  history: PropTypes.object.isRequired,
};
