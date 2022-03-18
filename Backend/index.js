// Imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const WilderController = require("./controllers/Wilders");
const app = express();

function execAsyncController(controller) {
  return async function (req, res, next) {
    try {
      await controller(req, res, next);
    } catch (err) {
      console.log("Error caught in execAsyncController :/");
      next(err);
    }
  };
}

async function init() {
  try {
    // Database Connection
    await mongoose.connect("mongodb://127.0.0.1:27017/wilderdb", {
      autoIndex: true,
    });
    console.log("Connected to Db");

    //Middleware
    app.use(express.json());
    app.use(cors());

    // Routes
    app.get("/wilders", execAsyncController(WilderController.readAll));
    app.get("/wilders/:id", execAsyncController(WilderController.read));
    app.post("/wilders", execAsyncController(WilderController.create));
    app.put("/wilders/:id", execAsyncController(WilderController.update));
    app.delete("/wilders/:id", execAsyncController(WilderController.delete));
    app.delete("/wilders", execAsyncController(WilderController.deleteAll));

    // Handler for bad request
    app.use((err, req, res, next) => {
      console.log(err);
      res.status(500).json({ Msg: "Internal Error :/" });
    });

    // Handler for bad urls
    app.use((req, res) => {
      res.status(404).json({ Msg: "URL not found :/" });
    });

    //Start server
    app.listen(4000, () => {
      console.log("Server started on port 4000");
    });
  } catch (e) {
    console.log(e);
  }
}

init();
