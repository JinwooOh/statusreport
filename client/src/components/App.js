import React from "react";
import Forms from "./Forms";
import Tasks from "./Tasks";
import Popup from "react-popup";
import { dateNow } from "./Helper";

// import TaskSelector from "./TaskSelector";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: {}, //task list
      totalHours: 0,
      taskType: "course", //or"admin"
      date: {}, //to track submit date and time
      userName: ""
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
    clearInterval(this.timerID);
  }
  updateDate = () => {
    this.setState({
      date: dateNow()
    });
  };

  handleSubmit = () => {
    if (this.isEmpty(this.state.tasks) || this.isEmpty(this.state.userName)) {
      //popup message
      let mySpecialPopup = Popup.register({
        title: "Alert",
        content:
          "To report, you should add at least one task to summary, and type your name at the bottom.",
        buttons: {
          right: ["ok"]
        }
      });
      Popup.queue(mySpecialPopup);
      console.log("User tries to submit empty task");
      return;
    }
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
  handlePop = e => {
    if (e === "general-info") {
      let mySpecialPopup = Popup.register({
        title: "Information",
        content: (
          <div>
            <p>AIMS: 608-265-6900</p>
            <p>
              Web server link:&nbsp;
              <a
                href="https://webhosting.doit.wisc.edu/panel/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Web server
              </a>
            </p>
          </div>
        ),
        buttons: {
          right: ["ok"]
        }
      });
      Popup.queue(mySpecialPopup);
      return;
    }
    if (e === "course-info") {
      let mySpecialPopup = Popup.register({
        title: "Information",
        content: (
          <div>
            <h3>CMS Layout</h3>
            <p>Community of Practice Sites</p>
            <p>Course Structure</p>
            <p>Discussions: Create</p>
            <p>Discussions: Update</p>
            <p>Gradebook</p>
            <p>Lectures</p>
            <p>Lessons/Labs/HTML</p>
            <p>Module Creation/Organization</p>
            <p>News Items</p>
            <p>Quiz: Create</p>
            <p>Quiz: Update</p>
            <p>Setup Canvas Site</p>
            <p>Start Here</p>
            <p>Unit Content</p>
            <p>Update Gradebook</p>
          </div>
        ),
        buttons: {
          right: ["ok"]
        }
      });
      Popup.queue(mySpecialPopup);
      return;
    } else {
      let mySpecialPopup = Popup.register({
        title: "Information",
        content: "Bip.. adminInfo.. Bip..",
        buttons: {
          right: ["ok"]
        }
      });
      Popup.queue(mySpecialPopup);
      return;
    }
  };

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
        <Popup closeBtn={false} />
        <h1 className="App-title">Status Report</h1>

        <div className="guide">
          <button
            className="btn-search"
            onClick={() => {
              this.props.history.push(`/report/`);
              //this.props.history.push(`/all-status-reports/report/`);
            }}
          >
            Search
          </button>
          <button onClick={() => this.handlePop("general-info")}>
            General Information
          </button>
          <button onClick={() => this.handlePop("course-info")}>
            Course Help Guide
          </button>
          <button onClick={() => this.handlePop("admin-info")}>
            Administration Help Guide
          </button>
        </div>

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
