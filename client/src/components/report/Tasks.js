/* eslint react/prop-types: 0 */
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { dateFormat } from '../helper/Helper';
import UserSuggestion from '../helper/UserSuggestion';

class Tasks extends React.Component {
  handleUserName = userName => this.props.addUser(userName.trim()); // props to App

  renderTask = key => {
    const task = this.props.tasks[key];
    // loop through each task's category for the gap
    const renderItem = Object.keys(task).map(item => {
      if (task[item] === '') {
        return '';
      } else if (item === 'taskType') {
        return (
          <span key={item} className="tasks-list-gap">
            {task[item]}
            {': '}
          </span>
        );
      } else if (item === 'hours') {
        return (
          <span key={item} className="tasks-list-gap">
            {task[item]} hours
          </span>
        );
      } else if (item === 'date') {
        return (
          <span key={item} className="tasks-list-gap">
            {dateFormat(task[item])}
          </span>
        );
      }
      return (
        <span key={item} className="tasks-list-gap">
          {task[item]}
        </span>
      );
    });
    return (
      <CSSTransition key={key} in classNames="summary" appear timeout={1000}>
        <li className="summary__list" key={key}>
          {renderItem}
          <button className="btn btn__remove" onClick={() => this.props.removeTask(key)}>
            Remove
          </button>
        </li>
      </CSSTransition>
    );
  };

  render() {
    const taskIds = Object.keys(this.props.tasks);
    const count = this.props.totalHours;
    return (
      <div className="summary summary--report">
        <h2 className="heading-primary">Summary</h2>
        <ol className="tasks-list">{taskIds.map(this.renderTask)}</ol>
        <div className="summary-info">
          <p style={{ display: 'inline' }}>Total Hours: </p>
          <TransitionGroup component="span" className="text-totalHours">
            <CSSTransition
              classNames="text-totalHours"
              timeout={{ enter: 1000, exit: 100 }}
              key={count}
            >
              <span className="text-totalHours">{this.props.totalHours}</span>
            </CSSTransition>
          </TransitionGroup>
          <p>{this.props.date.toString()}</p>

          <UserSuggestion
            handleUserName={this.handleUserName}
            userName={this.props.userName}
            required
          />
        </div>

        <button className="btn btn__summary" onClick={this.props.handleSubmit}>
          Submit
        </button>
        <button
          className="btn btn__summary"
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
