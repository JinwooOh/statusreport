import React from "react";
import Forms from "./Forms";
import Tasks from "./Tasks";
import TaskSelector from "./TaskSelector";
class App extends React.Component {
  state = {
    tasks: {},
    totalHours: 0,
    taskType: "course" //or"admin"
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
    //console.log(Object.keys(this.state.tasks));
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
        <h1 className="App-title">Status Report</h1>
        <TaskSelector selectTask={this.selectTask} />

        <Forms
          addTask={this.addTask}
          sumHours={this.sumHours}
          taskType={this.state.taskType}
        />
        <Tasks
          tasks={this.state.tasks}
          removeTask={this.removeTask}
          details={this.state.tasks}
          taskType={this.state.taskType}
        />

        <div className="submit-button">
          <p>Total Hours: {this.state.totalHours}</p>
          <button>Submit</button>
        </div>
      </div>
    );
  }
}

export default App;
