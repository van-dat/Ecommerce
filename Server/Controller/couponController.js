const Coupon = require("../Model/Coupon");
const asyncHandler = require("express-async-handler");

const createCoupon = asyncHandler(async (req, res) => {
  const { name, discount, expire } = req.body;
  if (!name || !discount || !expire) throw new Error("missing input");
  const response = await Coupon.create({
    ...req.body,
    expire: Date.now() + +expire * 24 * 60 * 60 * 1000,
  });
  return res.status(200).json({
    status: response ? true : false,
    rs: response ? response : "can not create Coupon ",
  });
});
// getAllCoupon
const getCoupons = asyncHandler(async (req, res) => {
  const response = await Coupon.find();
  return res.status(200).json({
    status: response ? true : false,
    rs: response ? response : "can not get Coupon ",
  });
});
//   getOneCoupon
const getCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  if (!cid) throw new Error("missing input");
  const response = await Coupon.findById(cid);
  return res.status(200).json({
    status: response ? true : false,
    rs: response ? response : "can not get Coupon ",
  });
});
// updateCoupon
const updateCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  if (!cid || Object.keys(req.body).length === 0) throw new Error("missing input");
  if(req.body.expire)req.body.expire ={ ...req.body, expire: Date.now() + +expire * 24 * 60 * 60 * 1000 }
  const response = await Coupon.findByIdAndUpdate(cid,req.body,{ new: true });
  return res.status(200).json({
    status: response ? true : false,
    rs: response ? response : "can not update Coupon ",
  });
});
const deleteCoupon = asyncHandler(async (req, res) => {
    const { cid } = req.params;
    if (!cid)throw new Error("missing input");
    const response = await Coupon.findByIdAndDelete(cid);
    return res.status(200).json({
      status: response ? true : false,
      rs: response ? response : "can not delete Coupon ",
    });
  });
module.exports = {
  createCoupon,
  getCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon
};
