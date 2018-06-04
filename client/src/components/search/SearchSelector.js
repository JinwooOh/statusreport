/* eslint react/prop-types: 0 */
import React, { Component } from 'react';

class SearchSelector extends Component {
  render() {
    return (
      <div className="taskSelector">
        <button className="btn btn__taskSelector" onClick={() => this.props.selectSearch('user')}>
          User
        </button>
        <button
          className="btn btn__taskSelector"
          onClick={() => this.props.selectSearch('program')}
        >
          Program
        </button>
      </div>
    );
  }
}

export default SearchSelector;
