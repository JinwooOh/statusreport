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
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.updateDate(), 1000); // for time
    // time
    const localStorageRef = localStorage.getItem('date');
    if (localStorageRef) {
      this.setState({
        date: JSON.parse(localStorageRef),
      });
    }
    if (this.state.nameList.length === 0) {
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
      })
      .catch(err => {
        console.log(err, 'failed to load naming list');
      });
  }
  componentDidUpdate() {
    // time
    localStorage.setItem('date', JSON.stringify(this.state.date));
  }

  componentWillUnmount() {
    // console.log('Clock', 'componentWillUnmount');
    clearInterval(this.timerID);
  }
  updateDate = () => {
    this.setState({
      date: dateNow(),
    });
  };

  handleSubmit = () => {
    // error
    // check empty case
    if (this.isEmpty(this.state.tasks) || this.isEmpty(this.state.userName)) {
      // popup message
      const errorSubmitPopup = AlertPopup.register({
        title: 'Alert',
        content:
          'To report, you should add at least one task to summary, and type your name at the bottom.',
        buttons: {
          right: ['ok'],
        },
      });
      AlertPopup.queue(errorSubmitPopup);
      return;
    }
    // check user name
    // ...

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

    // Final submitsion check and render appropriate popup
    async function checker() {
      try {
        const res = await fetch('/users');
        await res.json();
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
    }
    checker();

    // success popup message
    const submitPopup = AlertPopup.register({
      title: 'Status Report',
      content: 'Report submitted. Thank you.',
      buttons: {
        right: ['ok'],
      },
    });
    AlertPopup.queue(submitPopup);
    // reset the state relate to submit the form
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
                      className="btn btn__editname"
                      onClick={() => {
                        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                          this.props.history.push(`/editselect/`);
                        } else {
                          // production
                          this.props.history.push(`${context.production}editselect/`);
                        }
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn__search"
                      onClick={() => {
                        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                          this.props.history.push('/report/');
                        } else {
                          // production
                          this.props.history.push(`${context.production}report/`);
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
            taskType={this.state.taskType}
            selectTask={this.selectTask}
            nameList={this.state.nameList}
          />

          <Tasks
            tasks={this.state.tasks}
            userName={this.state.userName}
            details={this.state.tasks}
            date={this.state.date}
            addUser={this.addUser}
            removeTask={this.removeTask}
            taskType={this.state.taskType}
            totalHours={this.state.totalHours}
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
