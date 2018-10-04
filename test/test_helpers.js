const app = require('../server');

before(()=>{
  // app.connect((err)=>{
  //   if (err) throw err;
  //   let sql = `TRUNCATE TABLE user`;

  //   app.query(sql, (err, result) => {
  //     if (err) throw err;;
  //     console.log('deleted all users from user table.');
  //     done();
  //   });
  // });
  console.log("test start");
})
