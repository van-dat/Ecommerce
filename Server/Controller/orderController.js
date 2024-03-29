const User = require("../Model/user");
const Product = require("../Model/product");

const Order = require("../Model/order");


const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { products, total, paymentIntent, address, note, status } = req.body;
  if (status) {
    req.body.status = status
  }
  const rs = await Order.create({ products, total, paymentIntent, address, orderBy: _id, note, status:req.body.status });


  const quantityProduct = products?.map(item => item.product._id)

  const dataProduct = await Product.updateMany(
    { _id: { $in: quantityProduct } },
    { $inc: { quantity: -1 } }
  );

  // xóa sản phẩm trong giỏ hàng của usere
  const idCart = products.map(item => item._id)
  if (idCart) {
    const user = await User.findByIdAndUpdate(_id, { $pull: { cart: { _id: { $in: idCart } } } }, { new: true })
  }


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

  const queryObj = { ...req.query };
  //   tách các trường đặc biệt ra khỏi query
  const excludedFields = ["page"];
  excludedFields.forEach((el) => delete queryObj[el]);
  //   format cho các operate cho đúng mongooes
  let queryString = JSON.stringify(queryObj);
  queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (el) => `$${el}`);
  const formateQueries = JSON.parse(queryString);
  let queryCommand = Order.find(formateQueries).populate({ path: 'products', populate: { path: 'product', model: 'Product' } }).populate({
    path: 'orderBy',
    select: 'firstname lastname email mobile'
  })




  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_ORDER;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);

 

  try {
    const response = await queryCommand.exec();
    const counts = await Order.countDocuments(formateQueries);
    return res.status(200).json({
      success: response ? true : false,
      counts,
      Order: response ? response.reverse() : "cannot get product",
    });
  } catch (err) {
    throw new Error(err.message);
  }



});





const updateOrder = asyncHandler(async (req, res) => {
  const { oid } = req.params;
  const { status } = req.body;
  if (!status) throw new Error("missing input");
  console.log(status)
  const rs = await Order.findByIdAndUpdate(oid, { status }, { new: true });
  return res.status(200).json({
    status: rs ? true : false,
    rs: rs ? rs : "can not update Order",
    msg:rs ? 'Hủy đặt hàng thành công' : "Hủy đặt hàng thất bại vui lòng thử lại sau '"
  });
});




const getOrderUser = asyncHandler(async (req, res) => {
  const {_id} = req.user
  const rs = await Order.find({orderBy: {_id}}).populate({ path: 'products', populate: { path: 'product', model: 'Product' } }).populate({ path: 'orderBy', select: 'firstname lastname email mobile' }).exec();
  return res.status(200).json({
    status:rs ? true : false,
    rs:rs.reverse()
  })
});

module.exports = {
  createOrder,
  getOrder,
  getOrders,
  updateOrder,
  getOrderUser
};
