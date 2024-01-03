const User = require("../Model/user");
const Order = require("../Model/order");
const Coupon = require("../Model/Coupon");


const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { coupon } = req.body;
  const userCart = await User.findById(_id).select("cart").populate("cart.product", "title price");
  // tao dữ liệu cho order
  const products = userCart?.cart?.map((i) => ({
    product: i.product._id,
    price: i.product.price,
    quantity: i.quantity,
  }));
  let total = userCart.cart.reduce((sum, e) => e.product.price * e.quantity + sum, 0);
  const createData = {products, total, orderBy: _id}
  if (coupon) {
    const selectedCoupon = await Coupon.findById(coupon).select('discount')
    total = Math.round((total * (1 - +selectedCoupon.discount / 100)) / 1000) * 1000 || total;
    createData.total = total
  }
  const rs = await Order.create(createData);
  return res.status(200).json({
    status: rs ? true : false,
    rs: rs ? rs : "can not create Order",
  });
});
// getOne Order
const getOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const rs = await Order.find({ orderBy: _id });
  return res.status(200).json({
    status: rs ? true : false,
    rs: rs ? rs : "can not get Order",
  });
});
const getOrders = asyncHandler(async (req, res) => {
  const rs = await Order.find();
  return res.status(200).json({
    status: rs ? true : false,
    rs: rs ? rs : "can not get Order",
  });
});
const updateOrder = asyncHandler(async (req, res) => {
  const { oid } = req.params;
  const { status } = req.body;
  if (!status) throw new Error("missing input");
  const rs = await Order.findByIdAndUpdate(oid, { status }, { new: true });
  return res.status(200).json({
    status: rs ? true : false,
    rs: rs ? rs : "can not update Order",
  });
});

module.exports = {
  createOrder,
  getOrder,
  getOrders,
  updateOrder,
};
