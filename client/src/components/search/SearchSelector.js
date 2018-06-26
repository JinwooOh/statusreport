import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
          Course
        </button>
      </div>
    );
  }
}

export default SearchSelector;
SearchSelector.propTypes = {
  selectSearch: PropTypes.func.isRequired,
};
