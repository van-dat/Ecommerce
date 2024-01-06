
const { ObjectId } = require('mongoose').Types;
const product = require('../Model/product');
const Product = require("../Model/product");
const axios = require('axios');
const asyncHandler = require("express-async-handler");


const createProduct = asyncHandler(async (req, res) => {

  const { title, price, category, quantity, description } = req.body
  const thumbnail = req.files?.thumbnail[0]?.path
  const image = req.files.image?.map(el => el.path)
  if (!(title && price && category && quantity && description)) throw new Error("missing input");

  if (thumbnail) req.body.thumbnail = thumbnail
  if (thumbnail) req.body.image = image

  const newProduct = await Product.create(req.body);
  return res.status(200).json({
    success: newProduct ? true : false,
    product: newProduct ? newProduct : "cannot add product",
  });
});
// getOneProduct
const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findById(pid).populate({ path: 'category', populate: { path: 'branch', model: 'Brand' } }).populate("size", "size").populate("material");
  return res.status(200).json({
    success: product ? true : false,
    product: product ? product : [],
  });
});
// getProduct all / filter and sort ...
const getProducts = asyncHandler(async (req, res) => {
  const queryObj = { ...req.query };
  //   tách các trường đặc biệt ra khỏi query
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]);
  //   format cho các operate cho đúng mongooes
  let queryString = JSON.stringify(queryObj);
  queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (el) => `$${el}`);
  const formateQueries = JSON.parse(queryString);
  //   filtering
  if (queryObj.title) formateQueries.title = { $regex: queryObj.title, $options: "i" };
  let queryCommand = Product.find(formateQueries).populate({ path: 'category', populate: { path: 'branch', model: 'Brand' } });

  //sorting
  // abc, gdf => abc gdf
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }
  //fields limit
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }

  // pagination
  const page = +req.query.page || 1;
  // lấy bao nhiêu sản phẩm cho 1 trang
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);
  // execute query
  try {
    const response = await queryCommand.exec();
    const counts = await Product.countDocuments(formateQueries);
    return res.status(200).json({
      success: response ? true : false,
      counts,
      product: response ? response : "cannot get product",
    });
  } catch (err) {
    throw new Error(err.message);
  }
});

// rating
const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, pid } = req.body;
  if (!star || !pid) throw new Error("Missing input");
  const ratingProduct = await Product.findById(pid);
  const alreadyRating = ratingProduct?.rating?.find((i) => (i.posterBy = _id));
  if (alreadyRating) {
    await Product.updateOne(
      { rating: { $elemMatch: alreadyRating } },
      {
        $set: { "rating.$.star": star, "rating.$.comment": comment },
      },
      { new: true }
    );
  } else {
    await Product.findByIdAndUpdate(
      pid,
      {
        $push: { rating: { star, comment, posterBy: _id } },
      },
      { new: true }
    );
  }
  const data = await Product.findById(pid);
 
  const countRating = data?.rating.length;
  const sumStar = data?.rating.reduce((sum, i) => sum + +i.star, 0);
  data.totalRating = Math.round((sumStar * 10) / countRating) / 10;

  console.log(Math.round((sumStar * 10) / countRating) / 10)
  // console.log(Math.round((sumStar * 10) / countRating) / 10);
  await data.save();
  return res.status(200).json({
    status: true,
    data,
  });
});
// updateProduct
const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const file = req?.files;

  if (file?.thumbnail) {
    req.body.thumbnail = file.thumbnail[0].path;
  }
  if (file?.image) {
    req.body.image = file.image.map((item) => item.path);
  }

  const updateProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true });

  return res.status(200).json({
    success: updateProduct ? true : false,
    product: updateProduct ? updateProduct : "cannot update product",
  });
});

// addSize
const addSize = asyncHandler(async (req, res) => {
  const { pid } = req.params
  const { size } = req.body
  const addSize = await Product.findByIdAndUpdate(pid, { $push: { size } }, { new: true })
  return res.status(200).json({
    rs: addSize ? true : false,
    data: addSize ? addSize : 'cannot add sise'
  })
});
//   deleteProduct
const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const deleteProduct = await Product.findByIdAndDelete(pid);
  return res.status(200).json({
    success: deleteProduct ? true : false,
    msg: deleteProduct ? " delete sản phẩm thành công" : "Không thể xóa sản phẩm vui lòng thử lại",
  });
});
// uploadImage
const uploadImageProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!req.files) throw new Error("Missing input");
  const response = await Product.findByIdAndUpdate(
    pid,
    { $push: { image: { $each: req.files.map((i) => i.path) } } },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    rs: response ? response : "cannot update image product",
  });
});
const uploadThumbnailProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!req.files) throw new Error("Missing input");
  const response = await Product.findByIdAndUpdate(
    pid,
    { $push: { thumbnail: { $each: req.files.map((i) => i.path) } } },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    rs: response ? response : "cannot update image product",
  });
});




// @desc Recommend products
// @route GET /api/products/recommend/:q
// @access Private
 const recommendProduct = asyncHandler(async (req, res) => {
  console.log(req.params.q)
  const productId = req.params.q;
  let response = [];
  try {
    const productRating = await Product.find({
      rating: {
        $elemMatch: { posterBy: req.user._id }
      }
    })
   

    if (
      productRating == null ||
      productRating == undefined ||
      productRating.length == 0
    ) {
      const recommend = await axios.get(
        `http://127.0.0.1:5500/nonrating?q=${productId}`
      );

      response = await Product.find({
        _id: { $in: recommend?.data?.response },
      }).populate({ path: 'category', populate: { path: 'branch', model: 'Brand' } });

    } else {
      const recommend = await axios.get(`http://127.0.0.1:5500/?q=${req.user._id}`);
      
      
      response = await Product.find({
        _id: { $in: recommend?.data?.response },
      }).populate({ path: 'category', populate: { path: 'branch', model: 'Brand' } })

      console.log(response)
    }
    
    if (response.length !== 0) {
      res.json({ success: true, products: response });
    } else {
      res.status(500).json({ success: false, Products: [] });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
})



module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  rating,
  uploadImageProduct,
  uploadThumbnailProduct,
  addSize,
  recommendProduct
};
