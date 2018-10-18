// This is a root of client side of a submitting page
import React from 'react';
import PropTypes from 'prop-types';
import AlertPopup from 'react-popup';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Forms from './report/Forms';
import Tasks from './report/Tasks';

import { dateNow } from './helper/Helper';
import { coursehelp, adminhelp, naminghelp } from './helper/Message';

import AppProvider from './helper/AppProvider';
import { AppContext } from './helper/envHelper';
import Popup from './Popup';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: {}, // task list
      totalHours: 0,
      taskType: 'course', // or"admin"
      date: {}, // to track submit date and time
      userName: '',
      nameList: [], // for naming guide
      userList: [],
    };
  }

  componentDidMount() {
    const { nameList } = this.state;
    this.timerID = setInterval(() => this.updateDate(), 1000); // for time
    // time
    const localStorageRef = localStorage.getItem('date');
    if (localStorageRef) {
      this.setState({
        date: JSON.parse(localStorageRef),
      });
    }
    if (nameList.length === 0) {
      this.setState({
        nameList: [{ program: ':::Loading::' }],
      });
    }

    // fetch naming guide list
    fetch('/name')
      .then(response => response.json())
      .then(findresponse => {
        this.setState({
          nameList: [...findresponse],
        });
        fetch('/users')
          .then(res => res.json())
          .then(users => {
            this.setState({
              userList: users,
            });
          })
          .catch(error => console.error('fetch error at componentDidMount', error)); // error
      })
      .catch(err => {
        console.log(err, 'failed to load naming list');
      });
  }

  componentDidUpdate() {
    // time
    const { date } = this.state;
    localStorage.setItem('date', JSON.stringify(date));
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  updateDate = () => {
    this.setState({
      date: dateNow(),
    });
  };

  handleSubmit = async () => {
    const { tasks, userName, userList } = this.state;
    let canYouSubmit = false;
    // check whether usernmae is in the database.
    for (const index of userList) {
      if (index.name === userName) {
        canYouSubmit = true;
        break;
      }
    }
    // error
    // username is not in the database
    if (!canYouSubmit) {
      console.log('you cannot submit');
      const noName = AlertPopup.register({
        title: 'Alert',
        content:
          'Failed to submit. Your name is not in the database. Please ask a manager to add your name.',
        buttons: {
          right: ['ok'],
        },
      });
      AlertPopup.queue(noName);
      return;
    }
    // error
    // there is no task to submit
    if (this.isEmpty(tasks)) {
      // popup message
      const errorSubmitPopup = AlertPopup.register({
        title: 'Alert',
        content: 'To report, you should add at least one task to summary',
        buttons: {
          right: ['ok'],
        },
      });
      AlertPopup.queue(errorSubmitPopup);
      return;
    }

    // success!!
    try {
      const success = AlertPopup.register({
        title: 'Status Report',
        content: 'Report submitted. Thank you.',
        buttons: {
          right: ['ok'],
        },
      });
      AlertPopup.queue(success);
    } catch (e) {
      const fail = AlertPopup.register({
        title: 'Status Report',
        content: 'Failed to submit. There might be a database connection issue.',
        buttons: {
          right: ['ok'],
        },
      });
      AlertPopup.queue(fail);
    }
    const data = this.state;
    // success
    // submit the tasks
    fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).catch(error => console.error('fetch error at submit', error)); // error

    this.setState({
      tasks: {},
      totalHours: 0,
      // userName: '',
    });
  };

  // helper method for checking empty object(tasks)
  isEmpty = obj => Object.keys(obj).length === 0;

  addTask = task => {
    const tasks = { ...this.state.tasks };
    tasks[`task${Date.now()}`] = task;
    this.setState({
      tasks,
    });
  };

  addUser = userName => {
    this.setState({
      userName,
    });
  };

  sumHours = hours => {
    const totalHours = this.state.totalHours + parseFloat(hours);
    this.setState({ totalHours });
  };

  removeTask = key => {
    const tasks = { ...this.state.tasks };
    const totalHours = this.state.totalHours - tasks[key].hours;
    delete tasks[key];
    this.setState({ tasks });
    this.setState({ totalHours });
  };

  selectTask = taskType => {
    this.setState({ taskType });
  };

  render() {
    const { tasks, totalHours, taskType, date, userName, nameList } = this.state;
    return (
      <AppProvider>
        <div className="wrapper">
          <AlertPopup closeBtn={false} />
          <h1 className="App-title">Status Report</h1>

          <div className="guide">
            <MuiThemeProvider>
              <div className="guide__popup">
                <Popup title="COURSE GUIDE" text={coursehelp()} />
                <Popup title="ADMIN GUIDE" text={adminhelp()} />
                <Popup title="NAMING GUIDE" text={naminghelp(this.state.nameList)} />
              </div>
            </MuiThemeProvider>
            <AppContext.Consumer>
              {context => {
                return (
                  <React.Fragment>
                    <button
                      type="button"
                      className="btn btn__editname"
                      onClick={() => {
                        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                          this.props.history.push(`/editselect/`);
                        } else {
                          // production
                          this.props.history.push(`${context.production}/editselect/`);
                        }
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn__search"
                      onClick={() => {
                        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                          this.props.history.push('/report/');
                        } else {
                          // production
                          this.props.history.push(`${context.production}/report/`);
                        }
                      }}
                    >
                      SEARCH
                    </button>
                  </React.Fragment>
                );
              }}
            </AppContext.Consumer>
          </div>

          <Forms
            addTask={this.addTask}
            sumHours={this.sumHours}
            taskType={taskType}
            selectTask={this.selectTask}
            nameList={nameList}
          />

          <Tasks
            tasks={tasks}
            userName={userName}
            details={tasks}
            date={date}
            addUser={this.addUser}
            removeTask={this.removeTask}
            taskType={taskType}
            totalHours={totalHours}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </AppProvider>
    );
  }
}
export default App;
App.propTypes = {
  history: PropTypes.object.isRequired,
};
