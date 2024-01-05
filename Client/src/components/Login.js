import React, { useEffect, useState } from "react";
import icons from "../ultils/icon";
import Path from "../ultils/path";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import profile from '../../src/assets/img/1.jpeg'
import * as  apis from '../apis/user'
import { useDispatch } from 'react-redux'
import { logOut } from "../store/Slice/authSlice";

import { getCurrentUser } from '../store/action'
import { totalCart, totalPrice } from "../ultils/_helper";
import { fnPrice } from "../ultils/fn";

const {
  LiaUserCircleSolid,
  TiShoppingCart, LuUser,
  IoSettingsOutline, IoMdHelpCircleOutline, LuLogOut,
  MdKeyboardArrowRight,
  TiArrowSortedUp,
  PiShoppingCartThin,
  MdOutlineDelete,
  RiAdminLine
} = icons;
const Login = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showUser, setShowUser] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);



  const { user } = useSelector(state => state.auth)
  console.log(user)
  const handleLogout = async () => {
    const response = await apis.apiLogOut();
    if (response.success) {
      dispatch(logOut())
      setShowUser(false)
      navigate(Path.PUBLIC)
     
    }
  }



  const handleRemove = async (e) => {
    const response = await apis.apiRemoveItemCart({ id: e })
    if (response.result == true) {
      dispatch(getCurrentUser())

    }
  }

  const handleChangeSize = (e, value) => {

    const isChecked = e.target.checked;
    if (isChecked) {
      // Nếu checkbox được chọn, thêm giá trị vào mảng
      setSelectedValues([...selectedValues, value]);
    } else {
      // Nếu checkbox bị bỏ chọn, loại bỏ giá trị khỏi mảng
      setSelectedValues(selectedValues.filter((val) => val !== value));
    }
  }


  useEffect(() => {
    const cartItemIds = user?.cart.map((item) => item._id);
    setSelectedValues(cartItemIds || []);
  }, [user]);

  return (
    <div className="flex gap-3 items-center relative " >
      <span className="cursor-pointer" onClick={() => { setShowUser((prev) => !prev) }}>
        <LiaUserCircleSolid size={24} />
      </span>
      {!user &&
        <>
          <span className="cursor-pointer" onClick={() => navigate(Path.LOGIN)}>Đăng nhập</span>
          <span className="cursor-pointer" onClick={() => navigate(Path.REGISTER)}>Đăng Ký</span>
        </>}
      {user && <span className="cursor-pointer capitalize select-none " onClick={() => { setShowUser((prev) => !prev) }}>{`${user?.firstname} ${user?.lastname}`}</span>}

      {/*userLogout  */}
      {showUser &&
        <div className="absolute top-10  select-none w-[250px] rounded-md right-0 bg-white text-main animate-user shadow-md"  >
          <div className="flex flex-col relative " >
            <div className="flex items-center gap-5 p-2 border-b ">
              <img src={profile} alt="profil" className="w-[50px] h-[50px] rounded-full object-contain" />
              <h3 className="capitalize">{`${user?.firstname} ${user?.lastname}`}  </h3>
            </div>
            <div className="flex  flex-col ">
              <div className="flex justify-between items-center  p-3 hover:bg-content cursor-pointer">
                <div className="flex items-center gap-3">
                  <LuUser />
                  <p>Edit Profile</p>
                </div>
                <MdKeyboardArrowRight size={21} />
              </div>
              <div className="flex  items-center justify-between p-3 hover:bg-content cursor-pointer">
                <div className="flex items-center gap-3 ">
                  <IoSettingsOutline />
                  <p>Settings &amp; Privacy</p>
                </div>
                <MdKeyboardArrowRight size={21} />
              </div>
              <div className="flex justify-between items-center p-3 hover:bg-content cursor-pointer">
                <div className="flex items-center gap-3">
                  <IoMdHelpCircleOutline />
                  <p>Help &amp; Support</p>
                </div>
                <MdKeyboardArrowRight size={21} />
              </div>
              <div onClick={handleLogout} className="flex justify-between items-center p-3 hover:bg-content cursor-pointer">
                <div className="flex items-center gap-3">
                  <LuLogOut />
                  <p>Log Out</p>
                </div>
                <MdKeyboardArrowRight size={21} />
              </div>
            </div>
          </div>

          <div className="absolute top-[-20px] right-[80px] z-40">
            <TiArrowSortedUp size={35} color="white" />
          </div>

        </div>
      }


      {user?.role == 'user' &&
        <div className="  px-3  text-white group select-none">
          <span className="cursor-pointer" onClick={() => { navigate(Path.CART) }}>
            <TiShoppingCart color="white" size={28} />
          </span>



          <div className=" absolute flex items-center justify-center text-xs top-[-4px] right-2 rounded-full w-4 h-4 bg-white text-main">{user?.cart?.length > 0 ? totalCart(user?.cart) : 0}</div>

          {/* detail card */}

          <div className="before:content-[''] before:cursor-pointer before:absolute before:right-0 before:top-[-20px]  before:w-[100px] before:h-[20px] before:bg-transparent absolute top-10 group-hover:block  hidden  select-none min-w-[400px] right-0  rounded-md bg-white text-main animate-user shadow-md z-40"  >
            <div className="flex p-5 flex-col gap-4 ">
              <div className="flex font-semibold w-full items-center justify-center">
                <h5 className="uppercase text-lg ">Giỏ Hàng</h5>
              </div>
              {user?.cart?.length < 1 &&
                <div className="flex items-center justify-center flex-col border-b pb-4 text-main">
                  <PiShoppingCartThin size={60} />
                  <span >Hiện chưa có sản phẩm</span>
                </div>
              }




              <div className="flex gap-4 flex-col overflow-y-auto max-h-[300px]">
                {user?.cart?.map((i, index) => (
                  <div key={index} className="  w-full flex items-center border-t py-2 gap-2  group">
                    <input onChange={(e) => handleChangeSize(e, i._id)}
                      type="checkbox"
                      value={i._id}
                      checked={selectedValues.includes(i._id)}
                      id={i.size}
                      className="checkbox2  h-[15px] w-[15px] outline-none focus:text-main-300 border-none  "
                    />
                    <div className="flex w-full gap-3">
                      <img src={i.product?.thumbnail[0]} alt="image" className="object-contain w-[80px]" />

                      <div className='block w-full'>
                        <div className="flex  flex-col text-sm  flex-2">
                          <span className="font-semibold capitalize">
                            {i.product.title}
                          </span>
                          <div className='flex justify-between w-full flex-1'>
                            <div className='flex flex-col'>
                              <span>Kích Thước : <span>{i.size}</span></span>
                              <span>Số lượng : {i.quantity}</span>
                              <span>Giá : <span className='text-main-100 font-semibold' >{fnPrice(i.product?.price)}₫</span></span>
                            </div>
                            <div className='flex items-center   gap-6 select-none justify-center flex-1'>
                              <span onClick={() => handleRemove(i._id)} className='text-main-100 border cursor-pointer rounded-full p-1 hover:bg-main hover:text-white '>
                                <MdOutlineDelete size={18} />
                              </span>
                            </div>

                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center ">
                <h5 className="uppercase font-semibold ">Tổng tiền:</h5>
                <span className="text-red-600 font-semibold ">{fnPrice(totalPrice(user, selectedValues))}₫</span>
              </div>
              <div className="flex gap-4 text-main">
                <div onClick={() => navigate(Path.CART)} className=" cursor-pointer uppercase text-md font-semibold px-4 py-2 flex flex-1 justify-center hover:bg-hover  bg-black text-white ">
                  xem Giỏ hàng
                </div>
                <div className=" cursor-pointer uppercase text-md font-semibold px-4 py-2 flex flex-1 justify-center hover:bg-hover  bg-black text-white ">
                  Thanh Toán
                </div>
              </div>

            </div>

          </div>
        </div>}


      {
        user?.role == 'admin' &&
        <div onClick={() => { navigate(Path.ADMIN) }} className="  px-3 flex items-center justify-center gap-2 text-white group select-none">
          <span className="cursor-pointer" >
            <RiAdminLine color="white" size={23} />
          </span>
          <h6 className="m-0">Profile</h6>
        </div>
      }






    </div>

  );
};

export default Login;
