/* eslint react/prop-types: 0 */
import React from 'react';
import Autosuggest from 'react-autosuggest';

let courseData = [];
// Autosuggestion helpers start
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  const regex = new RegExp(`^${escapedValue}`, 'i');
  return courseData.filter(course => regex.test(course.program) || regex.test(course.courseNumber));
}

function getSuggestionprogram(suggestion) {
  return suggestion.program;
}

function getSuggestionCourseNumber(suggestion) {
  return suggestion.courseNumber;
}
function renderSuggestion(suggestion) {
  return (
    <React.Fragment>
      {suggestion.program} - {suggestion.courseNumber}
    </React.Fragment>
  );
}
// Autosuggestion helpers end

class AddForm extends React.Component {
  constructor() {
    super();
    this.state = {
      programValue: '',
      programSuggestions: [],
      courseNumberValue: '',
      courseNumberSuggestions: [],
    };
  }
  componentDidMount() {
    // get user info from database for Autosugesstion
    fetch('/search/courseinfo')
      .then(res => res.json())
      .then(result => {
        courseData = result;
      })
      .catch(error => console.error('fetch error at componentDidMount', error)); // error
  }

  // Autosuggestion method start
  onprogramChange = (event, { newValue }) => {
    this.setState({
      programValue: newValue,
    });
  };

  onCourseNumberChange = (event, { newValue }) => {
    this.setState({
      courseNumberValue: newValue,
    });
  };

  onprogramSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      programSuggestions: getSuggestions(value),
    });
  };

  onprogramSuggestionsClearRequested = () => {
    this.setState({
      programSuggestions: [],
    });
  };

  onprogramSuggestionSelected = (event, { suggestion }) => {
    this.setState({
      courseNumberValue: suggestion.courseNumber,
    });
  };

  onCourseNumberSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      courseNumberSuggestions: getSuggestions(value),
    });
  };

  onCourseNumberSuggestionsClearRequested = () => {
    this.setState({
      courseNumberSuggestions: [],
    });
  };

  onCourseNumberSuggestionSelected = (event, { suggestion }) => {
    this.setState({
      programValue: suggestion.program,
    });
  };
  // Autosuggestion method end

  // Course task
  programRef = React.createRef();
  hoursRef = React.createRef();
  courseTypeRef = React.createRef();
  dateRef = React.createRef();
  instructorRef = React.createRef();
  categoryRef = React.createRef();
  courseNumberRef = React.createRef();
  semesterRef = React.createRef();
  // admin task
  categoryAdminRef = React.createRef();

  createTask = event => {
    event.preventDefault();
    const task = {
      // course form
      taskType: 'Course Task', // type of course
      date: this.dateRef.current.value,
      courseType: this.courseTypeRef.current.value,
      program: this.state.programValue, // this.programRef.current.value,
      courseNumber: this.state.courseNumberValue, // this.courseNumberRef.current.value,
      semester: this.semesterRef.current.value,
      instructor: this.instructorRef.current.value,
      category: this.categoryRef.current.value,
      hours: parseFloat(this.hoursRef.current.value),
    };
    this.props.sumHours(this.hoursRef.current.value);
    this.props.addTask(task);
    event.currentTarget.reset();
  };
  createTaskAdmin = event => {
    event.preventDefault();
    const task = {
      // admin form
      taskType: 'Adminstration Task',
      category: this.categoryAdminRef.current.value,
      date: this.dateRef.current.value,
      hours: parseFloat(this.hoursRef.current.value),
    };
    this.props.sumHours(this.hoursRef.current.value);
    this.props.addTask(task);
    event.currentTarget.reset();
  };

  render() {
    const {
      programValue,
      programSuggestions,
      courseNumberValue,
      courseNumberSuggestions,
    } = this.state;
    const programInputProps = {
      placeholder: 'Program name',
      value: programValue,
      onChange: this.onprogramChange,
    };
    const courseNumberInputProps = {
      placeholder: 'Course number',
      value: courseNumberValue,
      onChange: this.onCourseNumberChange,
    };
    // admin form
    if (this.props.taskType === 'admin') {
      return (
        <form className="task-edit" onSubmit={this.createTaskAdmin}>
          <span>Date </span>
          <input
            type="date"
            name="date"
            id="date"
            ref={this.dateRef}
            required
            // min={
            //   new Date(new Date().getTime() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            // }
            // max={new Date().toISOString().split('T')[0]}
          />

          <span>Task Type</span>
          <div className="select-custom">
            <select name="type" ref={this.categoryAdminRef}>
              <option value="Leave">Leave</option>
              <option value="Meeting">Meeting</option>
              <option value="Professional Development">Professional Development</option>
              <option value="Project Management">Project Management</option>
              <option value="Purchasing">Purchasing</option>
              <option value="Reporting">Reporting</option>
              <option value="Students">Students</option>
              <option value="Support">Support</option>
              <option value="Special Projects">Special Projects</option>
            </select>
          </div>

          <span>Hours for This Task</span>
          <input
            name="hours"
            ref={this.hoursRef}
            type="number"
            step="0.25"
            placeholder="hours"
            required
          />
          <div className="center">
            <button className="btn btn__summary" type="submit">
              Add Task
            </button>
          </div>
        </form>
      );
    }

    // course form
    return (
      <form className="task-edit" onSubmit={this.createTask}>
        <span>Date </span>
        <input
          name="date"
          ref={this.dateRef}
          type="date"
          // min={
          //   new Date(new Date().getTime() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          // }
          // max={new Date().toISOString().split('T')[0]}
          required
        />

        <span>Course Type</span>
        <div className="select-custom">
          <select name="type" ref={this.courseTypeRef}>
            <option value="New Course">New Course</option>
            <option value="Course Maintenance">Course Maintenance</option>
            <option value="Course Live Support">Course Live Support</option>
          </select>
        </div>

        <span>Program</span>
        <Autosuggest
          id="program"
          suggestions={programSuggestions}
          onSuggestionsFetchRequested={this.onprogramSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onprogramSuggestionsClearRequested}
          onSuggestionSelected={this.onprogramSuggestionSelected}
          getSuggestionValue={getSuggestionprogram}
          renderSuggestion={renderSuggestion}
          inputProps={programInputProps}
        />
        {/* <input name="program" ref={this.programRef} type="text" placeholder="Program name" /> */}

        <span>Course Number</span>
        <Autosuggest
          id="courseNumber"
          suggestions={courseNumberSuggestions}
          onSuggestionsFetchRequested={this.onCourseNumberSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onCourseNumberSuggestionsClearRequested}
          onSuggestionSelected={this.onCourseNumberSuggestionSelected}
          getSuggestionValue={getSuggestionCourseNumber}
          renderSuggestion={renderSuggestion}
          inputProps={courseNumberInputProps}
        />

        <span>Semester</span>
        <input name="semester" ref={this.semesterRef} type="text" placeholder="e.g. Spring 2018" />

        <span>Instructor</span>
        <input
          name="instructor"
          ref={this.instructorRef}
          type="text"
          placeholder="Instructor name"
        />

        <span>Task Type</span>
        <div className="select-custom">
          <select name="type" ref={this.categoryRef}>
            <option value="Content Development">Content Development</option>
            <option value="Faculty Consultation">Faculty Consultation</option>
            <option value="CMS Layout">CMS Layout</option>
            <option value="ISD Time">ISD Time</option>
            <option value="Media Production">Media Production</option>
            <option value="Quality Control">Quality Control</option>
          </select>
        </div>

        <span>Hours for This Task</span>
        <input
          name="hours"
          ref={this.hoursRef}
          type="number"
          placeholder="Hours"
          step="0.25"
          required
        />

        <div className="center">
          <button className="btn btn__summary">Add task</button>
        </div>
      </form>
    );
  }
}

export default AddForm;
