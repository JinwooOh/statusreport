import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AlertPopup from 'react-popup';
import AuthService from '../AuthService';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
    this.state = {
      pageRender: 'default', // or 'newPassword'
    };
  }

  // Add redirection if we are already loggedIn
  componentWillMount() {
    if (this.Auth.loggedIn()) this.props.history.replace('/');
  }

  handleNewPassword() {
    this.setState({ pageRender: 'newPoassword' });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.Auth.login(this.state.username, this.state.password)
      .then(res => {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
          this.props.history.push('/editselect/');
        } else {
          // production
          this.props.history.push('/all-status-reports/editselect/');
        }
      })
      .catch(err => {
        AlertPopup.registerPlugin('prompt', function() {
          this.create({
            title: 'Failed to login',
            content: (
              <div className="errorPop">
                <p>
                  The username or password you entered is incorrect. Please contact
                  <a href="mailto:eipdstatusreporting@lists.wisc.edu">
                    {' '}
                    eipdstatusreporting@lists.wisc.edu.
                  </a>
                  to get login information.
                </p>
              </div>
            ),
            buttons: {
              right: ['ok'],
            },
          });
        });
        AlertPopup.plugins().prompt('', 'Type your name', value => {
          AlertPopup.alert(`You typed: ${value}`);
        });
      });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  renderHelper(status) {
    if (status === 'default') {
      return (
        <form className="login__form" onSubmit={this.handleFormSubmit}>
          <h2 className="center login__form--title">Login</h2>
          <input
            className="login__form--username"
            placeholder="Username"
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
          <button
            onClick={() => this.handleNewPassword()}
            className="btn btn__submit login__form--submit"
            type="button"
          >
            Change Password
          </button>
        </form>
      );
    }
    return (
      <form className="login__form" onSubmit={this.handleFormSubmit}>
        <h2 className="center login__form--title">Login</h2>
        <input
          className="login__form--username"
          placeholder="Username"
          name="username"
          type="text"
          onChange={this.handleChange}
          required
        />
        <input
          className="login__form--password"
          placeholder="Old Password"
          name="password"
          type="password"
          onChange={this.handleChange}
          required
        />
        <input
          className="login__form--password"
          placeholder="New Password"
          name="password"
          type="password"
          onChange={this.handleChange}
          required
        />
        <button className="btn btn__submit login__form--submit" type="submit">
          Change Password
        </button>
        <button
          onClick={() => this.setState({ pageRender: 'default' })}
          className="btn btn__submit login__form--submit"
          type="button"
        >
          Back to Login Page
        </button>
      </form>
    );
  }

  render() {
    return (
      <div className="wrapper">
        <AlertPopup closeBtn={false} />
        <h1 className="App-title">Login for Editing DB</h1>

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
          {this.renderHelper(this.state.pageRender)}
        </div>
      </div>
    );
  }
}
export default Login;
Login.propTypes = {
  history: PropTypes.object.isRequired,
};
