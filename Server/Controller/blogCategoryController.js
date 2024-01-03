const blogCategory = require("../Model/blogCategory");
const asyncHandler = require("express-async-handler");

const createBlogCategory = asyncHandler(async (req, res) => {
  const response = await blogCategory.create(req.body);
  return res.status(200).json({
    status: response ? true : false,
    rs: response ? response : "can not createBlog category",
  });
});
// getCategory
const getBlogCategory = asyncHandler(async (req, res) => {
  const response = await blogCategory.find().select('title _id');
  return res.status(200).json({
    status: response ? true : false,
    rs: response ? response : "can not find blog category",
  });
});
// updateCategory
const updateBlogCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params;

  const response = await blogCategory.findByIdAndUpdate(bcid, req.body, {new: true});
  return res.status(200).json({
    status: response ? true : false,
    rs: response ? response : "can not update blog category",
  });
});
const deleteBlogCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const response = await blogCategory.findByIdAndDelete(bcid);
  return res.status(200).json({
    status: response ? true : false,
    rs: response ? response : "can not delete blog category",
  });
});
module.exports = {
  createBlogCategory,
  getBlogCategory,
  updateBlogCategory,
  deleteBlogCategory
};
