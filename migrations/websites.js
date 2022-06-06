/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("websites", function (table) {
    table.increments("id");
    table.integer("user_id");
    table.foreign("user_id").references("users.id").onDelete("SET NULL");
    table.string("name", 255).notNullable();
    table.string("domain", 255).notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("websites");
};
