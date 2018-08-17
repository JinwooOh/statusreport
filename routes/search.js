module.exports = app => {
  const connection = require('../server');
  // search by user (coursetble)
  app.get('/search/coursetable/:userID/:startDate/:endDate', (req, res) => {
    console.log(req.params.userID);
    console.log(req.params.startDate);
    console.log(req.params.endDate);

    const { userID, startDate, endDate } = req.params;

    connection.query(
      `SELECT * FROM coursetable
    WHERE completionDate BETWEEN '${startDate}' AND '${endDate}'
    AND userID='${userID}'`,
      (err, result) => {
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
    const { userID, startDate, endDate } = req.params;
    connection.query(
      `SELECT * FROM admintable
    WHERE completionDate BETWEEN '${startDate}' AND '${endDate}'
    AND userID='${userID}'`,
      (err, result) => {
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
      (err, result) => {
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
  app.get('/search/programNumber/:courseNumber/:startDate/:endDate', (req, res) => {
    console.log('program Number search start: ');
    console.log(req.params.courseNumber);
    console.log(req.params.startDate);
    console.log(req.params.endDate);
    const { courseNumber, startDate, endDate } = req.params;

    connection.query(
      `SELECT * FROM coursetable
      WHERE completionDate BETWEEN '${startDate}' AND '${endDate}'
      AND courseNumber='${courseNumber}'`,
      (err, result) => {
        if (err) {
          console.log('Error in program(number) query');
        } else {
          console.log(result);
          res.json(result);
        }
      }
    );
  });

  // Search course info
  app.get('/search/courseinfo', (req, res) => {
    connection.query('SELECT DISTINCT program, courseNumber FROM courseinfo', (err, result) => {
      if (err) {
        console.log('Error in courseinfo query');
      } else {
        console.log('courseinfo query success');
        res.json(result);
      }
    });
  });
};
