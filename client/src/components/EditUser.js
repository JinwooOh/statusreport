import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import withAuth from './withAuth';
import AuthService from './AuthService';

const Auth = new AuthService();

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      curName: {},
      userList: [], // for naming guide
      type: '',
      success: false,
    };
  }
  componentDidMount() {
    fetch('/users')
      .then(response => response.json())
      .then(findresponse => {
        this.setState({
          userList: [...findresponse],
        });
      })
      .catch(err => console.log(err));
  }
  userRef = React.createRef();

  handleOpen = (curName, type) => {
    this.setState({ open: true, curName, type, success: false });
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
      user: this.userRef.current.value,
      curName: this.state.curName,
    };
    // updating new name
    const nameId = this.state.curName.userID;
    const urlName = `/edituser/${nameId}`;
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
        // refetch to rerender updated userList
        return fetch('/users');
      })
      .then(response => response.json())
      .then(findresponse => {
        this.setState({
          userList: [...findresponse],
        });
      })
      .catch(err => console.log(err));

    this.setState({
      success: true,
    });
  };
  handleDeleteName = () => {
    const data = this.state.curName;
    const nameId = this.state.curName.userID;
    const urlName = `/deleteuser/${nameId}`;
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
        // refetch to rerender updated userList
        return fetch('/users');
      })
      .then(response => response.json())
      .then(findresponse => {
        this.setState({
          userList: [...findresponse],
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
      user: this.userRef.current.value,
    };

    fetch('/addnewuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(body => {
        console.log('State: ', body);
        // refetch to rerender updated userList
        return fetch('/users');
      })
      .then(response => response.json())
      .then(findresponse => {
        this.setState({
          userList: [...findresponse],
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
          <p>User: {this.state.curName.name}</p>

          <h2 className="message__heading">User Name</h2>

          <form className="naming-edit" onSubmit={this.handleEditName}>
            <span>Change User Name</span>
            <input name="User" ref={this.userRef} type="text" placeholder="user name" required />
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
          <p>User: {this.state.curName.name}</p>

          <p className="message__warning">
            Are you sure you want to remove this user from user table?
          </p>

          <div className="popupbtn--container">
            <button
              className="btn btn__summary popupbtn--delete"
              onClick={() => this.handleDeleteName()}
            >
              Delete User
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
    // add new user form
    return (
      <div className="message">
        <h2 className="message__heading">New Name</h2>

        <form className="naming-edit" onSubmit={this.handleAddNewName}>
          <span>New User</span>
          <input name="User" ref={this.userRef} type="text" placeholder="user name" required />

          <div className="center">
            <button className="btn btn__summary" type="submit">
              Add New User
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
            title="Edit User Info"
            autoScrollBodyContent
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            {this.handleEdit()}
          </Dialog>
        </MuiThemeProvider>
        <h1 className="App-title">Edit User Information</h1>
        <div className="guide">
          <button
            type="button"
            className="btn btn__logout btn--marginRight"
            onClick={() => this.handleLogout()}
          >
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
        </div>
        <div className="form-list form-list--report">
          <div className="message__text">
            <div className="message__text--body">
              <p className="heading-primary center">User Information</p>
              <div className="center">
                <button
                  className="btn btn__guide btn--margin"
                  onClick={() => this.handleOpen({ curName: '' }, { type: 'new' })}
                >
                  Add New User
                </button>
              </div>
              <ul>
                {this.state.userList.map((u, i) => {
                  return (
                    <li key={i} style={{ wordSpacing: '3px' }}>
                      <span className="adminBadge">{u.admin === 1 ? '[Admin] ' : ' '}</span>
                      {u.name}
                      <button
                        className="btn btn__remove"
                        onClick={() => this.handleOpen(u, { type: 'edit' })}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn__remove"
                        onClick={() => this.handleOpen(u, { type: 'delete' })}
                      >
                        remove
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withAuth(EditUser);
EditUser.propTypes = {
  history: PropTypes.object.isRequired,
};
