const User = require("../Model/user");
const asyncHandler = require("express-async-handler");
const sendEmail = require("../ultils/sendEmail");
const crypto = require("crypto");
const { generateAccessToken, generateRefreshToken } = require("../middlewares/jwt");
const { verify } = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
  const { email, password, lastname, firstname, mobile } = req.body;
  if (!email || !password || !lastname || !firstname) {
    return res.status(400).json({
      success: false,
      mes: "error",
    });
  }
  const emailUser = await User.findOne({ email });
  if (emailUser) throw new Error("Tài khoản đã tồn tại");
  const sdtUser = await User.findOne({ mobile });
  if (sdtUser) throw new Error("Tài khoản đã tồn tại");

  // token

  const randomBytes = crypto.randomBytes(2);
  const randomValue = randomBytes.readUInt16BE(0);
  const token = randomValue % 90000 + 1000;
  const newEmail = btoa(email) + '@' + token

  const newUser = await User.create({
    email: newEmail, password, lastname, firstname, mobile
  })


  setTimeout(async () => {
    await User.deleteOne({ email: newEmail })
  }, [5 * 60 * 1000])
  if (newUser) {
    const html = `<h2>Register code</h2> <br/>  <blockquote>${token}</blockquote>`
    const data = {
      email,
      html,
      subject: 'Confirm Account Shoes'
    };
    await sendEmail(data);
  }
  return res.status(200).json({
    success: newUser ? true : false,
    mes: newUser ? "please check you email to active account !" : "some went wrong , please try later",
  });


});

const createAccount = asyncHandler(async (req, res) => {
  const { token } = req.params
  const response = await User.findOne({ email: new RegExp(`${token}$`) })
  if (response) {
    response.email = atob(response.email.split('@')[0])
    response.save()
  }
  return res.json({
    result: response ? true : false,
    data: response ? response : 'wrong false'
  })


})


const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      success: false,
      mes: "Missing inputs",
    });
  // plain object
  const response = await User.findOne({ email })
  if (response && (await response.isCorrectPassword(password))) {
    // Tách password và role ra khỏi response
    const { password, role, refreshToken, ...userData } = response.toObject();
    // Tạo access token
    const accessToken = generateAccessToken(response._id, role);
    // Tạo refresh token
    const newRefreshToken = generateRefreshToken(response._id);
    // Lưu refresh token vào database
    const result = await User.findByIdAndUpdate(response._id, { refreshToken: newRefreshToken }, { new: true }).populate({
      path: 'cart.product',
      model: 'Product'
    }).select('firstname lastname email mobile cart');
    // Lưu refresh token vào cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      // hết hạn
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      accessToken,
      result,
    });
  } else {
    throw new Error("Invalid credentials!");
  }
});

const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const dataUser = await User.findById({ _id }).populate({
    path: 'cart.product',
    model: 'Product'
  }).select("-password -refreshToken");
  return res.status(200).json({
    success: true,
    rs: dataUser ? dataUser : "không tìm thấy",
  });
});

//getall user
const getUsers = asyncHandler(async (req, res) => {
  const queryObj = { ...req.query };
  //   tách các trường đặc biệt ra khỏi query
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]);
  //   format cho các operate cho đúng mongooes
  let queryString = JSON.stringify(queryObj);
  queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (el) => `$${el}`);
  const formateQueries = JSON.parse(queryString);

  if (queryObj?.name)
    formateQueries.name = { $regex: queryObj.name, $options: "i" };
  if (req.query.q) {
    delete formateQueries.q;
    formateQueries["$or"] = [
      { firstname: { $regex: req.query.q, $options: "i" } },
      { lastname: { $regex: req.query.q, $options: "i" } },
      { email: { $regex: req.query.q, $options: "i" } },
    ];
  }
  let queryCommand = User.find(formateQueries);
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join("");
    queryCommand = queryCommand.sort(sortBy);
  }
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join("");
    queryCommand = queryCommand.select(fields);
  }
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_USER;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);
  try {
    const response = await queryCommand;
    const counts = await User.find(formateQueries).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      products: response ? response : "Cannot get users",
      counts,
    });
  } catch (err) {
    throw new Error(err.message);
  }
});
const deleteUser = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  if (!uid) throw new Error("missing input !!!");
  const response = await User.findByIdAndDelete({ _id: uid });
  return res.status(200).json({
    success: response ? true : false,
    mes: response ? 'delete User' + response.firstname + response.lastname : "some thing went wrong",
  });
});
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id || Object.keys(req.body).length === 0) throw new Error("missing input !!!");
  const response = await User.findByIdAndUpdate(_id, req.body, { new: true }).select("-password -refreshToken -role");
  return res.status(200).json({
    success: response ? true : false,
    deleteUser: response ? response : "some thing went wrong",
  });
});
const updateUserAdmin = asyncHandler(async (req, res) => {
  const { uid } = req.params;

  if (Object.keys(req.body).length === 0) throw new Error("missing input !!!");
  const response = await User.findByIdAndUpdate(uid, req.body, { new: true }).select("-password -refreshToken -role");
  return res.status(200).json({
    success: response ? true : false,
    mes: response ? 'update thành công User' + '' + response.email : "some thing went wrong",
  });
});
//update address
const updateUserAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!req.body.address) throw new Error("missing input !!!");
  const response = await User.findByIdAndUpdate(_id, { $push: { address: req.body.address } }, { new: true }).select(
    "-password -refreshToken -role"
  );
  return res.status(200).json({
    success: response ? true : false,
    rs: response ? response : "some thing went wrong",
  });
});
// getAccessToken

