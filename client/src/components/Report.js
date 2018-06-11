/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SearchType from './search//SearchType';
import SearchResult from './search/SearchResult';
// import Popup from "react-popup";
import { isEmpty } from './helper/Helper';
import { search } from './helper/Message';
import Popup from './Popup';
import SearchSummary from './search/SearchSummary';

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType: 'user', // or program
      searchOptions: {}, // search options from SearchType

      searchAdmin: [], // result of search by user
      searchCourse: [], // result search by user
      searchProgram: [], // result search by user
      programSearchType: 'Program', // flag for program search, program number serarch
      // keep tracking total hours from the result of search
      totalHours: {
        admin: 0, // for user search
        course: 0, // for user search
        program: 0, // for course search
      },
      summaryInfo: [], // summary info for searchSummary component
      admintable: [], // consider to delete...
      coursetable: [], // consider to delete...
    };
  }

  componentDidMount() {
    // fetch admintable from database
    // consider to delete...
    fetch('/admintable')
      .then(res => res.json())
      .then((admintable) => {
        this.setState({ admintable });
      })
      .catch(error => console.error('fetch error at admintable', error)); // error
    // fetch coursetable from database
    fetch('/coursetable')
      .then(res => res.json())
      .then((coursetable) => {
        this.setState({ coursetable });
      })
      .catch(error => console.error('fetch error at coursetable', error)); // error

    // localStorage for admintable/coursetable
    const localStorageRefAdmin = localStorage.getItem('admintable');
    const localStorageRefCourse = localStorage.getItem('coursetable');
    if (localStorageRefAdmin) {
      this.setState({ admintable: JSON.parse(localStorageRefAdmin) });
    }
    if (localStorageRefCourse) {
      this.setState({ coursetable: JSON.parse(localStorageRefCourse) });
    }
  }

  componentDidUpdate() {
    // localStorage for admintable/coursetable
    localStorage.setItem('adminTable', JSON.stringify(this.state.admintable));
    localStorage.setItem('courseTable', JSON.stringify(this.state.coursetable));
    // ready for search

    if (!isEmpty(this.state.searchOptions)) {
      this.handleSearch();
    }
  }

  selectSearch = (searchType) => {
    this.setState({ searchType });
  };
  addSearchOptions = (searchOptions) => {
    this.setState({
      searchOptions,
    });
  };
  programSearchType = (programSearchType) => {
    this.setState({ programSearchType });
  };
  handleSearch = () => {
    const {
      userID, startDate, endDate, courseProgram, courseNumber,
    } = this.state.searchOptions;

    // Search user
    if (this.state.searchType === 'user') {
      const urlCourse = `/search/coursetable/${userID}/${startDate}/${endDate}`;
      const urlAdmin = `/search/admintable/${userID}/${startDate}/${endDate}`;
      fetch(urlCourse)
        .then(res => res.json())
        .then((json) => {
          console.info('Course result:', json);
          // calculate total hours for course task
          let totalHoursCourse = 0;
          Object.keys(json).forEach((key) => {
            totalHoursCourse += json[key].hours;
          });
          // setState both searchCourse and totalHours
          this.setState({
            searchCourse: json,
            totalHours: { ...this.state.totalHours, course: totalHoursCourse },
          });
        })
        .catch(error => console.error('fetch error at search', error)); // error
      fetch(urlAdmin)
        .then(res => res.json())
        .then((json) => {
          console.info('Admin result:', json);
          let totalHoursAdmin = 0;
          Object.keys(json).forEach((key) => {
            totalHoursAdmin += json[key].hours;
          });
          this.setState({
            searchAdmin: json,
            totalHours: { ...this.state.totalHours, admin: totalHoursAdmin },
          });
        })
        .catch(error => console.error('fetch error at search', error)); // error
    } else {
      // Search program
      const urlProgram =
        this.state.programSearchType === 'Program'
          ? `/search/program/${courseProgram}/${startDate}/${endDate}`
          : `/search/programNumber/${courseNumber}/${startDate}/${endDate}`;
      fetch(urlProgram)
        .then(res => res.json())
        .then((json) => {
          console.info('Program result:', json);
          let totalHoursProgram = 0;
          Object.keys(json).forEach((key) => {
            totalHoursProgram += json[key].hours;
          });
          this.setState({
            searchProgram: json,
            totalHours: { ...this.state.totalHours, program: totalHoursProgram },
          });
        })
        .catch(error => console.error('fetch error at search', error)); // error
    }

    this.setState({
      // update summary info
      summaryInfo: {
        userID,
        startDate,
        endDate,
        courseProgram,
        courseNumber,
      },
      // clear state
      searchOptions: {},
    });
  };

  render() {
    return (
      <div className="wrapper">
        {/* <Popup closeBtn={false} /> */}

        <h1 className="App-title">Search Database</h1>
        <div className="guide">
          <MuiThemeProvider>
            <div className="guide guide__popup">
              <Popup title="Search Guide" text={search()} />
            </div>
          </MuiThemeProvider>
          <button
            className="btn btn__search"
            onClick={() => {
              this.props.history.push('/');
              // this.props.history.push('/all-status-reports/');
            }}
          >
            BACK TO REPORT PAGE
          </button>
          {/* <button onClick={() => this.handlePop("search-guide")}>
            Search Guide
          </button> */}
        </div>
        <SearchType
          selectSearch={this.selectSearch}
          searchType={this.state.searchType}
          addSearchOptions={this.addSearchOptions}
          handleSearch={this.handleSearch}
          programSearchType={this.programSearchType}
        />

        <SearchResult
          searchCourse={this.state.searchCourse}
          searchAdmin={this.state.searchAdmin}
          searchProgram={this.state.searchProgram}
          searchType={this.state.searchType}
        />
        <SearchSummary
          searchType={this.state.searchType}
          totalHours={this.state.totalHours}
          summaryInfo={this.state.summaryInfo}
        />
      </div>
    );
  }
}
export default Report;
