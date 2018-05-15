const express = require("express");
const mysql = require("mysql");
const config = require("config");
const helmet = require("helmet");

//Database config
const connection = mysql.createConnection({
  host: config.get("dbConfg.host"),
  user: config.get("dbConfg.user"),
  password: config.get("dbConfg.password"),
  database: config.get("dbConfg.database"),
  port: config.get("dbConfg.port")
});

connection.connect(function(err) {
  if (err) {
    console.log("Fail to Connect");
  } else {
    console.log("Connected!");
  }
});

const app = express();

//Middleware settings
app.use(express.json()); //application / json
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

//Fetch data
app.get("/users", (req, res) => {
  connection.query("SELECT * FROM user", function(err, result, fields) {
    if (err) {
      console.log("Error in users query");
    } else {
      console.log("users query success");
      res.json(result);
    }
  });
});

app.get("/admintable", (req, res) => {
  connection.query("SELECT * FROM admintable", function(err, result, fields) {
    if (err) {
      console.log("Error in admintable query");
    } else {
      console.log("admintable query success");
      res.json(result);
    }
  });
});

app.get("/coursetable", (req, res) => {
  connection.query("SELECT * FROM coursetable", function(err, result, fields) {
    if (err) {
      console.log("Error in coursetable query");
    } else {
      console.log("coursetable query success");
      res.json(result);
    }
  });
});

app.get("/subDate", (req, res) => {
  connection.query("SELECT * FROM subDate", function(err, result, fields) {
    if (err) {
      console.log("Error in subDate query");
    } else {
      console.log("subDate query success");
      res.json(result);
    }
  });
});

//courseinfo
app.get("/courseinfo", (req, res) => {
  connection.query("SELECT * FROM courseinfo", function(err, result, fields) {
    if (err) {
      console.log("Error in courseinfo query");
    } else {
      console.log("courseinfo query success");
      res.json(result);
    }
  });
});

//post data, req.body graps all state data
app.post("/submit", (req, res) => {
  //console.log(req.body.tasks);
  const tasks = req.body.tasks;
  const totalHours = req.body.totalHours; //int
  const date = req.body.date; //submit date (date type is string)
  const userName = req.body.userName; //userName
  console.log(tasks);
  // coursetable or admintable post
  for (let task in tasks) {
    if (tasks[task].taskType === "Course Task") {
      //course task
      const curTask = tasks[task];
      const sql =
        "INSERT INTO `coursetable` (subDate, courseProgram, hours, courseTask, completionDate, courseInst, courseNumber, courseCat, userID) VALUES (?)";
      const values = [
        date,
        curTask.program,
        curTask.hours,
        curTask.courseType,
        curTask.date,
        curTask.instructor,
        curTask.courseNumber,
        curTask.category,
        userName
      ];
      connection.query(sql, [values], function(err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
      });
      console.log(values);
    } else {
      //admin task
      const curTask = tasks[task];
      const sql =
        "INSERT INTO `admintable` (subDate, hours, adminCat, completionDate, userID) VALUES (?)";
      const values = [
        date,
        curTask.hours,
        curTask.category,
        curTask.date,
        userName
      ];
      connection.query(sql, [values], function(err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
      });
      console.log(values);
    }
  }
  // subDate Post: subdate, userID,
  const sql = "INSERT INTO `subDate` (subDate, userID) VALUES (?)";
  const values = [date, userName];
  connection.query(sql, [values], function(err, result) {
    if (err) throw err;
    console.log("submitdate inserted: " + result.affectedRows);
  });
  console.log(values);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
