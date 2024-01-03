const Category = require("../Model/productCategory");
const asyncHandler = require("express-async-handler");

const createCategory = asyncHandler(async (req, res) => {
  const response = await Category.create(req.body);
  return res.status(200).json({
    status: response ? true : false,
    rs: response ? response : "can not create category",
  });
});
// getCategory
const getCategory = asyncHandler(async (req, res) => {
  const response = await Category.find().select('title _id slug').populate("branch");
  return res.status(200).json({
    status: response ? true : false,
    rs: response ? response : "can not find category",
  });
});
// updateCategory
const updateCategory = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  const {title, branch} = req.body
  const response = await Category.findByIdAndUpdate(cid, {title, $push :{branch} }, {new: true}).populate("branch");
 
  return res.status(200).json({ 
    status: response ? true : false,
    rs: response ? response : "can not update category",
  });
});
const deleteCategory = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  const response = await Category.findByIdAndDelete(cid);
  return res.status(200).json({
    status: response ? true : false,
    rs: response ? response : "can not delete category",
  });
});
module.exports = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory
};
