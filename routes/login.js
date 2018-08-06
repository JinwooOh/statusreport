const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');

const jwtMW = exjwt({
  secret: 'keyboard cat 4 ever',
});
// LOGIN ROUTE
module.exports = (app, connection) => {
  app.post('/login', (req, res) => {
    const { username, password } = req.body;

    connection.query('SELECT * FROM user WHERE name = ?', [username], (err, result) => {
      if (err) {
        res.send({
          code: 400,
          failed: 'error ocurred',
        });
      } else if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (err, match) => {
          if (match) {
            // if (result[0].password === password) {
            const token = jwt.sign(
              { id: result[0].id, username: result[0].name },
              'keyboard cat 4 ever',
              { expiresIn: 129600 }
            ); // Sigining the token
            res.json({
              sucess: true,
              err: null,
              token,
            });
          } else {
            res.status(401).json({
              sucess: false,
              token: null,
              err: 'Username or password is incorrect',
            });
          }
        });
      } else {
        res.status(401).json({
          sucess: false,
          token: null,
          err: 'Username or password is incorrect',
        });
      }
    });
  });

  app.get('/', jwtMW /* Using the express jwt MW here */, (req, res) => {
    res.send('You are authenticated'); // Sending some response when authenticated
  });
};
