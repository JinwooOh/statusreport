import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import withAuth from './withAuth';
import AuthService from './AuthService';

const Auth = new AuthService();

class EditName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      curName: {},
      nameList: [], // for naming guide
      type: '',
      success: false,
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

  handleOpen = (p, type) => {
    this.setState({ open: true, curName: p, type, success: false });
  };

  handleLogout = () => {
    Auth.logout();
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      this.props.history.push('/login/');
    } else {
      // production
      this.props.history.push('/all-status-reports/login/');
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleEditName = event => {
    event.preventDefault();
    // it might not need to update state

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
    })
      .then(() => {
        console.log('updated');
        // refetch to rerender updated nameList
        return fetch('/name');
      })
      .then(response => response.json())
      .then(findresponse => {
        this.setState({
          nameList: [...findresponse],
        });
      })
      .catch(err => console.log(err));

    this.setState({
      success: true,
    });
  };
  handleDeleteName = () => {
    const data = this.state.curName;
    const nameId = this.state.curName.id;
    const urlName = `/deletename/${nameId}`;
    fetch(urlName, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log('deleted');
        // refetch to rerender updated nameList
        return fetch('/name');
      })
      .then(response => response.json())
      .then(findresponse => {
        this.setState({
          nameList: [...findresponse],
        });
      })
      .catch(err => console.log(err));

    this.setState({
      success: true,
    });
  };

  handleAddNewName = event => {
    event.preventDefault();
    const data = {
      program: this.programRef.current.value,
      course: this.courseRef.current.value,
    };

    fetch('/newname', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(body => {
        console.log('State: ', body);
        // refetch to rerender updated nameList
        return fetch('/name');
      })
      .then(response => response.json())
      .then(findresponse => {
        this.setState({
          nameList: [...findresponse],
        });
      })
      .catch(err => console.log(err));

    this.setState({
      success: true,
    });
  };

  // inside of the dialog popup
  handleEdit = () => {
    if (this.state.type.type === 'edit') {
      return (
        // edit course form
        <div className="message">
          <h2 className="message__heading">Current name</h2>
          <p>Program: {this.state.curName.program}</p>
          <p>Courses: {this.state.curName.course}</p>

          <h2 className="message__heading">New Name</h2>

          <form className="naming-edit" onSubmit={this.handleEditName}>
            <span>Program</span>
            <input name="Program" ref={this.programRef} type="text" placeholder="Program name" />

            <span>Course</span>
            <input name="Course" ref={this.courseRef} type="text" placeholder="Course name" />
            <div className="center">
              <button className="btn btn__summary" type="submit">
                Change Name
              </button>
              {this.state.success ? <p className="message__warning--success">Success!</p> : ''}
            </div>
          </form>
        </div>
      );
    } else if (this.state.type.type === 'delete') {
      return (
        <div className="message">
          <h2 className="message__heading">Current name</h2>
          <p>Program: {this.state.curName.program}</p>
          <p>Courses: {this.state.curName.course}</p>
          <p className="message__warning">
            Are You Sure you want to remove this name from naming guide?
          </p>

          <div className="popupbtn--container">
            <button
              className="btn btn__summary popupbtn--delete"
              onClick={() => this.handleDeleteName()}
            >
              Delete Name
            </button>
            <button
              className="btn btn__summary popupbtn--cancle"
              onClick={() => this.handleClose()}
            >
              Cancle
            </button>
          </div>
          {this.state.success ? <p className="message__warning--success">Success!</p> : ''}
        </div>
      );
    }
    // add new course form
    return (
      <div className="message">
        <h2 className="message__heading">New Name</h2>

        <form className="naming-edit" onSubmit={this.handleAddNewName}>
          <span>Program</span>
          <input name="Program" ref={this.programRef} type="text" placeholder="Program name" />

          <span>Course</span>
          <input name="Course" ref={this.courseRef} type="text" placeholder="Course name" />
          <div className="center">
            <button className="btn btn__summary" type="submit">
              Add New Course
            </button>
            {this.state.success ? <p className="message__warning--success">Success!</p> : ''}
          </div>
        </form>
      </div>
    );
  };

  render() {
    const actions = [
      <button className="btn btn__summary" onClick={this.handleClose}>
        Close
      </button>,
    ];
    return (
      <div className="wrapper">
        <MuiThemeProvider>
          <Dialog
            title="Edit Naming Guide"
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
          <button type="button" className="form-submit" onClick={() => this.handleLogout()}>
            Logout
          </button>
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
                        <button
                          className="btn btn__remove"
                          onClick={() => this.handleOpen(p, { type: 'edit' })}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn__remove"
                          onClick={() => this.handleOpen(p, { type: 'delete' })}
                        >
                          remove
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <div className="center">
                  <button
                    className="btn btn__summary"
                    onClick={() => this.handleOpen({ program: '', course: '' }, { type: 'new' })}
                  >
                    Add New Course
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withAuth(EditName);
EditName.propTypes = {
  history: PropTypes.object.isRequired,
};
