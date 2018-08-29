// chart that is used in user Search
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Polar } from 'react-chartjs-2';

// chart for user search summary
class UserChart extends Component {
  render() {
    const courseData = {
      labels: [
        this.props.courseList.list[0].name,
        this.props.courseList.list[1].name,
        this.props.courseList.list[2].name,
        this.props.courseList.list[3].name,
        this.props.courseList.list[4].name,
      ],
      datasets: [
        {
          data: [
            this.props.courseList.list[0].total,
            this.props.courseList.list[1].total,
            this.props.courseList.list[2].total,
            this.props.courseList.list[3].total,
            this.props.courseList.list[4].total,
          ],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#ff9063', '#63d2ff'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#ff9063', '#63d2ff'],
        },
      ],
    };
    console.log(courseData);
    // const { courseList, adminList } = this.props;
    // courseList.list.forEach(course => {
    //   courseData.labels.push(course.name);
    //   console.log(course.name);
    // });
    const adminData = {
      labels: [
        this.props.adminList.list[0].name,
        this.props.adminList.list[1].name,
        this.props.adminList.list[2].name,
        this.props.adminList.list[3].name,
        this.props.adminList.list[4].name,
        this.props.adminList.list[5].name,
        this.props.adminList.list[6].name,
        this.props.adminList.list[7].name,
        this.props.adminList.list[8].name,
      ],
      datasets: [
        {
          data: [
            this.props.adminList.list[0].total,
            this.props.adminList.list[1].total,
            this.props.adminList.list[2].total,
            this.props.adminList.list[3].total,
            this.props.adminList.list[4].total,
            this.props.adminList.list[5].total,
            this.props.adminList.list[6].total,
            this.props.adminList.list[7].total,
            this.props.adminList.list[8].total,
          ],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#ff9063',
            '#63d2ff',
            '#6384ff',
            '#367700',
            '#d2ff63',
            '#a40a3c',
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#ff9063',
            '#63d2ff',
            '#6384ff',
            '#367700',
            '#d2ff63',
            '#a40a3c',
          ],
        },
      ],
    };
    if (this.props.renderType === 'course') {
      return (
        <div>
          <Polar data={courseData} />
        </div>
      );
    }
    return (
      <div>
        <Polar data={adminData} />
      </div>
    );
  }
}

export default UserChart;

UserChart.propTypes = {
  courseList: PropTypes.object.isRequired,
  adminList: PropTypes.object.isRequired,
  renderType: PropTypes.string.isRequired,
};
