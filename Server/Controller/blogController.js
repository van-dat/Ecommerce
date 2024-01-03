const Blog = require("../Model/blog");
const asyncHandler = require("express-async-handler");

const createBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  if (!title || !description || !category) throw new Error("missing input");
  const response = await Blog.create(req.body);
  return res.status(200).json({
    status: response ? true : false,
    rs: response ? response : "can not create category",
  });
});
// getoneBlog
const getBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const response = await Blog.findByIdAndUpdate(bid, { $inc: { numberView: 1 } }, { new: true })
    .populate("likes", "firstname lastname")
    .populate("disLikes", "firstname lastname");
  return res.status(200).json({
    status: response ? true : false,
    rs: response ? response : "can not find Blog",
  });
});
// getallBlog
const getBlogs = asyncHandler(async (req, res) => {
  const response = await Blog.find();
  return res.status(200).json({
    status: response ? true : false,
    rs: response ? response : "can not find Blog",
  });
});
// updateBlog
const updateBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (Object.keys(req.body)?.length === 0) throw new Error("missing input");
  const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true });
  return res.status(200).json({
    status: response ? true : false,
    rs: response ? response : "can not update Blog",
  });
});
// deleteBlog
const deleteBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const response = await Blog.findByIdAndDelete(bid);
  return res.status(200).json({
    status: response ? true : false,
    rs: response ? response : "can not find Blog",
  });
});

// action Like blog
const likeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error("missing input");
  const blog = await Blog.findById(bid);
  const alreadyDisLiked = await blog?.disLikes?.find((e) => e.toString() === _id);
  // check is disliking
  if (alreadyDisLiked) {
    const response = await Blog.findByIdAndUpdate(bid, { $pull: { disLikes: _id } }, { new: true });
    return res.status(200).json({
      status: response ? true : false,
      rs: response,
    });
  }
  // is like
  const alreadyLiked = await blog?.likes?.find((e) => e.toString() === _id);
  if (alreadyLiked) {
    const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true });
    return res.status(200).json({
      status: response ? true : false,
      rs: response,
    });
  } else {
    const response = await Blog.findByIdAndUpdate(bid, { $push: { likes: _id } }, { new: true });
    return res.status(200).json({
      status: response ? true : false,
      rs: response,
    });
  }
});
// action dislike
const disLikeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error("missing input");
  const blog = await Blog.findById(bid);
  const alreadyLike = await blog?.likes?.find((e) => e.toString() === _id);
  if (alreadyLike) {
    const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true });
    return res.status(200).json({
      status: response ? true : false,
      rs: response,
    });
  }
  // is like
  const alreadyDisLike = await blog?.disLikes?.find((e) => e.toString() === _id);
  if (alreadyDisLike) {
    const response = await Blog.findByIdAndUpdate(bid, { $pull: { disLikes: _id } }, { new: true });
    return res.status(200).json({
      status: response ? true : false,
      rs: response,
    });
  } else {
    const response = await Blog.findByIdAndUpdate(bid, { $push: { disLikes: _id } }, { new: true });
    return res.status(200).json({
      status: response ? true : false,
      rs: response,
    });
  }
});
// update image
const  uploadImageBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (!req.file) throw new Error("Missing input");
  const response = await Blog.findByIdAndUpdate(
    bid,
    {Image : req.file.path},
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    rs: response ? response  : "cannot update image product",
  });
})

module.exports = {
  createBlog,
  getBlog,
  getBlogs,
  deleteBlog,
  updateBlog,
  likeBlog,
  disLikeBlog,
  uploadImageBlog
};
