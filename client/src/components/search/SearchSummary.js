import React from 'react';

class SearchSummary extends React.Component {
  render() {
    return (
      <div className="searchSummary searchSummary--report">
        <h2 className="heading-primary">Summary</h2>
        <p>Total hours for admin task: </p>

        <button
          className="btn btn__summary"
          onClick={() => {
            window.print();
          }}
        >
          Print this page
        </button>
      </div>
    );
  }
}
export default SearchSummary;
