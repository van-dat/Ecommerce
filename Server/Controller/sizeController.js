const Size = require("../Model/size");
const asyncHandler = require("express-async-handler");

const createSize = asyncHandler(async (req, res) => {
    const {size} = req.body
  if (!size) throw new Error("Missing input");
  const response = await Size.create({size});
  return res.status(200).json({
    success: response ? true : false,
    rs: response ? response : "cannot create  size",
  });
});
const getSizes = asyncHandler(async (req, res) => {
  const response = await Size.find();
  return res.status(200).json({
    success: response ? true : false,
    rs: response ? response : "cannot update image product",
  });
});
const updateSize = asyncHandler(async (req, res) => {
  const { sid } = req.params;
  const {size} = req.body
  if (!size) throw new Error("Missing input");
  const response = await Size.findByIdAndUpdate(sid , {$set : size } , {new : true});
  return res.status(200).json({
    success: response ? true : false,
    rs: response ? response : "cannot update size",
  });
});
const deleteSize = asyncHandler(async (req, res) => {
    const { sid } = req.params;
    const response = await Size.findByIdAndDelete(sid );
    return res.status(200).json({
      success: response ? true : false,
      rs: response ? response : "cannot delete size",
    });
  });
module.exports = {
  createSize,
  getSizes,
  updateSize,
  deleteSize
};
