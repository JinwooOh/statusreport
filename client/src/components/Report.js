import React, { Component } from "react";

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [] //test purpose
    };
  }
  componentDidMount() {
    fetch("/users")
      .then(res => res.json())
      .then(users => this.setState({ users: users }));
  }

  render() {
    return (
      <div className="form-list">
        <div>
          {this.state.users.map((key, i) => {
            return (
              <div>
                <p key={i}>
                  Name: {key.name} Email: {key.email}
                  <button>Search</button>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Report;
