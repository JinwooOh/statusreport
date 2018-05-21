import React from "react";
import { CSSTransition } from "react-transition-group";
import Autosuggest from "react-autosuggest";
// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import TaskCard from "./TaskCard";

//Autosugesstion
let userData = [{}];
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : userData.filter(
        user => user.name.toLowerCase().slice(0, inputLength) === inputValue
      );
};
const getSuggestionValue = suggestion => suggestion.name;
const renderSuggestion = suggestion => <div>{suggestion.name}</div>;

class Tasks extends React.Component {
  //Autosugesstion
  constructor(props) {
    super(props);
    this.state = {
      users: [], //test purpose
      value: "",
      suggestions: []
    };
  }

  //nameRef = React.createRef();

  componentDidMount() {
    //get user info from database for Autosugesstion
    fetch("/users")
      .then(res => res.json())
      .then(users => {
        userData = users;
        this.setState({ users });
      })
      .catch(error => console.error("fetch error at componentDidMount", error)); //error
  }
  //Autosugesstion methods start
  onChange = (event, { newValue }) => {
    this.props.addUser(newValue);
    this.setState({
      value: newValue
    });
  };
  //Autosugesstion methods start
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  //Autosugesstion methods end

  handleName = name => {
    name.preventDefault();
    //console.log(this.nameRef.current.value);
    console.log(this.state.value);
    this.props.addUser(this.state.value);
  };
  renderTask = key => {
    const task = this.props.tasks[key];
    return (
      <CSSTransition
        in={true}
        classNames="summary"
        appear={true}
        timeout={1000}
      >
        <li key={key}>
          <span>
            {task.taskType}
            {":  "} {task.type}
            {"  "} {task.category}
            {"  "} {task.program}
            {"  "} {task.instructor}
            {"  "} {task.courseNumber}
            {"  "} {task.date}
            {"  "} {task.hours} hours
            <button
              className="remove-btn"
              onClick={() => this.props.removeTask(key)}
            >
              Remove
            </button>
          </span>
        </li>
      </CSSTransition>
    );
  }; //simple inline summary
  render() {
    const { value, suggestions } = this.state;
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Type your name",
      value,
      onChange: this.onChange
    };
    const taskIds = Object.keys(this.props.tasks);

    return (
      <div className="summary">
        <h2>Summary</h2>
        {/* <MuiThemeProvider>
          <TaskCard
            tasks={this.props.tasks}
            removeTask={this.props.removeTask}
          />
        </MuiThemeProvider> */}

        <ol className="tasks-list">{taskIds.map(this.renderTask)}</ol>

        <p>Total Hours: {this.props.totalHours}</p>
        <p>{this.props.date.toString()}</p>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        {/* <input
          className="userName"
          name="userName"
          type="text"
          placeholder="Type your name"
          ref={this.nameRef}
          onChange={e => {
            this.handleName(e);
          }}
        /> */}
        <button onClick={this.props.handleSubmit}>Submit</button>
        <button
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
