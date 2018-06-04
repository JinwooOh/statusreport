/* eslint react/prop-types: 0 */
import React from 'react';

class SearchForm extends React.Component {
  programRef = React.createRef();
  userRef = React.createRef();
  startDateRef = React.createRef();
  endDateRef = React.createRef();

  createSearchUser = (event) => {
    event.preventDefault();
    const options = {
      startDate: this.startDateRef.current.value,
      endDate: this.endDateRef.current.value,
      user: this.userRef.current.value,
    };
    this.props.addSearchOptions(options);
    event.currentTarget.reset();
  };
  createSearchProgram = (event) => {
    event.preventDefault();
    const options = {
      startDate: this.startDateRef.current.value,
      endtDate: this.endDateRef.current.value,
      program: this.programRef.current.value,
    };
    this.props.addSearchOptions(options);
    event.currentTarget.reset();
  };

  render() {
    // program search
    if (this.props.searchType === 'program') {
      return (
        <form className="task-edit" onSubmit={this.createSearchProgram}>
          <span>Start Date </span>
          <input name="date" ref={this.startDateRef} type="date" required />
          <span>End Date </span>
          <input name="date" ref={this.endDateRef} type="date" required />
          <span>Program</span>
          <input
            name="program"
            ref={this.programRef}
            type="text"
            placeholder="Program name"
            required
          />
          <br />
          <br />
          <div className="center">
            <button className="btn btn__summary">Search</button>
          </div>
        </form>
      );
    }

    // user search
    return (
      <form className="task-edit" onSubmit={this.createSearchUser}>
        <span>Start Date </span>
        <input name="date" ref={this.startDateRef} type="date" required />
        <span>End Date </span>
        <input name="date" ref={this.endDateRef} type="date" required />
        <span>User name</span>
        <input name="user" ref={this.userRef} type="text" placeholder="User name" required />

        <br />
        <br />
        <div className="center">
          <button className="btn btn__summary">Search</button>
        </div>
      </form>
    );
  }
}

export default SearchForm;
