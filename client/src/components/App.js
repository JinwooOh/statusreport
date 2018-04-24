import React from "react";
import Forms from "./Forms";
import Tasks from "./Tasks";
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
    fetch("/users")
      .then(res => res.json())
      .then(users => this.setState({ users: users }));
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
  //need to work on this; decide which data to submit
  handleSubmit = () => {
    //console.log(this.state.tasks);
    let data = this.state.totalHours;
    console.log(data);
    fetch("/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(function(data) {
      console.log(data);
    });
  };

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

  render() {
    return (
      <div className="wrapper">
        <h1 className="App-title">Status Report</h1>
        <div>
          {this.state.users.map((key, i) => {
            return <p key={i}>{key.email}</p>;
          })}
        </div>
        <div className="guide">
          <button>Course Help Guide</button>
          <button>Administration Help Guide</button>
        </div>
        {/* <TaskSelector selectTask={this.selectTask} /> */}
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
          handleDate={this.handleDate}
          date={this.state.date}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default App;
