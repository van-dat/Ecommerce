const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const orderSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref : 'Product'
      },
      count : Number,
      color : String,
      price : Number
    }
  ],
  status: {
    type: String,
    default: 'processing',
    enum : ['canceled', 'processing', 'success']
  },
  total : Number,
  paymentIntent: {
  },
  orderBy: {
    type: mongoose.Types.ObjectId,
   ref : 'User',
  },
},{timestamps: true});

//Export the model
module.exports = mongoose.model("Order", orderSchema);
