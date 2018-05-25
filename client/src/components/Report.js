import React, { Component } from "react";
import SearchType from "./SearchType";
import SearchResult from "./SearchResult";
import Popup from "react-popup";
import { isEmpty } from "./Helper";

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType: "user", //or program
      searchOptions: {},
      admintable: [],
      coursetable: []
    };
  }

  componentDidMount() {
    //fetch admintable from database
    fetch("/admintable")
      .then(res => res.json())
      .then(admintable => {
        this.setState({ admintable });
      })
      .catch(error => console.error("fetch error at admintable", error)); //error
    //fetch coursetable from database
    fetch("/coursetable")
      .then(res => res.json())
      .then(coursetable => {
        this.setState({ coursetable });
      })
      .catch(error => console.error("fetch error at coursetable", error)); //error

    //localStorage for admintable/coursetable
    const localStorageRefAdmin = localStorage.getItem("admintable");
    const localStorageRefCourse = localStorage.getItem("coursetable");
    if (localStorageRefAdmin) {
      this.setState({ admintable: JSON.parse(localStorageRefAdmin) });
    }
    if (localStorageRefCourse) {
      this.setState({ coursetable: JSON.parse(localStorageRefCourse) });
    }
  }

  componentDidUpdate() {
    //localStorage for admintable/coursetable
    localStorage.setItem("adminTable", JSON.stringify(this.state.admintable));
    localStorage.setItem("courseTable", JSON.stringify(this.state.coursetable));
    //ready for search
    if (!isEmpty(this.state.searchOptions)) {
      this.handleSearch();
    }
  }

  selectSearch = searchType => {
    this.setState({ searchType });
  };
  addSearchOptions = searchOptions => {
    this.setState({
      searchOptions
    });
  };
  handlePop = e => {
    if (e === "search-guide") {
      let mySpecialPopup = Popup.register({
        title: "Information",
        content: (
          <div>
            <p>1. Select search type</p>
            <p>2. Fills inputs</p>
            <p>3. Clicks the "Search" button </p>
          </div>
        ),
        buttons: {
          right: ["ok"]
        }
      });
      Popup.queue(mySpecialPopup);
      return;
    }
  };

  handleSearch = () => {
    let userID = this.state.searchOptions.user;
    let startDate = this.state.searchOptions.startDate;
    let endDate = this.state.searchOptions.endDate;

    let url = `/search/${userID}/${startDate}/${endDate}`;
    fetch(url)
      .then(res => res.json())
      .then(json => {
        console.info(json);
      })
      .catch(error => console.error("fetch error at search", error)); //error
  };

  render() {
    return (
      <div className="wrapper">
        <Popup closeBtn={false} />
        <h1 className="App-title">Search Database</h1>
        <div className="guide">
          <button
            className="btn-back"
            onClick={() => {
              this.props.history.push(`/`);
            }}
          >
            Back to Report Page
          </button>
          <button onClick={() => this.handlePop("search-guide")}>
            Search Guide
          </button>
        </div>
        <SearchType
          selectSearch={this.selectSearch}
          searchType={this.state.searchType}
          addSearchOptions={this.addSearchOptions}
          handleSearch={this.handleSearch}
        />
        <SearchResult />
        {/* {this.state.admintable.map(admin => {
          return (
            <div>
              <p>{admin.completionDate}</p>
              <p>{admin.subDate}</p>
              <p>{admin.hour}</p>
              <p>{admin.adminCat}</p>
              <p>{admin.userID}</p>
            </div>
          );
        })} */}
      </div>
    );
  }
}

export default Report;
