import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
class SearchResult extends React.Component {
  render() {
    const courseData = this.props.searchCourse;

    const courseColumns = [
      { Header: "Name", accessor: "userID" },
      { Header: "Submission date", accessor: "subDate" },
      { Header: "Completion date", accessor: "completionDate" },
      { Header: "Course task", accessor: "courseTask" },
      { Header: "Course program", accessor: "courseProgram" },
      { Header: "Course number", accessor: "courseNumber" },
      { Header: "Instructor", accessor: "courseInst" },
      { Header: "Course category", accessor: "courseCat" },
      { Header: "Hours", accessor: "hours" }
    ];

    return (
      <div className="summary summary--search">
        <h2 className="heading-primary">Search Result</h2>
        <ReactTable data={courseData} columns={courseColumns} />

        {/* <h3>Course Result</h3>
        {this.props.searchCourse.map(key => {
          return (
            <div>
              <p>{key.userID}</p>
              <p>{key.subDate}</p>
              <p>{key.completionDate}</p>
              <p>{key.courseTask}</p>
              <p>{key.courseProgram}</p>
              <p>{key.courseInst}</p>
              <p>{key.courseNumber}</p>
            </div>
          );
        })}

        <h3>Admin Result</h3>
        {this.props.searchAdmin.map(key => {
          return (
            <div>
              <p>{key.userID}</p>
              <p>{key.subDate}</p>
              <p>{key.completionDate}</p>
              <p>{key.adminCat}</p>
            </div>
          );
        })}

        <button
          onClick={() => {
            window.print();
          }}
        >
          Print this page
        </button> */}
      </div>
    );
  }
}

export default SearchResult;
