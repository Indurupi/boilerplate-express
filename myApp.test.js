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


it('test if route /name with get returns concatenated query param', () => {
  const first = "john";
  const last= "doe";
  const result = { name: first+" "+last}
  request(app)
  .get("/name")
  .query({first, last })
  .then(response=> {
    expect(response.status).toBe(200)
    expect(response.body).toEqual(result)
    }
  ).catch(err => console.log(err))
})

it('test if route /name with post returns req body(which is encoded) is returned as object', () => {
  const first = "john";
  const last= "doe";
  const result = { name: first+" "+last}
  request(app)
  .post("/name")
  .set('Accept', 'application/json')
  .send('first=John&last=Doe') 
  .expect(response=> {
    response.body = result
    }
  ).catch(err => console.log(err))
})
