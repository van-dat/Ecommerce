const Banner = require("../Model/banner");
const asyncHandler = require("express-async-handler");

const createBanner = asyncHandler(async (req, res) => {
  if (!req.files) throw new Error("Missing input");
  const imagePath = req.files.map((i) => i.path);
  const response = await Banner.create({ image: imagePath });
  return res.status(200).json({
    success: response ? true : false,
    rs: response ? response : "cannot update image product",
  });
});
const getBanners = asyncHandler(async (req, res) => {
  const response = await Banner.find();
  return res.status(200).json({
    success: response ? true : false,
    rs: response ? response : "cannot update image product",
  });
});
const updateBanner = asyncHandler(async (req, res) => {
  const { bnid } = req.params;
  if (!req.files) throw new Error("Missing input");
  const response = await Banner.findByIdAndUpdate(bnid , {$push : {image : {$each : req.files.map(i => i.path)}}} , {new : true});
  return res.status(200).json({
    success: response ? true : false,
    rs: response ? response : "cannot update image product",
  });
});
const deleteBanner = asyncHandler(async (req, res) => {
    const { bnid } = req.params;
    const response = await Banner.findByIdAndDelete(bnid );
    return res.status(200).json({
      success: response ? true : false,
      rs: response ? response : "cannot update image product",
    });
  });
module.exports = {
  createBanner,
  getBanners,
  updateBanner,
  deleteBanner
};
