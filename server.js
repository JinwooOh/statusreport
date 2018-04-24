const express = require("express");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "eipd.dcs.wisc.edu",
  user: "eipd_SR17",
  password: "Lhoy*817",
  database: "statusReports",
  port: 3306
});
connection.connect(function(err) {
  if (err) {
    console.log("Fail to Connect!");
  } else {
    console.log("Connected!");
  }
});

const app = express();

//fetch data
app.get("/users", (req, res) => {
  connection.query("SELECT * FROM user", function(err, result, fields) {
    if (err) {
      console.log("Error in users query");
    } else {
      console.log("success");
      res.json(result);
    }
  });
});
app.get("/admintable", (req, res) => {
  connection.query("SELECT * FROM admintable", function(err, result, fields) {
    if (err) {
      console.log("Error in admintable query");
    } else {
      console.log("success");
      res.json(result);
    }
  });
});
app.get("/coursetable", (req, res) => {
  connection.query("SELECT * FROM coursetable", function(err, result, fields) {
    if (err) {
      console.log("Error in coursetable query");
    } else {
      console.log("success");
      res.json(result);
    }
  });
});

const port = 5000;
app.listen(port, () => `Server running on port ${port}`);