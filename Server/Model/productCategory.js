const mongoose = require('mongoose'); // Erase if already required
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)
// Declare the Schema of the Mongo model
var productCategorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    slug:{
        type:String,
        slug: "title",
        unique:true,
    },
    branch : [{
        type: mongoose.Types.ObjectId,
        ref: "Brand",
    }],
},{timestamps: true});

//Export the model
module.exports = mongoose.model('productCategory', productCategorySchema);