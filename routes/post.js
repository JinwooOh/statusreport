module.exports = (app, connection) => {
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
    const sqlSyntax = 'INSERT INTO `subDate` (subDate, userID, totalHours) VALUES (?)';
    const inputs = [date, userName, totalHours];
    connection.query(sqlSyntax, [inputs], (err, result) => {
      if (err) throw err;
      console.log(`subDate inserted: ${result.affectedRows}`);
    });
    console.log(inputs);
  });
};