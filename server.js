const express = require('express');
const mysql = require('mysql');
const config = require('config');
const helmet = require('helmet');

// Database config
const db_config = {
  host: config.get('dbConfg.host'),
  user: config.get('dbConfg.user'),
  password: config.get('dbConfg.password'),
  database: config.get('dbConfg.database'),
  port: config.get('dbConfg.port')
};
// disconnection: https://github.com/mysqljs/mysql#server-disconnects

let connection;
function handleDisconnect() {
  // Recreate the connection, since
  // the old one cannot be reused.
  connection = mysql.createConnection(db_config);
  connection.connect((err) => {
    // The server is either down
    // or restarting (takes a while sometimes).
    if (err) {
      // We introduce a delay before attempting to reconnect,
      // to avoid a hot loop, and to allow our node script to
      // process asynchronous requests in the meantime.
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);
    }
  });
  // If you're also serving http, display a 503 error.
  connection.on('error', (err) => {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      // Connection to the MySQL server is usually
      // lost due to either server restart, or a
      handleDisconnect();
    } else {
      // connnection idle timeout (the wait_timeout
      // server variable configures this)
      throw err;
    }
  });
}

handleDisconnect();

const app = express();

// Middleware settings
app.use(express.json()); // application / json
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// Fetch data
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM user', (err, result, fields) => {
    if (err) {
      console.log('Error in users query');
    } else {
      console.log('users query success');
      res.json(result);
    }
  });
});

app.get('/admintable', (req, res) => {
  connection.query('SELECT * FROM admintable', (err, result, fields) => {
    if (err) {
      console.log('Error in admintable query');
    } else {
      console.log('admintable query success');
      res.json(result);
    }
  });
});

app.get('/coursetable', (req, res) => {
  connection.query('SELECT * FROM coursetable', (err, result, fields) => {
    if (err) {
      console.log('Error in coursetable query');
    } else {
      console.log('coursetable query success');
      res.json(result);
    }
  });
});

app.get('/subDate', (req, res) => {
  connection.query('SELECT * FROM subDate', (err, result, fields) => {
    if (err) {
      console.log('Error in subDate query');
    } else {
      console.log('subDate query success');
      res.json(result);
    }
  });
});

// courseinfo
app.get('/courseinfo', (req, res) => {
  connection.query('SELECT * FROM courseinfo', (err, result, fields) => {
    if (err) {
      console.log('Error in courseinfo query');
    } else {
      console.log('courseinfo query success');
      res.json(result);
    }
  });
});

// search by user (coursetble)
app.get('/search/coursetable/:userID/:startDate/:endDate', (req, res) => {
  console.log(req.params.userID);
  console.log(req.params.startDate);
  console.log(req.params.endDate);

  const {userID, startDate, endDate} = req.params;

  connection.query(
    `SELECT * FROM coursetable
    WHERE completionDate BETWEEN '${startDate}' AND '${endDate}'
    AND userID='${userID}'`,
    (err, result, fields) => {
      if (err) {
        console.log('Error in coursetable query');
      } else {
        console.log(result);
        res.json(result);
      }
    }
  );
});

// search by user (admintable)
app.get('/search/admintable/:userID/:startDate/:endDate', (req, res) => {
  console.log(req.params.userID);
  console.log(req.params.startDate);
  console.log(req.params.endDate);

  const userID = req.params.userID;
  const startDate = req.params.startDate;
  const endDate = req.params.endDate;
  connection.query(
    `SELECT * FROM admintable
    WHERE completionDate BETWEEN '${startDate}' AND '${endDate}'
    AND userID='${userID}'`,
    (err, result, fields) => {
      if (err) {
        console.log('Error in admintable query');
      } else {
        console.log(result);
        res.json(result);
      }
    }
  );
});

// search by user (program name)
app.get('/search/program/:courseProgram/:startDate/:endDate', (req, res) => {
  console.log('program search start: ');
  console.log(req.params.courseProgram);
  console.log(req.params.startDate);
  console.log(req.params.endDate);
  const { courseProgram, startDate, endDate } = req.params;

  // const userID = req.params.userID;
  // const startDate = req.params.startDate;
  // const endDate = req.params.endDate;
  connection.query(
    `SELECT * FROM coursetable
    WHERE completionDate BETWEEN '${startDate}' AND '${endDate}'
    AND courseProgram='${courseProgram}'`,
    (err, result, fields) => {
      if (err) {
        console.log('Error in program(name) query');
      } else {
        console.log(result);
        res.json(result);
      }
    }
  );
});

