import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { dateFormat } from '../helper/Helper';

class SearchSummary extends React.Component {
  // Replace date format for yyyy-mm-dd to mm/dd/yyyy

  // it has 3 cases to render
  renderSearchInfo = () => {
    // user search
    if (this.props.searchType === 'user') {
      return (
        <Fragment>
          <li>Name: {this.props.summaryInfo.userID}</li>
          <li>
            Search range from {dateFormat(this.props.summaryInfo.startDate)} to{' '}
            {dateFormat(this.props.summaryInfo.endDate)}{' '}
          </li>
        </Fragment>
      );
    }
    // course search with course number
    if (this.props.summaryInfo.courseProgram === undefined) {
      return (
        <Fragment>
          <li>Course number: {this.props.summaryInfo.courseNumber}</li>
          <li>
            Search range from {dateFormat(this.props.summaryInfo.startDate)} to{' '}
            {dateFormat(this.props.summaryInfo.endDate)}{' '}
          </li>
        </Fragment>
      );
    }
    // course search with course name
    return (
      <Fragment>
        <li>Program: {this.props.summaryInfo.courseProgram}</li>
        <li>
          Search range from {this.props.summaryInfo.startDate} to {this.props.summaryInfo.endDate}{' '}
        </li>
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
                    <li>Course Total Hours: {this.props.totalHours.course} </li>
                    <li>Administration Total Hours: {this.props.totalHours.admin}</li>
                  </Fragment>
                ) : (
                  <Fragment>
                    <li>Course Total Hours: {this.props.totalHours.program} </li>
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
};
