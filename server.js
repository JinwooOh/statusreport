const express = require('express');
const mysql = require('mysql');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
// Generate Admin password with salt !important DONT DELETE
// bcrypt.hash(passwordForAdmin, 10, (err, hash) => {
//   console.log(hash);
// });

// Database config
const pool = mysql.createPool({
  host: keys.host,
  user: keys.user,
  password: keys.password,
  database: keys.database,
  port: keys.port,
});

// wrapper: replace connection.query() with pooling
module.exports = {
  query() {
    let sql_args = [];
    const args = [];
    for (let i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    const callback = args[args.length - 1]; // last arg is callback
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        return callback(err);
      }
      if (args.length > 2) {
        sql_args = args[1];
      }
      connection.query(args[0], sql_args, (err, results) => {
        connection.release(); // always put connection back in pool after last query
        if (err) {
          console.log(err);
          return callback(err);
        }
        callback(null, results);
      });
    });
  },
};
// disconnection: https://github.com/mysqljs/mysql#server-disconnects
// let connection;
// function handleDisconnect() {
//   // Recreate the connection, since
//   // the old one cannot be reused.
//   connection = mysql.createConnection(dbConfig);
//   connection.connect(err => {
//     // The server is either down
//     // or restarting (takes a while sometimes).
//     if (err) {
//       // We introduce a delay before attempting to reconnect,
//       // to avoid a hot loop, and to allow our node script to
//       // process asynchronous requests in the meantime.
//       console.log('error when connecting to db:', err);
//       setTimeout(handleDisconnect, 2000);
//     }
//   });
//   // If you're also serving http, display a 503 error.
//   connection.on('error', err => {
//     console.log('db error', err);
//     if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//       // Connection to the MySQL server is usually
//       // lost due to either server restart, or a
//       handleDisconnect();
//     } else {
//       // connnection idle timeout (the wait_timeout
//       // server variable configures this)
//       throw err;
//     }
//   });
// }
// handleDisconnect();

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
require('./routes/login')(app);
// fetch data routes
require('./routes/fetch')(app);
// search related routes
require('./routes/search')(app);
// edit related routes
require('./routes/edit')(app);
// post related routes
require('./routes/post')(app);

app.get('/*', (req, res) => {
  const path = require('path');
  res.sendFile(path.join(__dirname, '/index.html'), err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
