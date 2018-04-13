import React, { Component } from "react";
import AddForm from "./AddForm";
class Forms extends Component {
  render() {
    if (this.props.taskType === "admin") {
      return (
        <div>
          <h2>Admin task</h2>
          <AddForm
            addTask={this.props.addTask}
            sumHours={this.props.sumHours}
            taskType={this.props.taskType}
          />
        </div>
      );
    }
    return (
      <div>
        <h2>Course task</h2>
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
