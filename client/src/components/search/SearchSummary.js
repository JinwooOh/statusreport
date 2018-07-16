import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { dateFormat } from '../helper/Helper';

class SearchSummary extends React.Component {
  renderCourseTotal = () => {
    // Extract unique courseNumber as Object
    let courseNumberListTemp = []; //
    courseNumberListTemp = [...new Set(this.props.searchProgram.map(task => task.courseNumber))];

    // Array to Obj
    const courseNumberList = courseNumberListTemp.reduce((obj, v) => {
      obj[v] = {
        total: 0,
        list: [
          { name: 'Faculty Consultation', total: 0 },
          { name: 'Content Development', total: 0 },
          { name: 'CMS Layout', total: 0 },
          { name: 'ISD Time', total: 0 },
          { name: 'Media Production', total: 0 },
          { name: 'Quality Control', total: 0 },
        ],
      };
      return obj;
    }, {});

    // calculate each courseNumber total hour
    this.props.searchProgram.forEach(task => {
      for (const property in courseNumberList) {
        if (task.courseNumber === property) {
          // total hours for a course
          courseNumberList[property].total += task.hours;
          // total hours for each course category
          const result = courseNumberList[property].list.find(cat => cat.name === task.courseCat);
          result.total += task.hours;
        }
      }
    });

    return Object.keys(courseNumberList).map((key, index) => {
      return (
        <div>
          <li key={index}>
            <div className="searchSummary__courseNumber">
              <span className="searchSummary__courseNumber--heading">
                {key} : {courseNumberList[key].total}{' '}
              </span>
            </div>
            {courseNumberList[key].list.map(cat => {
              return (
                <p className="searchSummary__courseCat">
                  {cat.name}: {cat.total}
                </p>
              );
            })}
          </li>
        </div>
      );
    });
  };

  renderUserCourseTotal = () => {
    const userCourse = {
      list: [
        { name: 'Faculty Consultation', total: 0 },
        { name: 'Content Development', total: 0 },
        { name: 'CMS Layout', total: 0 },
        { name: 'ISD Time', total: 0 },
        { name: 'Media Production', total: 0 },
        { name: 'Quality Control', total: 0 },
      ],
    };
    this.props.searchCourse.forEach(task => {
      for (const property of userCourse.list) {
        if (property.name === task.courseCat) {
          // total hours for each course category
          const result = userCourse.list.find(cat => cat.name === task.courseCat);
          result.total += task.hours;
        }
      }
    });

    return (
      <div>
        <div className="searchSummary__courseNumber">
          <span className="searchSummary__courseNumber--heading">
            Course Total Hours: {this.props.totalHours.course}
          </span>
        </div>
        {userCourse.list.map(cat => {
          return (
            <li>
              <p className="searchSummary__courseCat">
                {cat.name}: {cat.total}
              </p>
            </li>
          );
        })}
      </div>
    );
  };
  renderUserAdminTotal = () => {
    const userAdmin = {
      list: [
        { name: 'Leave', total: 0 },
        { name: 'Meeting', total: 0 },
        { name: 'Professional Development', total: 0 },
        { name: 'Project Management', total: 0 },
        { name: 'Purchasing', total: 0 },
        { name: 'Reporting', total: 0 },
        { name: 'Students', total: 0 },
        { name: 'Support', total: 0 },
        { name: 'Special Projects', total: 0 },
      ],
    };
    this.props.searchAdmin.forEach(task => {
      for (const property of userAdmin.list) {
        if (property.name === task.adminCat) {
          // total hours for each course category
          const result = userAdmin.list.find(cat => cat.name === task.adminCat);
          result.total += task.hours;
        }
      }
    });
    return (
      <div>
        <div className="searchSummary__courseNumber">
          <span className="searchSummary__courseNumber--heading">
            Administration Total Hours: {this.props.totalHours.admin}
          </span>
        </div>
        {userAdmin.list.map(cat => {
          return (
            <li>
              <p className="searchSummary__courseCat">
                {cat.name}: {cat.total}
              </p>
            </li>
          );
        })}
      </div>
    );
  };

  // Replace date format for yyyy-mm-dd to mm/dd/yyyy
  renderSearchInfo = () => {
    // ///////////////
    // user search //
    // ///////////////
    // calculate dates between two dates
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(this.props.summaryInfo.startDate);
    const secondDate = new Date(this.props.summaryInfo.endDate);
    const diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay));

    if (this.props.searchType === 'user') {
      return (
        <Fragment>
          <li>Name: {this.props.summaryInfo.userID}</li>
          <li>
            Search range from {dateFormat(this.props.summaryInfo.startDate)} to{' '}
            {dateFormat(this.props.summaryInfo.endDate)}
          </li>
          <li>Number of days: {diffDays}</li>
        </Fragment>
      );
    }
    // /////////////////
    // course search //
    // /////////////////
    // course search with course number
    if (this.props.summaryInfo.courseProgram === undefined) {
      return (
        <Fragment>
          <li>Course number: {this.props.summaryInfo.courseNumber}</li>
          <li>
            Search range from {dateFormat(this.props.summaryInfo.startDate)} to{' '}
            {dateFormat(this.props.summaryInfo.endDate)}{' '}
          </li>
          <li>Number of days: {diffDays}</li>
        </Fragment>
      );
    }
    // course search with program name
    return (
      <Fragment>
        <li>Program: {this.props.summaryInfo.courseProgram}</li>
        <li>
          Search range from {this.props.summaryInfo.startDate} to {this.props.summaryInfo.endDate}{' '}
        </li>
        <li>Number of days: {diffDays}</li>
      </Fragment>
    );
  };

  render() {
    return (
      <div className="searchSummary searchSummary--report">
        <h2 className="heading-primary">Summary</h2>

        <div className="message__text">
          <h3 className="message__text--title">
            <span className="message__text--title-span">Search Information</span>
          </h3>

          <div className="message__text--summary">
            <ul>
              {this.props.summaryInfo.length === 0 ? (
                <Fragment /> // render nothing
              ) : (
                <Fragment>{this.renderSearchInfo()}</Fragment>
              )}
            </ul>
          </div>
        </div>

        <div className="message">
          <div className="message__text">
            <h3 className="message__text--title">
              <span className="message__text--title-span">Total hours</span>
            </h3>

            <div className="message__text--summary">
              <ul>
                {this.props.searchType === 'user' ? (
                  <Fragment>
                    <li>
                      {this.props.totalHours.course === 0 ? '' : this.renderUserCourseTotal()}
                    </li>

                    <li>{this.props.totalHours.admin === 0 ? '' : this.renderUserAdminTotal()}</li>
                  </Fragment>
                ) : (
                  <Fragment>
                    <li>
                      {this.props.totalHours.program === 0 ? (
                        ''
                      ) : (
                        <div>
                          Course Total Hours: {this.props.totalHours.program}
                          {this.renderCourseTotal()}
                        </div>
                      )}
                    </li>
                  </Fragment>
                )}
              </ul>
            </div>
          </div>

          <button
            className="btn btn__summary"
            onClick={() => {
              window.print();
            }}
          >
            Print this page
          </button>
        </div>
      </div>
    );
  }
}
export default SearchSummary;
SearchSummary.propTypes = {
  searchType: PropTypes.string.isRequired,
  totalHours: PropTypes.shape({
    admin: PropTypes.number,
    course: PropTypes.number,
    program: PropTypes.number,
  }).isRequired,
  summaryInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  searchProgram: PropTypes.array.isRequired,
};
