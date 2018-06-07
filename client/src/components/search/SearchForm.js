/* eslint react/prop-types: 0 */
import React from 'react';
// import Autosuggest from 'react-autosuggest';

class SearchForm extends React.Component {
  // search type: either program or program number
  state = {
    selectValue: 'Program',
  };

  programRef = React.createRef();
  userRef = React.createRef();
  startDateRef = React.createRef();
  endDateRef = React.createRef();

  handleChange = (e) => {
    this.setState({ selectValue: e.target.value });
  };
  createSearchUser = (event) => {
    event.preventDefault();
    const options = {
      startDate: this.startDateRef.current.value,
      endDate: this.endDateRef.current.value,
      userID: this.userRef.current.value,
    };
    this.props.addSearchOptions(options);
    event.currentTarget.reset();
  };
  createSearchProgram = (event) => {
    event.preventDefault();
    let options = {};
    if (this.state.selectValue === 'Program') {
      options = {
        startDate: this.startDateRef.current.value,
        endDate: this.endDateRef.current.value,
        courseProgram: this.programRef.current.value,
      };
      this.props.programSearchType('Program');
    } else {
      options = {
        startDate: this.startDateRef.current.value,
        endDate: this.endDateRef.current.value,
        courseNumber: this.programRef.current.value,
      };
      this.props.programSearchType('Program Number');
    }
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

          <span>Search Type </span>
          <select name="type" value={this.state.selectValue} onChange={this.handleChange}>
            <option value="Program">Course Name</option>
            <option value="Program Number">Course Number</option>
          </select>

          <span>Name or Number</span>
          <input
            name="program"
            ref={this.programRef}
            type="text"
            placeholder="Name / Number"
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
