//sandbox for google material-UI
import React from "react";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";

class TaskCard extends React.Component {
  renderTask = key => {
    const task = this.props.tasks[key];

    return (
      <Card key={key}>
        <CardHeader
          title={task.taskType}
          // subtitle={}
          actAsExpander={true}
          showExpandableButton={true}
        />

        <CardText expandable={true}>
          <p>Date: {task.date}</p>
          <p>Course Type: {task.type}</p>
          <p>Program: {task.program}</p>
          <p>Instructor: {task.instructor}</p>
          <p>CourseNumber: {task.courseNumber}</p>
          <p>Category: {task.category}</p>
          <p>Hours: {task.hours} hours</p>
        </CardText>
        <CardActions>
          <FlatButton
            label="Remove"
            onClick={() => this.props.removeTask(key)}
          />
        </CardActions>
      </Card>
    );
  };

  render() {
    const taskIds = Object.keys(this.props.tasks);
    return <ol className="tasks-list">{taskIds.map(this.renderTask)}</ol>;
  }
}
export default TaskCard;
