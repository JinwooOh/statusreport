import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';

// chart for user search summary
class CourseChart extends Component {
  render() {
    const courseData = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#ff9063', '#63d2ff'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#ff9063', '#63d2ff'],
        },
      ],
    };
    const { programList } = this.props;
    // iterate object
    for (const program in programList) {
      if (Object.prototype.hasOwnProperty.call(programList, program)) {
        courseData.labels.push(program); // name of the program
        courseData.datasets[0].data.push(programList[program].total); // total hours for the program
      }
    }
    console.log(courseData);
    return (
      <div>
        <Pie data={courseData} />
      </div>
    );
  }
}

export default CourseChart;

CourseChart.propTypes = {
  programList: PropTypes.object.isRequired,
};
