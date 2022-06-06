const app = require("./server");

app.listen(process.env.PORT, () => {
  console.log("App listening on port", process.env.PORT) || 5000;
});

module.exports = app;
