const supertest = require("supertest");
const jwt = require("jsonwebtoken");

const server = require("../../server");
const { registerRoute, loginRoute } = require("../routes");
const knex = require("../../knex/knex");

const request = supertest(server);

describe("UsersController", () => {
  beforeAll(() => {
    knex.initialize();
  });

  afterAll(() => {
    knex.destroy();
  });

  it("lets the user register when good credentials are provided", async () => {
    const email = "pop.denis@gmail.com";
    await knex("users").where({ email }).del();
    const response = await request.post(registerRoute).send({
      name: "Denis",
      email,
      password: "longpassword",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      message: "User registered successfully",
      success: true,
    });
  });

  it("should throw an error if password is shorter than 6 characters", async () => {
    await request.post(registerRoute).send({
      name: "Denis",
      email: "pop.denis@gmail.com",
      password: "pw",
    });

    await request
      .post(registerRoute)
      .send({
        name: "Denis",
        email: "pop.denis@gmail.com",
        password: "pw",
      })
      .then((res) => {
        expect(res.status).toBeGreaterThanOrEqual(400);
      });

    // expect(response.error.status).toBeGreaterThanOrEqual(400);
  });

  it("should throw an error if email is invalid", async () => {
    const response = await request.post(registerRoute).send({
      name: "Denis",
      email: "pop.denis",
      password: "longpassword",
    });

    expect(response.error.status).toEqual(400);
  });

  it("should throw an error if name has less than 3 characters", async () => {
    const response = await request.post(registerRoute).send({
      name: "D",
      email: "pop.denis@gmail.com",
      password: "longpassword",
    });

    expect(response.error.status).toEqual(400);
  });

  it("should let the user log in when good credentials are provided", async () => {
    const name = "Denis";
    const email = "pop.denis1902@gmail.com";
    const password = "hashedpassword";

    await request.post(registerRoute).send({
      name,
      email,
      password,
    });

    await request
      .post(loginRoute)
      .send({
        email,
        password,
      })
      .expect(function (res) {
        expect(res.body.token).toBeDefined();
      });
  });
});
