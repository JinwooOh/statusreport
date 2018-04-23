import React, { Component } from "react";
class TaskSelector extends Component {
  render() {
    return (
      <div className="taskSelector">
        <p>Form: </p>
        <button onClick={() => this.props.selectTask("course")}>Course</button>
        <button onClick={() => this.props.selectTask("admin")}>
          Administration
        </button>
      </div>
    );
  }
}

export default TaskSelector;
