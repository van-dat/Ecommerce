const brand = require("../Model/brand");
const asyncHandler = require("express-async-handler");

const createBrand = asyncHandler(async (req, res) => {
  const response = await brand.create(req.body);
  return res.status(200).json({
    status: response ? true : false,
    rs: response ? response : "can not createBrand ",
  });
});
// getBrand
const getBrand = asyncHandler(async (req, res) => {
  const response = await brand.find();
  return res.status(200).json({
    status: response ? true : false,
    rs: response ? response : "can not find Brand ",
  });
});
// updateCategory
const updateBrand = asyncHandler(async (req, res) => {
  const { brid } = req.params;

  const response = await brand.findByIdAndUpdate(brid, req.body, {new: true});
  return res.status(200).json({
    status: response ? true : false,
    rs: response ? response : "can not update Brand ",
  });
});
const deleteBrand = asyncHandler(async (req, res) => {
  const { brid } = req.params;
  const response = await brand.findByIdAndDelete(brid);
  return res.status(200).json({
    status: response ? true : false,
    rs: response ? response : "can not delete Brand ",
  });
});
module.exports = {
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand
};
