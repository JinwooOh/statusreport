import React from "react";
import Forms from "./report/Forms";
import Tasks from "./report/Tasks";
import { dateNow } from "./helper/Helper";

import AlertPopup from "react-popup";
import Popup from "./Popup";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: {}, //task list
      totalHours: 0,
      taskType: "course", //or"admin"
      date: {}, //to track submit date and time
      userName: "",
      open: false
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.updateDate(), 1000); //for time
    // fetch("/users")
    //   .then(res => res.json())
    //   .then(users => this.setState({ users: users }));

    //time
    const localStorageRef = localStorage.getItem("date");
    if (localStorageRef) {
      this.setState({ date: JSON.parse(localStorageRef) });
    }
  }
  componentDidUpdate() {
    //time
    localStorage.setItem("date", JSON.stringify(this.state.date));
  }

  componentWillUnmount() {
    console.log("Clock", "componentWillUnmount");
    clearInterval(this.timerID);
  }
  updateDate = () => {
    this.setState({
      date: dateNow()
    });
  };
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    //error
    if (this.isEmpty(this.state.tasks) || this.isEmpty(this.state.userName)) {
      //popup message
      let mySpecialPopup = AlertPopup.register({
        title: "Alert",
        content:
          "To report, you should add at least one task to summary, and type your name at the bottom.",
        buttons: {
          right: ["ok"]
        }
      });
      AlertPopup.queue(mySpecialPopup);
      console.log("User tries to submit empty task");
      return;
    }
    //success
    let data = this.state;
    fetch("/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(function(data) {
      console.log("State: ", data); //error
    });
    //popup message
    let mySpecialPopup = Popup.register({
      title: "Status Report",
      content: "Report submitted. Thank you.",
      buttons: {
        right: ["ok"]
      }
    });
    Popup.queue(mySpecialPopup);
    this.setState({
      tasks: {},
      totalHours: 0,
      userName: ""
    });
  };
  //helper method for checking empty object(tasks)
  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  addTask = task => {
    const tasks = { ...this.state.tasks };
    tasks[`task${Date.now()}`] = task;
    this.setState({
      tasks
    });
  };
  addUser = userName => {
    this.setState({
      userName
    });
  };
  sumHours = hours => {
    let totalHours = this.state.totalHours;
    totalHours += parseFloat(hours);
    this.setState({ totalHours });
  };
  removeTask = key => {
    const tasks = { ...this.state.tasks };
    const totalHours = this.state.totalHours - tasks[key].hours;
    delete tasks[key];
    this.setState({ tasks });
    this.setState({ totalHours });
  };
  selectTask = taskType => {
    this.setState({ taskType });
  };

  render() {
    return (
      <div className="wrapper">
        <AlertPopup closeBtn={false} />
        <h1 className="App-title">Status Report</h1>

        {/* <Popup closeBtn={false} /> */}
        <div className="guide">
          <MuiThemeProvider>
            <div className="guide guide__popup">
              <Popup title="Course Help Guide" text="sample text" />
              <Popup title="Administration Help Guide" text="sample text" />
              <Popup title="General Information" text="sample text" />
            </div>
          </MuiThemeProvider>

          <button
            className="btn btn__search"
            onClick={() => {
              this.props.history.push(`/report/`);
              // this.props.history.push(`/all-status-reports/report/`);
            }}
          >
            SEARCH
          </button>
        </div>

        {/* <button onClick={() => this.handlePop("general-info")}>
              General Information
            </button>
            <button onClick={() => this.handlePop("course-info")}>
              Course Help Guide
            </button>
            <button onClick={() => this.handlePop("admin-info")}>
              Administration Help Guide
            </button> */}

        <Forms
          addTask={this.addTask}
          sumHours={this.sumHours}
          taskType={this.state.taskType}
          selectTask={this.selectTask}
        />

        <Tasks
          tasks={this.state.tasks}
          userName={this.state.userName}
          details={this.state.tasks}
          date={this.state.date}
          addUser={this.addUser}
          removeTask={this.removeTask}
          taskType={this.state.taskType}
          totalHours={this.state.totalHours}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default App;
