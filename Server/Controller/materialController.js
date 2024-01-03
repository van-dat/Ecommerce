const Material = require("../Model/Material");
const asyncHandler = require("express-async-handler");

const createMaterial = asyncHandler(async (req, res) => {
  const response = await Material.create(req.body);
  return res.status(200).json({
    status: response ? true : false,
    rs: response ? response : "can not createMaterial ",
  });
});
// getMaterial
const getMaterial = asyncHandler(async (req, res) => {
  const response = await Material.find();
  return res.status(200).json({
    status: response ? true : false,
    rs: response ? response : "can not find Material ",
  });
});
// updateCategory
const updateMaterial = asyncHandler(async (req, res) => {
  const { mid } = req.params;
  const response = await Material.findByIdAndUpdate(mid, req.body, {new: true});
  return res.status(200).json({
    status: response ? true : false,
    rs: response ? response : "can not update Material ",
  });
});
const deleteMaterial = asyncHandler(async (req, res) => {
  const { mid } = req.params;
  const response = await Material.findByIdAndDelete(mid);
  return res.status(200).json({
    status: response ? true : false,
    rs: response ? response : "can not delete Material ",
  });
});
module.exports = {
  createMaterial,
  getMaterial,
  updateMaterial,
  deleteMaterial
};
