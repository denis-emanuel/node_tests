/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      name: "test-basic",
      email: "test-email@gmail.com",
      password: "$2a$10$IHH35wFin9Z9cL.dvg8LueCBuhS1//1MmNXnfEZHydNKo.hCRxF2C",
      role: "basic",
    },
    {
      id: 2,
      name: "test-admin",
      email: "test-admin@gmail.com",
      password: "$2a$10$IHH35wFin9Z9cL.dvg8LueCBuhS1//1MmNXnfEZHydNKo.hCRxF2C",
      role: "advanced",
    },
  ]);
};
