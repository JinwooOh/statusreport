import React, { Component } from "react";
import AddForm from "./AddForm";
import TaskSelector from "./TaskSelector";

class Forms extends Component {
  render() {
    if (this.props.taskType === "admin") {
      return (
        <div className="form-list">
          <h2 className="center">Admin task</h2>
          <AddForm
            addTask={this.props.addTask}
            sumHours={this.props.sumHours}
            taskType={this.props.taskType}
          />
        </div>
      );
    }
    return (
      <div className="form-list">
        <h2 className="center">Course task</h2>

        <AddForm
          addTask={this.props.addTask}
          sumHours={this.props.sumHours}
          taskType={this.props.taskType}
        />
      </div>
    );
  }
}

export default Forms;
