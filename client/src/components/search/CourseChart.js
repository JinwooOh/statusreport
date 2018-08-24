import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Polar } from 'react-chartjs-2';

// chart for user search summary
class CourseChart extends Component {
  render() {
    console.log(this.props.programList);
    // const courseData = {
    //   labels: [
    //     // this.props.courseList.list[0].name,
    //     // this.props.courseList.list[1].name,
    //     // this.props.courseList.list[2].name,
    //     // this.props.courseList.list[3].name,
    //     // this.props.courseList.list[4].name,
    //   ],
    //   datasets: [
    //     {
    //       data: [
    //         // this.props.courseList.list[0].total,
    //         // this.props.courseList.list[1].total,
    //         // this.props.courseList.list[2].total,
    //         // this.props.courseList.list[3].total,
    //         // this.props.courseList.list[4].total,
    //       ],
    //       backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#ff9063', '#63d2ff'],
    //       hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#ff9063', '#63d2ff'],
    //     },
    //   ],
    // };

    return <div>{/* <Polar data="" /> */}</div>;
  }
}

export default CourseChart;

// CourseChart.propTypes = {
//   courseList: PropTypes.array.isRequired,
// };
