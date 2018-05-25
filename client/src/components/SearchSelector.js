import React, { Component } from "react";
class SearchSelector extends Component {
  render() {
    return (
      <div className="taskSelector">
        <button onClick={() => this.props.selectSearch("user")}>User</button>
        <button onClick={() => this.props.selectSearch("program")}>
          Program
        </button>
      </div>
    );
  }
}

export default SearchSelector;
