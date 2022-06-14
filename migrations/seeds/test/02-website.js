/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("websites").del();
  await knex("websites").insert([
    { id: 1, user_id: 1, name: "basicwebsite", domain: "basicdomain" },
    { id: 2, user_id: 2, name: "adminwebsite", domain: "basicdomain" },
  ]);
};
