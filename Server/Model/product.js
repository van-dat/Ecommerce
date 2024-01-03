const mongoose = require("mongoose"); // Erase if already required
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      slug: "title",
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    material:{
      type: Array,
    },

    category: {
      type: mongoose.Types.ObjectId,
      ref: "productCategory",
    },
    quantity: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    thumbnail: {
      type: Array,
    },
    image: {
      type: Array,
    },
   
    size: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Size",
      },
    ],
    description: {
      type: String,
    },
    rating: [
      {
        star: { type: Number },
        posterBy: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        comment: { type: String },
      },
    ],
    totalRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
