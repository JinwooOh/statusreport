// chart that is used in course Search

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';

// chart for user search summary
class CourseBar extends Component {
  render() {
    const { courseTypeResult } = this.props;
    console.log(courseTypeResult);
    const courseData = {
      labels: [courseTypeResult[0].name, courseTypeResult[1].name, courseTypeResult[2].name],
      datasets: [
        {
          data: [courseTypeResult[0].total, courseTypeResult[1].total, courseTypeResult[2].total],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };

    // // iterate object
    // for (const program in programList) {
    //   if (Object.prototype.hasOwnProperty.call(programList, program)) {
    //     courseData.labels.push(program); // name of the program
    //     courseData.datasets[0].data.push(programList[program].total); // total hours for the program
    //   }
    // }

    return (
      <div>
        <Bar data={courseData} />
      </div>
    );
  }
}

export default CourseBar;

CourseBar.propTypes = {
  courseTypeResult: PropTypes.object.isRequired,
};