// search by user (program number)
app.get(
  '/search/programNumber/:courseNumber/:startDate/:endDate',
  (req, res) => {
    console.log('program Number search start: ');
    console.log(req.params.courseNumber);
    console.log(req.params.startDate);
    console.log(req.params.endDate);
    const { courseNumber, startDate, endDate } = req.params;

    connection.query(
      `SELECT * FROM coursetable
      WHERE completionDate BETWEEN '${startDate}' AND '${endDate}'
      AND courseNumber='${courseNumber}'`,
      (err, result, fields) => {
        if (err) {
          console.log('Error in program(number) query');
        } else {
          console.log(result);
          res.json(result);
        }
      }
    );
  }
);

// Search course info
app.get('/search/courseinfo', (req, res) => {
  connection.query('SELECT DISTINCT program, courseNumber FROM courseinfo', (err, result, fields) => {
    if (err) {
      console.log('Error in courseinfo query');
    } else {
      console.log('courseinfo query success');
      res.json(result);
    }
  });
});


// add new user to the database
app.post('/addUser', (req, res) => {
  const userName = req.body.userName;
  const sql = 'INSERT INTO `user` (name) VALUES (?)';
  const values = [userName];
  connection.query(sql, [values], (err, result) => {
    if (err) throw err;
    console.log(`new user is added${result.affectedRows}`);
  });
});

// add new courseinfo to the database
app.post('/addCourseinfo', (req, res) => {
  const program = req.body.program.toString().toUpperCase();
  const courseNumber = req.body.courseNumber.toString().toUpperCase();
  const semesterTerm = req.body.semesterTerm;

  const sql = 'INSERT INTO `courseinfo` (program, courseNumber, semesterTerm) VALUES (?)';
  const values = [program, courseNumber, semesterTerm];

  connection.query(sql, [values], (err, result) => {
    if (err) throw err;
    console.log(`new courseinfo is added: ${result.affectedRows}`);
    console.log(program, ' and ', courseNumber);
  });
});

// post data, req.body graps all state data
app.post('/submit', (req, res) => {
  // console.log(req.body.tasks);
  const tasks = req.body.tasks;
  const totalHours = req.body.totalHours; // int
  const date = req.body.date; // submit date (date type is string)

  const userName = req.body.userName; // userName
  console.log(tasks);
  // coursetable or admintable post
  for (const task in tasks) {
    if (tasks[task].taskType === 'Course Task') {
      // course task
      const curTask = tasks[task];
      const sql =
        'INSERT INTO `coursetable` (subDate, courseProgram, hours, courseTask, completionDate, courseInst, courseNumber, courseCat, semester, userID) VALUES (?)';
      const values = [
        date,
        curTask.program.toString().toUpperCase(),
        curTask.hours,
        curTask.courseType,
        curTask.date,
        curTask.instructor,
        curTask.courseNumber.toString().toUpperCase(),
        curTask.category,
        curTask.semester,
        userName
      ];
      connection.query(sql, [values], (err, result) => {
        if (err) throw err;
        console.log(`Number of records inserted: ${result.affectedRows}`);
      });
      console.log(values);
    } else {
      // admin task
      const curTask = tasks[task];
      const sql =
        'INSERT INTO `admintable` (subDate, hours, adminCat, completionDate, userID) VALUES (?)';
      const values = [
        date,
        curTask.hours,
        curTask.category,
        curTask.date,
        userName
      ];
      connection.query(sql, [values], (err, result) => {
        if (err) throw err;
        console.log(`Number of records inserted: ${result.affectedRows}`);
      });
      console.log(values);
    }
  }
  // subDate Post: subdate, userID,
  const sql = 'INSERT INTO `subDate` (subDate, userID, totalHours) VALUES (?)';
  const values = [date, userName, totalHours];
  connection.query(sql, [values], (err, result) => {
    if (err) throw err;
    console.log(`subDate inserted: ${result.affectedRows}`);
  });
  console.log(values);
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
