const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const orderSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product'
      },
      quantity: Number,
      size: Array,
    }
  ],
  status: {
    type: String,
    default: 'Processing',
    enum: ['Pending', 'Canceled', 'Processing', 'Success']
  },
  address: String,
  total: Number,
  paymentIntent: String
  ,
  note: String,
  orderBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

//Export the model
module.exports = mongoose.model("Order", orderSchema);
