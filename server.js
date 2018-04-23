const express = require("express");
const mysql = require("mysql");
//const router = express.Router();

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

app.get("/users", (req, res) => {
  connection.query("SELECT * FROM user", function(err, result, fields) {
    if (err) {
      console.log("Error in this query");
    } else {
      console.log("success");
      res.json(result);
    }
  });
});

// connection.connect(function(err) {
//   if (err) {
//     console.log("Fail to Connect!");
//   } else {
//     console.log("Connected!");
//   }
// });
// connection.query("SELECT * FROM user", function(err, result, fields) {
//   if (err) {
//     console.log("Error in this query");
//   } else {
//     console.log("success");
//     console.log(result);
//   }
// });
const port = 5000;

app.listen(port, () => `Server running on port ${port}`);

//connection.end();
