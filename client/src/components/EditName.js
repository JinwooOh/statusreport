import React from 'react';
import PropTypes from 'prop-types';

class EditName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameList: [], // for naming guide
    };
  }

  componentDidMount() {
    fetch('/name')
      .then(response => response.json())
      .then(findresponse => {
        this.setState({
          nameList: [...findresponse],
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="wrapper">
        <h1 className="App-title">Edit Naming Guide </h1>
        <div className="guide">
          <button
            className="btn btn__search"
            onClick={() => {
              if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                this.props.history.push('/');
              } else {
                // production code
                this.props.history.push('/all-status-reports/');
              }
            }}
          >
            BACK TO REPORT PAGE
          </button>

          <div className="form-list form-list--report">
            <div className="message__text">
              <div className="message__text--body">
                <ul>
                  {this.state.nameList.map((p, i) => {
                    return (
                      <li key={i} style={{ wordSpacing: '3px' }}>
                        {p.program}: {p.course} <button className="btn btn__remove">Edit</button>
                      </li>
                    );
                  })}
                </ul>

                <div className="center">
                  <button className="btn btn__summary">Add New Course</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditName;
EditName.propTypes = {
  history: PropTypes.object.isRequired,
};
