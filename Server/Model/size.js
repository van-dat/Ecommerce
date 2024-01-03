const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const sizeSchema = new mongoose.Schema(
  {
    size: {
        type : Number,
        required:true

    }
  }
);

//Export the model
module.exports = mongoose.model("Size", sizeSchema);
