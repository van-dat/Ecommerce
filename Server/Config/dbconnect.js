const mongoose = require("mongoose");
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connect db success");
  } catch (error) {
    console.log(error)
   
  }
};
module.exports = { connect };
