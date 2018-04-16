import React from "react";

class AddForm extends React.Component {
  //course task
  programRef = React.createRef();
  hoursRef = React.createRef();
  typeRef = React.createRef();
  dateRef = React.createRef();
  instructorRef = React.createRef();
  categoryRef = React.createRef();
  //admin task
  categoryAdminRef = React.createRef();

  createTask = event => {
    event.preventDefault();
    const task = {
      //course form
      taskType: "Course Task", // type of course
      program: this.programRef.current.value,
      hours: parseFloat(this.hoursRef.current.value),
      type: this.typeRef.current.value,
      date: this.dateRef.current.value,
      instructor: this.instructorRef.current.value,
      category: this.categoryRef.current.value
    };
    this.props.sumHours(this.hoursRef.current.value);
    this.props.addTask(task);
    event.currentTarget.reset();
  };
  createTask_admin = event => {
    event.preventDefault();
    const task = {
      //admin form
      taskType: "Adminstration Task",
      category: this.categoryAdminRef.current.value,
      hours: parseFloat(this.hoursRef.current.value),
      date: this.dateRef.current.value
    };
    this.props.sumHours(this.hoursRef.current.value);
    this.props.addTask(task);
    event.currentTarget.reset();
  };

  addDate = () => {
    const x = document.createElement("INPUT");
    x.setAttribute("type", "date");
  };
  render() {
    //admin form
    if (this.props.taskType === "admin") {
      return (
        <form className="task-edit" onSubmit={this.createTask_admin}>
          <p>Date</p>
          <input name="date" ref={this.dateRef} type="date" required />
          <p>Select One of the Categories</p>
          <select name="type" ref={this.categoryAdminRef}>
            <option value="Meeting">Meeting</option>
            <option value="Leave">Leave</option>
          </select>
          <p>Please input hours for this task</p>
          <input
            name="hours"
            ref={this.hoursRef}
            type="text"
            placeholder="hours"
            required
          />
          <br />
          <button type="submit">Add Task</button>
        </form>
      );
    }
    //course form
    return (
      <form className="task-edit" onSubmit={this.createTask}>
        <p>Date</p>
        <input name="date" ref={this.dateRef} type="date" required />

        <p>Select the Course Task Type</p>
        <select name="type" ref={this.typeRef}>
          <option value="New Course">New Course</option>
          <option value="Course Maintenance">Course Maintenance</option>
          <option value="Course Live Support">Course Live Support</option>
        </select>

        <p>Select the Program</p>
        <input
          name="program"
          ref={this.programRef}
          type="text"
          placeholder="Programe name"
        />

        <p>Select the Instructor</p>
        <input
          name="instructor"
          ref={this.instructorRef}
          type="text"
          placeholder="Instructor name"
        />

        <p>Select One of the Categories</p>
        <select name="type" ref={this.categoryRef}>
          <option value="Content Development">Content Development</option>
          <option value="Media Production">Media Production</option>
          <option value="Quality Control">Quality Control</option>
        </select>

        <p>Please input hours for this task</p>
        <input
          name="hours"
          ref={this.hoursRef}
          type="text"
          placeholder="hours"
          required
        />
        <br />
        <button type="submit">Add Task</button>
      </form>
    );
  }
}

export default AddForm;
