const assert = require('assert');
const request = require('supertest');
const app = require('../server');


describe("FETCH controller", ()=>{
  it("GET to /users to get user names", (done)=>{
    request(app)
      .get('/users')
      .end((err, response) => {
        console.log(response.body);
        done();
      });
  })
})