const getAccessToken = asyncHandler(async (req, res, next) => {
  const cookie = req.cookies;
  const rs = await verify(cookie.refreshToken, process.env.JWT_KEY);
  const response = await User.findOne({
    _id: rs._id,
    refreshToken: cookie.refreshToken,
  });
  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response ? generateAccessToken(response._id, response.role) : "error new accessToken",
  });
});
/// logout
const logout = asyncHandler(async (req, res, next) => {
  const cookie = req.cookies;
  if (!cookie && !cookie.refreshToken) throw new Error("không có refreshToken");
  await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: "" }, { new: true });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    success: true,
    mes: "logout success and remove refreshToken",
  });
});
// forgot-password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new Error("missing email");
  const userData = await User.findOne({ email });
  if (!userData) throw new Error("user not found");
  const resetToken = userData.createPasswordChangeToken();
  await userData.save();
  const html = `xin vui lòng click link dưới đây để thay đổi mật khẩu của bạn . 
  link sẽ hết hạn sau 15 phút kể từ bây giờ, 
  <a href =${process.env.CLIENT_URL}/reset-password/${resetToken} 
  >Click here</a>`;

  const data = {
    email,
    html,
    subject: 'Forgot Password'
  };
  const rs = await sendEmail(data);
  return res.status(200).json({
    success: true,
    mes: 'please check you email to password retrieval !'
  });
});

// resetPassword
const resetPassword = asyncHandler(async (req, res) => {
  // const {token} = req.params
  const { password, token } = req.body;

  console.log('2',token, password)
  if (!password && !token) throw new Error("missing password");
  const passwordResetToken = crypto.createHash("sha256").update(token).digest("hex");
  const userData = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  console.log('1',userData)
  if (!userData) throw new Error("user Token undefined");
  userData.password = password;
  userData.passwordResetToken = undefined;
  userData.passwordResetExpires = undefined;
  userData.passwordChangeAt = Date.now();
  await userData.save();

  return res.status(200).json({
    success: userData ? true : false,
    msg: userData ? "Thay đổi tài khoản thành công" : "Thay đổi tài khoản thất bại vui lòng thử lại",
  });
});
// add CardProduct
const updateCartProduct = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid, size, quantity } = req.body;
  if (!pid || !size || !quantity) throw new Error("missing input");
  const user = await User.findById(_id).select("cart");
  const alreadyCart = user?.cart?.find((e) => e.product.toString() == pid);
  if (alreadyCart != null) {
    const allSize = user?.cart?.filter(e => e.size == size)

    if (allSize.length > 0) {
      return res.status(200).json({
        status: true,
        mes: "Sản phẩm đã có trong giỏ hàng",
      })
    }
    else {
      const response = await User.findByIdAndUpdate(
        _id,
        { $push: { cart: { product: pid, quantity, size } } },
        { new: true }
      );
      return res.status(200).json({
        status: response ? true : false,
        mes: response ? 'Sản phẩm đã được thêm vào giỏ hàng' : "Không thể Thêm vào giỏ hàng",
      });
    }
  } else {
    const response = await User.findByIdAndUpdate(
      _id,
      { $push: { cart: { product: pid, quantity, size } } },
      { new: true }
    );
    return res.status(200).json({
      status: response ? true : false,
      mes: response ? 'Sản phẩm đã được thêm vào giỏ hàng' : "Không thể Thêm vào giỏ hàng",
    });
  }
});


const updateQuantityCart = asyncHandler(async (req, res) => {
  const { id, action } = req.body;
  const { _id } = req.user;

  try {
    const user = await User.findById(_id);

    // Find the item in the cart
    const updateQuantityItem = user.cart.find((item) => item._id.toString() === id.toString());

    if (!updateQuantityItem) {
      return res.status(404).json({
        result: 'error',
        message: 'Item not found in the cart',
      });
    }

    if (action == 0) {
      updateQuantityItem.quantity += 1;

      await user.save();

      return res.json({
        result: 'ok',
        data: 1,
      });
    } else {
      if (updateQuantityItem.quantity <= 1) {
        updateQuantityItem.quantity = 1
        await user.save();

        return res.json({
          result: 'ok',
          data: 1,
        });
      } else {
        updateQuantityItem.quantity -= 1
        await user.save();

        return res.json({
          result: 'ok',
          data: 1,
        });
      }
    }
    // Handle other actions (e.g., decrease, remove) here if needed

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      result: 'error',
      message: 'Internal server error',
    });
  }
});



const removeItemCart = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const { id } = req.body

  const user = await User.findById(_id).select('cart')
  const alreadyCart = user.cart.find(e => e._id == id)
  if (!alreadyCart) {
    return res.status(200).json({
      result: false,
      mes: 'not find Product in cart'
    })
  }

  const response = await User.findByIdAndUpdate(_id, { $pull: { cart: { _id: id } } }, { new: true });

  return res.status(200).json({
    result: response ? true : false,
    data: 1
  })

})

module.exports = {
  register,
  login,
  getCurrent,
  getAccessToken,
  logout,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  updateUser,
  updateUserAddress,
  updateCartProduct,
  createAccount,
  updateQuantityCart,
  removeItemCart,
  updateUserAdmin
};
