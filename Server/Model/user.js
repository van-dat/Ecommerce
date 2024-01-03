const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Schema = mongoose.Schema;
// Declare the Schema of the Mongo model
const userSchema = Schema(
  {
    firstname: {
      type: String,
      required: true,
      index: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    cart: [{
      product :{type : mongoose.Types.ObjectId,
      ref : 'Product'},
      quantity : Number,
      size : [], 

    }],
    address: {
      type: Array,
      default : []
    },
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    isBlocked: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    passwordChangeAt: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//kiểm tra password
userSchema.methods = {
  isCorrectPassword: async function (password) {
    return await bcrypt.compare(password, this.password);
  },
  createPasswordChangeToken: function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256") 
      .update(resetToken)
      .digest("hex");
    this.passwordResetExpires = Date.now() + 15 * 60 * 1000;
    return resetToken
  },
};
// Export the model
module.exports = mongoose.model("User", userSchema);
