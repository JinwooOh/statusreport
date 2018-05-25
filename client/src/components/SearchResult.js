import React from "react";

class SearchResult extends React.Component {
  render() {
    return (
      <div className="summary">
        <h2>Search Result</h2>
        <button
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

export default SearchResult;
