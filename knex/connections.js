module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: "localhost",
      database: "postgres",
      user: "postgres",
      password: "postgres",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
  test: {
    client: "postgresql",
    connection: {
      host: "localhost",
      port: 5430,
      database: "postgres",
      user: "postgres",
      password: "postgres",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./migrations/seeds/test",
    },
  },
};
