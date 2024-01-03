const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var bannerSchema = new mongoose.Schema({
    image:{
        type:Array,
        required:true,
    }
    
},{timestamps:  true});

//Export the model
module.exports = mongoose.model('Banner', bannerSchema);