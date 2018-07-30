import React from 'react';
import withAuth from './withAuth';

class EditSelect extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <h1 className="App-title">Selecting Edit Type</h1>

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
          Edit Naming Guide
        </button>

        <button
          className="btn btn__search"
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
      </div>
    );
  }
}
export default withAuth(EditSelect);
