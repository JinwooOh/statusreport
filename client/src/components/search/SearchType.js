/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import SearchSelector from './SearchSelector';
import SearchForm from './SearchForm';

class SearchType extends Component {
  render() {
    const searchType = this.props.searchType === 'user' ? 'Search by User' : 'Search by Program';
    return (
      <div className="form-list form-list--search">
        <SearchSelector selectSearch={this.props.selectSearch} />
        <h2 className="heading-primary center">{searchType}</h2>
        <SearchForm
          searchType={this.props.searchType}
          addSearchOptions={this.props.addSearchOptions}
          handleSearch={this.props.handleSearch}
        />
      </div>
    );
  }
}

export default SearchType;
