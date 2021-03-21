module.exports = app => {
  const todo = require("../controllers/todo.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", todo.create);

  // Retrieve all Tutorials
  router.get("/", todo.findAll);


  // Retrieve a single Tutorial with id
  router.get("/:id", todo.findOne);

  // Update a Tutorial with id
  router.put("/:id", todo.update);

  // Delete a Tutorial with id
  router.delete("/:id", todo.delete);

  // Delete all Tutorials
  router.delete("/", todo.deleteAll);

  app.use('/api/todo', router);
};
