import React from 'react';
import withAuth from './withAuth';

class EditSelect extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <h1 className="App-title">Select Edit Type</h1>
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
        </div>
      </div>
    );
  }
}
export default withAuth(EditSelect);
