import React from 'react';

import withAuth from './withAuth';
import AuthService from './AuthService';

const Auth = new AuthService();

class EditCourseInfo extends React.Component {
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
        <h1 className="App-title">Edit Course Info for DB</h1>
        <div className="guide">
          <button type="button" className="btn btn__logout" onClick={() => this.handleLogout()}>
            Logout
          </button>
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
            <h2>test list</h2>
        </div>
      </div>
    );
  }
}
export default withAuth(EditCourseInfo);
