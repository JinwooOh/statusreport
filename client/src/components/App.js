import React from 'react';
import PropTypes from 'prop-types';
import AlertPopup from 'react-popup';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Forms from './report/Forms';
import Tasks from './report/Tasks';

import { dateNow } from './helper/Helper';
import { coursehelp, adminhelp, naminghelp } from './helper/Message';

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
    fetch('/name')
      .then(response => response.json())
      .then(findresponse => {
        this.setState({
          nameList: [...findresponse],
        });
      })
      .catch(err => console.log(err));
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
    // success
    const data = this.state;
    // check if user name is in database. If not, add a new user to database
    fetch('/users')
      .then(res => res.json())
      .then(users => {
        const match = users.find(o => o.name === data.userName);
        // case where there is no user in the database
        // then add new user to the database
        if (match === undefined) {
          fetch('/addUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }).then(body => {
            console.log('State: ', body); // error
          });
        }
      })
      .catch(error => console.error('fetch error at users ', error)); // error

    let hasCourseDb = true;

    // check if the database has courseinformation that a user typed
    // If yes, add new course to courseinfo table
    Object.keys(this.state.tasks).forEach(key => {
      if (this.state.tasks[key].taskType === 'Course Task') {
        const inputCourseNumber = this.state.tasks[key].courseNumber;
        // const inputCourseName = this.state.tasks[key].program;
        // const inputSemester = this.state.tasks[key].semester;
        fetch('/courseinfo')
          .then(res => res.json())
          .then(courses => {
            console.log('course info:', courses);
            // const matchName = courses.find(course => course.courseName === inputCourseName);
            const matchNumber = courses.find(course => course.courseNumber === inputCourseNumber);
            if (matchNumber === undefined) {
              hasCourseDb = false;
              // const newCourse = {
              //   program: inputCourseName,
              //   courseNumber: inputCourseNumber,
              //   semesterTerm: inputSemester, // can be empty
              // };
              // fetch('/addCourseinfo', {
              //   method: 'POST',
              //   headers: {
              //     'Content-Type': 'application/json',
              //   },
              //   body: JSON.stringify(newCourse),
              // })
              //   .then(body => {
              //     console.log('State: ', body); // error
              //   })
              //   .catch(error => console.error('fetch error at users ', error)); // error
            }
          })
          .catch(error => console.error('fetch error at users ', error)); // error
      }
    });
    if (!hasCourseDb) {
      console.log('fail to submit');
      return;
    }
    // submit the tasks
    fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(body => {
        console.log('State: ', body); // error
      })
      .catch(error => console.error('fetch error at submit', error)); // error
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
      userName: '',
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
      <div className="wrapper">
        <AlertPopup closeBtn={false} />
        <h1 className="App-title">Status Report</h1>

        <div className="guide">
          <MuiThemeProvider>
            <div className="guide__popup">
              <Popup title="Course Guide" text={coursehelp()} />
              <Popup title="Admin Guide" text={adminhelp()} />
              <Popup title="Naming Guide" text={naminghelp(this.state.nameList)} />
            </div>
          </MuiThemeProvider>

          <button
            className="btn btn__editname"
            onClick={() => {
              if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                this.props.history.push('/editname/');
              } else {
                // production
                this.props.history.push('/all-status-reports/editname/');
              }
            }}
          >
            Edit Name
          </button>
          <button
            className="btn btn__search"
            onClick={() => {
              if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                this.props.history.push('/report/');
              } else {
                // production
                this.props.history.push('/all-status-reports/report/');
              }
            }}
          >
            SEARCH
          </button>
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
    );
  }
}
export default App;
App.propTypes = {
  history: PropTypes.object.isRequired,
};
