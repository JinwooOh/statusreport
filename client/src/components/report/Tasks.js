/* eslint react/prop-types: 0 */
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Autosuggest from 'react-autosuggest';
// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import TaskCard from "./TaskCard";

// Autosugesstion
let userData = [{}];
const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : userData.filter(user => user.name.toLowerCase().slice(0, inputLength) === inputValue);
};
const getSuggestionValue = suggestion => suggestion.name;
const renderSuggestion = suggestion => <div>{suggestion.name}</div>;

class Tasks extends React.Component {
  // Autosugesstion
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: [],
      users: [],
    };
  }

  // nameRef = React.createRef();

  componentDidMount() {
    // get user info from database for Autosugesstion
    fetch('/users')
      .then(res => res.json())
      .then((users) => {
        userData = users;
        this.setState({ users });
      })
      .catch(error => console.error('fetch error at componentDidMount', error)); // error
  }
  // Autosugesstion methods start
  onChange = (event, { newValue }) => {
    this.props.addUser(newValue);
    this.setState({
      value: newValue,
    });
  };
  // Autosugesstion methods start
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };
  // Autosugesstion methods end

  handleName = (name) => {
    name.preventDefault();
    console.log(this.state.value);
    console.log(this.state.users);
    this.props.addUser(this.state.value);
  };

  renderTask = (key) => {
    const task = this.props.tasks[key];
    // loop through each task's category for the gap
    const renderItem = Object.keys(task).map((key) => {
      if (task[key] === '') {
        return '';
      } else if (key === 'taskType') {
        return (
          <span key={key} className="tasks-list-gap">
            {task[key]}
            {': '}
          </span>
        );
      } else if (key === 'hours') {
        return (
          <span key={key} className="tasks-list-gap">
            {task[key]} hours
          </span>
        );
      }
      return (
        <span key={key} className="tasks-list-gap">
          {task[key]}
        </span>
      );
    });
    return (
      <CSSTransition key={key} in classNames="summary" appear timeout={1000}>
        <li key={key}>
          {renderItem}
          <button className="btn btn__remove" onClick={() => this.props.removeTask(key)}>
            Remove
          </button>
        </li>
      </CSSTransition>
    );
  };

  render() {
    const { value, suggestions } = this.state;
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type your name',
      value,
      onChange: this.onChange,
    };
    const taskIds = Object.keys(this.props.tasks);
    const count = this.props.totalHours;
    return (
      <div className="summary summary--report">
        <h2 className="heading-primary">Summary</h2>
        {/* <MuiThemeProvider>
          <TaskCard
            tasks={this.props.tasks}
            removeTask={this.props.removeTask}
          />
        </MuiThemeProvider> */}

        <ol className="tasks-list">{taskIds.map(this.renderTask)}</ol>
        <div className="summary-info">
          <p style={{ display: 'inline' }}>Total Hours: </p>
          <TransitionGroup component="span" className="text-totalHours">
            <CSSTransition
              classNames="text-totalHours"
              timeout={{ enter: 1000, exit: 100 }}
              key={count}
            >
              <span className="text-totalHours">{this.props.totalHours}</span>
            </CSSTransition>
          </TransitionGroup>

          <p>{this.props.date.toString()}</p>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
        </div>

        <button className="btn btn__summary" onClick={this.props.handleSubmit}>
          Submit
        </button>
        <button
          className="btn btn__summary"
          onClick={() => {
            window.print();
          }}
        >
          Print this page
        </button>
      </div>
    );
  }
}

export default Tasks;
