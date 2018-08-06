const express = require('express');
const mysql = require('mysql');
const config = require('config');
const helmet = require('helmet');
const bodyParser = require('body-parser');
// Generate Admin password with salt !important
// bcrypt.hash(passwordForAdmin, 10, (err, hash) => {
//   console.log(hash);
// });

// Database config
const dbConfig = {
  host: config.get('dbConfg.host'),
  user: config.get('dbConfg.user'),
  password: config.get('dbConfg.password'),
  database: config.get('dbConfg.database'),
  port: config.get('dbConfg.port'),
};

// disconnection: https://github.com/mysqljs/mysql#server-disconnects
let connection;
function handleDisconnect() {
  // Recreate the connection, since
  // the old one cannot be reused.
  connection = mysql.createConnection(dbConfig);
  connection.connect(err => {
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
  connection.on('error', err => {
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
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    // Send the error rather than to show it on the console
    res.status(401).send(err);
  } else {
    next(err);
  }
});

// login routes
require('./routes/login')(app, connection);
// fetch data routes
require('./routes/fetch')(app, connection);
// search related routes
require('./routes/search')(app, connection);

// add new user to the database
app.post('/addUser', (req, res) => {
  const { userName } = req.body;
  const sql = 'INSERT INTO `user` (name) VALUES (?)';
  const values = [userName];
  connection.query(sql, [values], (err, result) => {
    if (err) throw err;
    console.log(`new user is added${result.affectedRows}`);
  });
});

// add new courseinfo to the database
// used in App.js
app.post('/addCourseinfo', (req, res) => {
  const program = req.body.program.toString().toUpperCase();
  const courseNumber = req.body.courseNumber.toString().toUpperCase();
  const { semesterTerm } = req.body;

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

  Object.keys(tasks).forEach(task => {
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
        userName,
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
      const values = [date, curTask.hours, curTask.category, curTask.date, userName];
      connection.query(sql, [values], (err, result) => {
        if (err) throw err;
        console.log(`Number of records inserted: ${result.affectedRows}`);
      });
      console.log(values);
    }
  });
  // subDate Post: subdate, userID,
  const sql = 'INSERT INTO `subDate` (subDate, userID, totalHours) VALUES (?)';
  const values = [date, userName, totalHours];
  connection.query(sql, [values], (err, result) => {
    if (err) throw err;
    console.log(`subDate inserted: ${result.affectedRows}`);
  });
  console.log(values);
});

// naming guide edit start ...
app.put('/editname/:nameId', (req, res) => {
  const nameId = req.params.nameId;
  console.log('courseID: ', nameId);
  connection.query(
    'UPDATE coursenaming SET ? WHERE ID = ?',
    [{ program: req.body.program, course: req.body.course }, nameId],
    (err, result) => {
      if (err) throw err;
      console.log(
        'new program name: ',
        req.body.program,
        ' new course name: ',
        req.body.course,
        'are updated.'
      );
    }
  );
  res.sendStatus(200);
});

app.post('/addnewcoursenaming', (req, res) => {
  const sql = 'INSERT INTO `coursenaming` (program, course) VALUES (?)';
  const values = [req.body.program, req.body.course];

  connection.query(sql, [values], (err, result) => {
    if (err) throw err;
    console.log(`new coursename is added: ${result.affectedRows}`);
    console.log(req.body.program, ' and ', req.body.course);
  });
  res.sendStatus(200);
});
app.delete('/deletename/:nameId', (req, res) => {
  console.log('courseID: ', req.params.nameId);
  connection.query('DELETE FROM coursenaming WHERE ID= ?', [req.params.nameId], (err, result) => {
    if (err) throw err;
    console.log('deleted.');
  });
  res.sendStatus(200);
});
// naming guide edit end...

// courseinfo edit start...
app.post('/addnewcourseinfo', (req, res) => {
  const sql = 'INSERT INTO `courseinfo` (program, courseNumber) VALUES (?)';
  const values = [req.body.program, req.body.course];

  connection.query(sql, [values], (err, result) => {
    if (err) throw err;
    console.log(`new coursename is added: ${result.affectedRows}`);
    console.log(req.body.program, ' and ', req.body.course);
  });

  res.sendStatus(200);
});

app.delete('/deletecourseinfo/:nameId', (req, res) => {
  console.log('courseID: ', req.params.nameId);
  connection.query('DELETE FROM courseinfo WHERE ID= ?', [req.params.nameId], (err, result) => {
    if (err) throw err;
    console.log('deleted.');
  });
  res.sendStatus(200);
});

app.put('/editcourseinfo/:nameId', (req, res) => {
  const nameId = req.params.nameId;
  console.log('courseID: ', nameId);
  connection.query(
    'UPDATE courseinfo SET ? WHERE ID = ?',
    [{ program: req.body.program, courseNumber: req.body.course }, nameId],
    (err, result) => {
      if (err) throw err;
      console.log(
        'new program name: ',
        req.body.program,
        ' new course name: ',
        req.body.course,
        'are updated.'
      );
    }
  );
  res.sendStatus(200);
});
// courseinfo edit end...

// user edit start...
app.post('/addnewuser', (req, res) => {
  const sql = 'INSERT INTO `user` (name) VALUES (?)';
  const values = [req.body.user];

  connection.query(sql, [values], (err, result) => {
    if (err) throw err;
    console.log(`new coursename is added: ${result.affectedRows}`);
    console.log(req.body.program, ' and ', req.body.course);
  });
  res.sendStatus(200);
});

app.delete('/deleteuser/:nameId', (req, res) => {
  connection.query('DELETE FROM user WHERE userID= ?', [req.params.nameId], (err, result) => {
    if (err) throw err;
    console.log('deleted.');
  });
  res.sendStatus(200);
});

app.put('/edituser/:nameId', (req, res) => {
  const nameId = req.params.nameId;
  connection.query(
    'UPDATE user SET ? WHERE userID = ?',
    [{ name: req.body.user }, nameId],
    (err, result) => {
      if (err) throw err;
      console.log('new user name: ', req.body.user);
    }
  );
  res.sendStatus(200);
});
// user edit end...

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
