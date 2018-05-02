import React from "react";
import Forms from "./Forms";
import Tasks from "./Tasks";
import Popup from "react-popup";
// import TaskSelector from "./TaskSelector";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: {}, //task list
      totalHours: 0,
      taskType: "course", //or"admin"
      date: {}, //to track submit date and time
      users: [] //test purpose
    };
  }
  //need to work on localstorage for timer
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000); //for time
    // fetch("/users")
    //   .then(res => res.json())
    //   .then(users => this.setState({ users: users }));
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  //for time tracking
  tick() {
    let getDate = new Date();
    getDate.toISOString();
    let ampm = "am";
    let h = getDate.getHours();
    if (h >= 12) {
      h -= 12;
      ampm = "pm";
    }
    let m = getDate.getMinutes();
    let now = getDate.toDateString() + " " + h + ":" + m + ampm;
    this.setState({
      date: now
    });
  }

  handleSubmit = () => {
    if (this.isEmpty(this.state.tasks)) {
      Popup.alert("You should have at least one task to submit.");

      console.log("User tries to submit empty task");
      return;
    }
    let data = this.state;
    fetch("/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(function(data) {
      console.log(data); //error
    });
  };
  //helper method for checking empty object(tasks)
  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  goToReport = () => {
    console.log("test repot");
    this.props.history.push(`/report/`);
    // 1. stop the form from submitting
  };
  // handleDate = () => {
  //   let today = new Date();
  //   //today.toLocaleDateString("en-US");
  //   let h = today.getHours();
  //   let m = today.getMinutes();
  //   let date = today.getDate();
  //   let month = today.getMonth() + 1; //January is 0!
  //   let year = today.getFullYear();
  //   let ampm = h >= 12 ? "pm" : "am";
  //   if (date < 10) {
  //     date = "0" + date;
  //   }
  //   if (month < 10) {
  //     month = "0" + month;
  //   }
  //   today = month + "/" + date + "/" + year + "/" + h + ":" + m + ampm;
  //   console.log(today);
  // };

  addTask = task => {
    const tasks = { ...this.state.tasks };
    tasks[`task${Date.now()}`] = task;
    this.setState({
      tasks
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
        <Popup />
        <h1 className="App-title">Status Report</h1>
        {/* <div>
          {this.state.users.map((key, i) => {
            return <p key={i}>{key.email}</p>;
          })}
        </div> */}
        <div className="guide">
          <button onClick={this.goToReport}>Report</button>
          <button>Course Help Guide</button>
          <button>Administration Help Guide</button>
        </div>

        <Forms
          addTask={this.addTask}
          sumHours={this.sumHours}
          taskType={this.state.taskType}
          selectTask={this.selectTask}
        />

        <Tasks
          tasks={this.state.tasks}
          removeTask={this.removeTask}
          details={this.state.tasks}
          taskType={this.state.taskType}
          totalHours={this.state.totalHours}
          date={this.state.date}
          handleSubmit={this.handleSubmit}
          handleDate={this.handleDate}
        />
      </div>
    );
  }
}

export default App;
