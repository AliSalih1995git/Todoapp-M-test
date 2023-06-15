const mongoose = require("mongoose");

const todoScheema = new mongoose.Schema({
  text: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Todo", todoScheema);
