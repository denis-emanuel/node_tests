const request = require("supertest");

const server = require("../../server");

describe("UsersController", () => {
  //   it("should work", async () => {
  //     // given
  //     // when
  //     // then

  //     try {
  //       await request(server)
  //         .post(process.env.REGISTER_ROUTE)
  //         .send({ test: "value" })
  //         .expect(200);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });

  it("let the user register when good credentials are provided", async () => {
    try {
      await request(server)
        .post(process.env.REGISTER_ROUTE)
        .send({
          name: "Denis",
          email: "pop.denis1902@gmail.com",
          password: "longpassword",
        })
        .expect(200);
    } catch (err) {
      console.log(err);
    }
  });

  it.only("should throw an error when email is missing at register", async () => {
    // try {
    //   await request(server).post(process.env.REGISTER_ROUTE).send({
    //     name: "Denis",
    //     password: "longpassword",
    //   });
    // } catch (err) {
    //   console.log(err);
    // }

    const response = await request(server)
      .post(process.env.REGISTER_ROUTE)
      .send({
        name: "Denis",
        password: "1",
      });

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({});
  });
});
