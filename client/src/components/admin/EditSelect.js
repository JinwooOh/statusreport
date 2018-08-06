import React from 'react';
import PropTypes from 'prop-types';
import withAuth from '../withAuth';
import AuthService from '../AuthService';

const Auth = new AuthService();

class EditSelect extends React.Component {
  handleLogout = () => {
    Auth.logout();
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      this.props.history.push('/login/');
    } else {
      // production
      this.props.history.push('/all-status-reports/login/');
    }
  };
  render() {
    return (
      <div className="wrapper">
        <h1 className="App-title">Select Edit Type</h1>
        <div className="guide">
          <div className="guide__popup">
            <button
              type="button"
              className="btn btn__logout btn--marginRight"
              onClick={() => this.handleLogout()}
            >
              Logout
            </button>
          </div>

          <button
            className="btn btn__search"
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
        </div>
        <div className="form-list form-list--report">
          <div className="editSelector">
            <button
              className="btn btn__editSelect"
              onClick={() => {
                if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                  this.props.history.push('/editname');
                } else {
                  // production code
                  this.props.history.push('/all-status-reports/editname');
                }
              }}
            >
              Edit Naming Guide
            </button>

            <button
              className="btn btn__editSelect"
              onClick={() => {
                if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                  this.props.history.push('/editcourseinfo');
                } else {
                  // production code
                  this.props.history.push('/all-status-reports/editcourseinfo');
                }
              }}
            >
              Edit Course Info
            </button>

            <button
              className="btn btn__editSelect"
              onClick={() => {
                if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                  this.props.history.push('/edituser');
                } else {
                  // production code
                  this.props.history.push('/all-status-reports/edituser');
                }
              }}
            >
              Edit User
            </button>
          </div>
          <div className="message__text--body">
            <p className="heading-primary center">Information</p>
            <ul>
              <li>Edit Naming Guide: The change of this will impact on naming Guide popup text.</li>
              <li>
                Edit Course Info: The change of this will impact auto-suggestion for program names
                and a course numbers.
              </li>
              <li>Edit User: The change of this will impact auto-suggestion for username.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default withAuth(EditSelect);
EditSelect.propTypes = {
  history: PropTypes.object.isRequired,
};