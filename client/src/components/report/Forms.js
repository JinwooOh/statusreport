/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import AddForm from './AddForm';
import TaskSelector from './TaskSelector';

class Forms extends Component {
  render() {
    const taskType = this.props.taskType === 'admin' ? 'Admin Task' : 'Course Task';
    return (
      <div className="form-list form-list--report">
        <TaskSelector selectTask={this.props.selectTask} />
        <h2 className="center heading-primary">{taskType}</h2>
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
