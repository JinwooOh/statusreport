import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TaskSelector extends Component {
  render() {
    return (
      <div className="taskSelector">
        <button className="btn btn__taskSelector" onClick={() => this.props.selectTask('course')}>
          Course
        </button>
        <button className="btn btn__taskSelector" onClick={() => this.props.selectTask('admin')}>
          Administration
        </button>
      </div>
    );
  }
}

export default TaskSelector;
TaskSelector.propTypes = {
  selectTask: PropTypes.func.isRequired,
};
