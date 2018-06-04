/* eslint react/prop-types: 0 */
import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class SearchResult extends React.Component {
  render() {
    const courseData = this.props.searchCourse;
    const adminData = this.props.searchAdmin;
    const programData = this.props.searchProgram;
    console.log(programData);
    const courseColumns = [
      { Header: 'Name', accessor: 'userID' },
      { Header: 'Report date', accessor: 'subDate' },
      { Header: 'Completion date', accessor: 'completionDate' },
      { Header: 'Course task', accessor: 'courseTask' },
      { Header: 'Course program', accessor: 'courseProgram' },
      { Header: 'Course number', accessor: 'courseNumber' },
      { Header: 'Instructor', accessor: 'courseInst' },
      { Header: 'Course category', accessor: 'courseCat' },
      { Header: 'Hours', accessor: 'hours' },
    ];

    const adminColumns = [
      { Header: 'Name', accessor: 'userID' },
      { Header: 'Report date', accessor: 'subDate' },
      { Header: 'Completion date', accessor: 'completionDate' },
      { Header: 'Admin category', accessor: 'adminCat' },
      { Header: 'Hours', accessor: 'hours' },
    ];
    const programColumns = [
      { Header: 'Program', accessor: 'courseProgram' },
      { Header: 'Name', accessor: 'userID' },
      { Header: 'Report date', accessor: 'subDate' },
      { Header: 'Completion date', accessor: 'completionDate' },
      { Header: 'Number', accessor: 'courseNumber' },
      { Header: 'Instructor', accessor: 'courseInst' },
      { Header: 'Hours', accessor: 'hours' },
    ];

    if (this.props.searchType === 'user') {
      return (
        <div className="summary summary--search">
          <h2 className="heading-primary">Search Result</h2>
          <p className="table__p">Course task</p>
          <ReactTable data={courseData} columns={courseColumns} defaultPageSize={10} />
          <p className="table__p">Admin task</p>
          <ReactTable data={adminData} columns={adminColumns} defaultPageSize={10} />
        </div>
      );
    }
    return (
      <div className="summary summary--search">
        <h2 className="heading-primary">Search Result</h2>
        <p className="table__p">Program</p>
        <ReactTable data={programData} columns={programColumns} defaultPageSize={10} />
      </div>
    );
  }
}

export default SearchResult;
