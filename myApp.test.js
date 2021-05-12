const request = require("supertest");
const app = require("./myApp")

it('test if home route / returns html page', () => {
  request(app).get("/").then(response=> {
    expect(response.status).toBe(200)
    expect(response.headers["content-type"]).toContain("text/html")
    }
  ).catch(err => console.log(err))
})

it('test if route /json returns json object', () => {
  const jsonMessage = { message: "Hello json" }
  request(app).get("/json").then(response=> {
    expect(response.status).toBe(200)
    expect(response.body).toEqual(jsonMessage)
    }
  ).catch(err => console.log(err))
})
