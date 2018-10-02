const assert = require('assert');
const request = require('supertest');
const app = require('../server');
const chai = require('chai');
const expect = chai.expect;

describe("FETCH controller", ()=>{

  it("GET to /users finds users", (done)=>{
    request(app)
      .get("/users")
      .end((err, response) => {
        //Need to change to be dynamic.
        assert(response.body[0].name ==="Dolores Sirek");
        done();
      });
  });

  it("POST to /addUser creates a new user", (done)=>{
    request(app)
      .post('/addUser')
      .send({userName: "test33"})
      .end((err, res) => {
        assert(res.status === 200);
        done();
      })
  });
})

