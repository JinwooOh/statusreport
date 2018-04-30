import React from "react";
import { CSSTransition } from "react-transition-group";

class Tasks extends React.Component {
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
            {": "} {task.type}
            {"  "} {task.category}
            {"  "} {task.program}
            {"  "} {task.instructor}
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
  };
  render() {
    const taskIds = Object.keys(this.props.tasks);
    return (
      <div className="summary">
        <h2>Summary</h2>
        <ol className="tasks-list">{taskIds.map(this.renderTask)}</ol>
        <p>Total Hours: {this.props.totalHours}</p>
        <p>{this.props.date.toString()}</p>
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
