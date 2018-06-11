/* eslint react/prop-types: 0 */
import React, { Fragment } from 'react';

class SearchSummary extends React.Component {
  render() {
    return (
      <div className="searchSummary searchSummary--report">
        <h2 className="heading-primary">Summary</h2>

        <div className="message">
          <div className="message__text">
            <h3 className="message__text--title">
              <span className="message__text--title-span">Total hours</span>
            </h3>

            <div className="message__text--body">
              <ul>
                {this.props.searchType === 'user' ? (
                  <Fragment>
                    <li className="summary-box__totalHour">
                      Administration Total Hours: {this.props.totalHours.admin}
                    </li>
                    <li className="summary-box__totalHour">
                      Course Total Hours: {this.props.totalHours.course}{' '}
                    </li>
                  </Fragment>
                ) : (
                  <li className="summary-box__totalHour">
                    Program Total Hours: {this.props.totalHours.program}{' '}
                  </li>
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
