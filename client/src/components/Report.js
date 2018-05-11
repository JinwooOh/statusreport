import React, { Component } from "react";
import Autosuggest from "react-autosuggest";

let userData = [{}];
// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : userData.filter(
        user =>
          user.instructor.toLowerCase().slice(0, inputLength) === inputValue
      );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.instructor;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => <div>{suggestion.instructor}</div>;

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      suggestions: [],
      users: [] //test purpose
    };
  }

  componentDidMount() {
    fetch("/courseinfo")
      .then(res => res.json())
      .then(users => {
        userData = users;
        this.setState({ users });
      })
      .catch(error => console.error("fetch error at componentDidMount", error)); //error
  }
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Type instructor name",
      value,
      onChange: this.onChange
    };
    return (
      <div className="form-list">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

export default Report;
