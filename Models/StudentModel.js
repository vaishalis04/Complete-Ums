const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: String,
  isProcessed: {
    type: Boolean,
    default: false,
  },
});

const File = mongoose.model("StudentFile", fileSchema);

module.exports = File;
