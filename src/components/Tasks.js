import React from "react";

class Tasks extends React.Component {
  renderTask = key => {
    const task = this.props.tasks[key];

    return (
      <li key={key}>
        <span>
          <p>{task.taskType}</p>
          <p>{task.type}</p>
          <p>{task.date}</p>
          <p>{task.category}</p>

          <p>Program: {task.program}</p>
          <p>Instructor: {task.instructor}</p>
          <p>{task.hours} hours</p>
          <button onClick={() => this.props.removeTask(key)}>Remove </button>
        </span>
      </li>
    );
  };
  render() {
    const taskIds = Object.keys(this.props.tasks);

    return (
      <div className="summary">
        <h3>Summary</h3>
        <ul className="tasks">{taskIds.map(this.renderTask)}</ul>
      </div>
    );
  }
}

export default Tasks;
