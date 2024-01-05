const User = require("../Model/user");
const Order = require("../Model/order");
const Coupon = require("../Model/Coupon");


const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { products, total, paymentIntent, address, note } = req.body;

  const rs = await Order.create({ products, total, paymentIntent, address, orderBy: _id, note });

  const idCart = products.map(item => item._id)


  const user = await User.findByIdAndUpdate(_id, { $pull: { cart: { _id :{ $in: idCart } }} }, { new: true })
  console.log(user?.cart)

  console.log(products)
  return res.status(200).json({
    status: rs ? true : false,
    rs: rs ? rs : "can not create Order",
    user
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
