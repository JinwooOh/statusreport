import React from 'react';

import withAuth from './withAuth';
import AuthService from './AuthService';

const Auth = new AuthService();

class EditCourseInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseinfo: [],
    };
  }
  componentDidMount() {
    fetch('/courseinfo')
      .then(response => response.json())
      .then(findresponse => {
        this.setState({
          courseinfo: [...findresponse],
        });
      })
      .catch(err => console.log(err));
  }
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
                this.props.history.push('/editname');
              } else {
                // production code
                this.props.history.push('/all-status-reports/editname');
              }
            }}
          >
            Edit naming guide
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
          <div className="message__text--body">
            <p className="heading-primary center">
              This is the table that shows up in program/course number search
            </p>

            <ul>
              {this.state.courseinfo.map((c, i) => {
                return (
                  <li key={i} style={{ wordSpacing: '3px' }}>
                    {c.program}: {c.courseNumber} {c.semesterTerm}{' '}
                    <button
                      className="btn btn__remove"
                      onClick={() => this.handleOpen(c, { type: 'edit' })}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn__remove"
                      onClick={() => this.handleOpen(c, { type: 'delete' })}
                    >
                      remove
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default withAuth(EditCourseInfo);
