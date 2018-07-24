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
      <div className="center">
        <div className="card">
          <h1>Login</h1>
          <form onSubmit={this.handleFormSubmit}>
            <input
              className="form-item"
              placeholder="Username goes here..."
              name="username"
              type="text"
              onChange={this.handleChange}
              required
            />
            <input
              className="form-item"
              placeholder="Password goes here..."
              name="password"
              type="password"
              onChange={this.handleChange}
              required
            />
            <input className="form-submit" value="SUBMIT" type="submit" />
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
