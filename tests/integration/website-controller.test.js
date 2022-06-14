const supertest = require("supertest");
const Knex = require("knex");

const server = require("../../server");
const knex = require("../../knex/knex");
const { websitesRoute, registerRoute, loginRoute } = require("../routes");

const request = supertest(server);

describe("Websites controller", () => {
  const name = "Denis";
  const email = "pop.denistest@gmail.com";
  const password = "password123";
  let token;
  let currentUserId;
  const websiteName = "website";
  const domainName = "domain";

  beforeAll(async () => {
    // knex.initialize();
    await knex("users").where({ email }).del();
    await request.post(registerRoute).send({ name, email, password });
    const response = await request.post(loginRoute).send({
      email,
      password,
    });
    currentUserId = await knex("users").where({ email }).select("id").first();
    token = JSON.parse(response.text)["token"];
  });

  afterAll(() => {
    knex.destroy();
    jest.resetAllMocks();
  });

  it("should reject the response if no token is provided", async () => {
    // await request
    //   .post(websitesRoute)
    //   .send({
    //     user_id: 1,
    //     name: websiteName,
    //     domain: domainName,
    //   })
    //   .expect(function (res) {
    //     expect(res.status).toBeGreaterThanOrEqual(400);
    //   });
    await request
      .post(websitesRoute)
      .send({
        user_id: 1,
        name: websiteName,
        domain: domainName,
      })
      .then((res) => {
        expect(res.status).toBeGreaterThanOrEqual(400);
      });
  });

  it("should let the user create a website", async () => {
    await request
      .post(websitesRoute)
      .set("Authorization", `Bearer ${token}`)
      .send({
        user_id: 1,
        name: websiteName,
        domain: domainName,
      })
      .expect(async function (res) {
        expect(res.statusCode).toBe(200);
        const website = await knex("websites").where({ user_id: 1 });
        expect(website.length).toBeGreaterThan(0);
      });
  });

  it.only("should update the website", async () => {
    const response = await request
      .put(websitesRoute + "1")
      .set("Authorization", `Bearer ${token}`)
      .send({
        user_id: 1,
        name: "newwebsitename",
        domain: "newwebsitedomain",
      });

    expect(response.body.success).toEqual(true);
  });

  it("should let the user see his websites", async () => {
    const response = await request
      .get(websitesRoute)
      .set("Authorization", `Bearer ${token}`);

    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it.skip("should let the user delete a website", async () => {
    jest.mock("knex");
    const queryBuilder = {
      where: jest.fn().mockReturnThis(),
      del: jest.fn().mockReturnThis(),
    };

    const mockedKnex = jest.fn().mockReturnValue(queryBuilder);
    Knex.mockReturnValue(mockedKnex);

    await request
      .delete(websitesRoute + "1")
      .set("Authorization", `Bearer ${token}`);

    expect(queryBuilder.del).toBeCalled();

    jest.unmock("knex");
  });
});
