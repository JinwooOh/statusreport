const assert = require('assert');
const request = require('supertest');
const app = require('../server');

describe("FETCH controller", ()=>{
  it("Posts /users a new user  ", (done)=>{
    const testUser = {
      name:"testUser"
    }
    request(app)
      .get("/users")
      .end((err, response) => {
        //Need to change to be dynamic.
        assert(response.body[0].name ==="Dolores Sirek");
        done();
      });
  })
})

