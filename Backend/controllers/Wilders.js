// Imports
const { status } = require("express/lib/response");
const { deleteMany } = require("./../models/Wilder");
const WilderModel = require("./../models/Wilder");

module.exports = {
  readAll: async (req, res) => {
    // Get all wilder in db
    const wilders = await WilderModel.find();
    if (wilders.length >= 1) {
      res.status(200).json({ sucess: true, result: wilders });
    } else {
      res.status(404).json({ sucess: false, result: "Zero Wilder stored :/" });
    }
  },

  read: async (req, res) => {
    // Get wilder by id passing trought the url
    const wilder = await WilderModel.findById(req.params.id);
    res.json(wilder);
  },

  create: async (req, res) => {
    try {
      // Initialize model (search for duplicates, uniques, etc)
      await WilderModel.init();
      // Populate model with POST request body
      const wilder = await new WilderModel(req.body);
      // Then save it to db
      await wilder.save();
      console.log("wilder created !");
      res.status(201).json({ result: wilder });
    } catch (e) {
      if (e.code === 11000) {
        res.status(400).json({ msg: "Name already taken :/" });
      }
      throw e;
    }
  },

  update: async (req, res) => {
    // Get wilder by id passing trought the url
    const wilder = await WilderModel.findById(req.params.id);
    if (wilder) {
      // Set new values
      req.body.name ? (wilder.name = req.body.name) : wilder;
      req.body.city ? (wilder.city = req.body.city) : wilder;
      req.body.skills ? (wilder.skills = req.body.skills) : wilder;
      // Save changes
      await wilder.save();
      console.log("wilder updated !");
      res.json(wilder);
    } else {
      res.status(404).json({ msg: "Wilder Not Found :/" });
    }
  },

  delete: async (req, res) => {
    // Get wilder by id passing trought the url
    const wilder = await WilderModel.findById(req.params.id);
    // Delete wilder
    await wilder.delete();
    console.log("wilder deleted !");
    res.json({ "wilder deleted": wilder });
  },

  deleteAll: async (req, res) => {
    // Get all wilder
    const result = await WilderModel.deleteMany({});
    console.log("wilder deleted !");
    res.json({ "wilder deleted": result });
  },
};
