// const dbOptions = require("./connections");

// const knex = require("knex");
// const knexConnection = knex(dbOptions.development);

// module.exports = knexConnection;

const dbOptions = require("./connections");

const knex = require("knex");

console.log(process.env.NODE_ENV);
module.exports = knex(
  require("./connections")[process.env.NODE_ENV]
  //   require("./connections").development
  //   dbOptions.development
);
