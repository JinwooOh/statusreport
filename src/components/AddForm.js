import React from "react";

class AddForm extends React.Component {
  //course task
  programRef = React.createRef();
  hoursRef = React.createRef();
  courseTypeRef = React.createRef();
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
      courseType: this.courseTypeRef.current.value,
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
          <label>Date: </label>
          <input name="date" ref={this.dateRef} type="date" required />

          <p>Select One of the Categories</p>
          <select name="type" ref={this.categoryAdminRef}>
            <option value="Leave">Leave</option>
            <option value="Meeting">Meeting</option>
            <option value="Project Management">Project Management</option>
            <option value="Professional Development">
              Professional Development
            </option>
            <option value="Purchasing">Purchasing</option>
            <option value="Reporting">Reporting</option>
            <option value="Support">Support</option>
            <option value="Students">Students</option>
            <option value="Special Projects">Special Projects</option>
            <option value="Travel">Travel</option>
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
          <br />
          <button type="submit">Add Task</button>
        </form>
      );
    }
    //course form
    return (
      <form className="task-edit" onSubmit={this.createTask}>
        <label>Date: </label>
        <input name="date" ref={this.dateRef} type="date" required />

        <p>Select the Course Task Type</p>
        {/* <span>Select the Course Task Type</span> */}
        <select name="type" ref={this.courseTypeRef}>
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
        <br />
        <button type="submit">Add Task</button>
      </form>
    );
  }
}

export default AddForm;
