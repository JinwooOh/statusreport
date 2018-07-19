import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';

class EditName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      curName: {},
      nameList: [], // for naming guide
      program: '', // updated name by user
      course: '', // updated name by user
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
  programRef = React.createRef();
  courseRef = React.createRef();

  handleOpen = p => {
    this.setState({ open: true, curName: p });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  createNewName = event => {
    event.preventDefault();
    // it might not need to update state
    this.setState({
      program: this.programRef.current.value,
      course: this.courseRef.current.value,
    });
    const data = {
      program: this.programRef.current.value,
      course: this.courseRef.current.value,
      curName: this.state.curName,
    };
    // updating new name
    const nameId = this.state.curName.id;
    const urlName = `/editname/${nameId}`;
    fetch(urlName, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(() => {
      console.log('updated'); // error
    });
    // refetch to rerender updated nameList
    fetch('/name')
      .then(response => response.json())
      .then(findresponse => {
        this.setState({
          nameList: [...findresponse],
        });
      })
      .catch(err => console.log(err));
    event.currentTarget.reset();
  };

  // inside of the dialog popup
  handleEdit = () => {
    return (
      <div className="message">
        <h2 className="message__heading">Current name</h2>
        <p>Program: {this.state.curName.program}</p>
        <p>Courses: {this.state.curName.course}</p>

        <h2 className="message__heading">Edit name</h2>

        <form className="task-edit" onSubmit={this.createNewName}>
          <span>Program</span>
          <input name="Program" ref={this.programRef} type="text" placeholder="Program name" />

          <span>Course</span>
          <input name="Course" ref={this.courseRef} type="text" placeholder="Course name" />
          <div className="center">
            <button className="btn btn__summary" type="submit">
              Change Name
            </button>
          </div>
        </form>
      </div>
    );
  };

  render() {
    const actions = [
      <button className="btn btn__guide btn__guide--inPopup" onClick={this.handleClose}>
        OK
      </button>,
    ];
    return (
      <div className="wrapper">
        <MuiThemeProvider>
          <Dialog
            title="Edit the Name"
            autoScrollBodyContent
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            {this.handleEdit()}
          </Dialog>
        </MuiThemeProvider>
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
                        {p.program}: {p.course}{' '}
                        <button className="btn btn__remove" onClick={() => this.handleOpen(p)}>
                          Edit
                        </button>
                        <button className="btn btn__remove">remove</button>
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
