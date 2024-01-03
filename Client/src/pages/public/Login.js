import React, { useState, useCallback } from "react";
import icons from "../../ultils/icon";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Path from "../../ultils/path";
import { fnCheckMail } from "../../ultils/fn";
import * as apis from "../../apis";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { loginUser, sendMail } from "../../store/Slice/authSlice";
import { checkNull } from '../../ultils/_helper'



const { FaFacebook, FcGoogle, TbArrowBackUp } = icons;
const Login = ({ register, forgot }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initState = {
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
  };

  const [payLoad, setPayLoad] = useState(initState);
  const { email, password, firstname, lastname, mobile } = payLoad;

  const handleSubmit = useCallback(async () => {


    if (!register) {
      // login
      if (checkIsNull(email, 'Email') == 1) return
      if (checkEmailNoType(email) == 1) return
      if (checkIsNull(password, 'Password')) return
      const response = await apis.apiLogin({ email, password });
      if (response.success == true) {
        dispatch(loginUser(response));
        toast.success("Đăng nhập thành công");
        navigate("/");
      } else {
        toast.error("Tài khoản hoặc mật khẩu không chính xác !");
      }
    } else {
      // register
      if (checkIsNull(firstname, 'First Name') == 1) return
      if (checkIsNull(lastname, 'Last Name') == 1) return
      if (checkIsNull(email, 'Email') == 1) return
      if (checkEmailNoType(email) == 1) return
      if (checkIsNull(mobile, 'Mobile') == 1) return
      if (checkIsNull(password, 'Password') == 1) return

      const response = await apis.apiRegister(payLoad);
      if (!response?.success) {
        Swal.fire({ icon: "error", text: response?.mes });
      } else {
        Swal.fire({ icon: "success", text: response?.mes }).then(() => {
          dispatch(sendMail(email));
          navigate(`/${Path.CONFIRM}`);
        });
      }
    }
  }, [payLoad]);






  const handleForGetPass = async () => {

    if (checkIsNull(email, 'Email') == 1) return
    if (checkEmailNoType(email) == 1) return
    const response = await apis.apiForgot({ email })
    if (response.success == true) {
      Swal.fire({ icon: 'success', text: response.mes }).then(() => {
        navigate('/')
        setPayLoad(initState)
      })
    }

  };


  const checkIsNull = (value, name) => {
    let check = 0
    if (checkNull(value)) {
      toast.warning('bạn chưa nhập ' + name)
      check = 1
    }
    return check
  }

  const checkEmailNoType = (value) => {
    let check = 0
    if (!fnCheckMail(value)) {
      toast.warning('Địa chỉ email không hợp lệ')
      check = 1
    }

    return check
  }



  return (
    <div className="mt-[165px]  bg-gradient-to-b from-[#dee7ee] to-[#eaf1f6] pb-10">
      <div className="w-full h-[70px]"></div>
      <div className=" md:container md:mx-auto ">
        <div className=" max-w-[650px] mx-auto bg-white flex flex-col p-6 shadow-sm rounded-sm ">
          <span className="mx-auto font-semibold text-xl ">
            {register ? "Tạo tài khoản" : forgot ? "KHÔI PHỤC MẬT KHẨU" : "Đăng Nhập"}
          </span>

          {register && (
            <>
              <div className="mb-3 flex gap-4 ">
                <div className="flex-1">
                  <span className="py-2 text-sm">First Name</span>
                  <input
                    type="email"
                    value={payLoad?.firstname}
                    placeholder="Họ"
                    onChange={(e) => setPayLoad((prev) => ({ ...prev, firstname: e.target.value }))}
                    className="border-1 border  w-full h-9 px-4 outline-none rounded-md"
                  />
                
                </div>
                <div className="flex-1">
                  <span className="py-2 text-sm">Last Name</span>
                  <input
                    type="text"
                    value={payLoad?.lastname}
                    placeholder="Tên"
                    onChange={(e) => setPayLoad((prev) => ({ ...prev, lastname: e.target.value }))}
                    className="border-1 border w-full h-9 px-4 outline-none rounded-md"
                  />

                </div>
              </div>
            </>
          )}

          <div className="mb-5 ">
            {forgot && <span className="py-2 text-sm w-full text-center">Nhập email của bạn:</span>}
            {!forgot && <span className="py-2 text-sm">Email</span>}
            <input
              type="email"
              value={payLoad?.email}
              placeholder="Email"
              onChange={(e) => setPayLoad((prev) => ({ ...prev, email: e.target.value }))}
              className="border-1 border w-full h-9 px-4 outline-none rounded-md"
            />

          </div>

          {register && (
            <div className="mb-3">
              <span className="py-2 text-sm">Số điện thoại</span>
              <input
                type="email"
                value={payLoad?.mobile}
                placeholder="Số điện thoại"
                onChange={(e) => setPayLoad((prev) => ({ ...prev, mobile: e.target.value }))}
                className="border-1 border w-full h-9 px-4 outline-none rounded-md"
              />

            </div>
          )}

          {!forgot && (
            <div className="mb-6">
              <span className="py-2 text-sm">Mật Khẩu</span>
              <input
                type="password"
                value={payLoad?.password}
                placeholder="Mật Khẩu"
                onChange={(e) => setPayLoad((prev) => ({ ...prev, password: e.target.value }))}
                className="border-1 border w-full h-9 px-4 outline-none rounded-md"
              />

            </div>
          )}

          {!forgot && (
            <div className="mx-auto mb-3 ">
              <button
                onClick={() => handleSubmit()}
                className="px-3 py-2 rounded-md bg-red-800 text-white font-bold hover:opacity-80"
              >
                {register ? "Đăng ký" : "Đăng Nhập"}
              </button>
            </div>
          )}

          {forgot && (
            <div className="mx-auto mb-3 ">
              <button
                onClick={() => handleForGetPass()}
                className="px-3 py-2 rounded-md bg-red-800 text-white font-bold hover:opacity-80"
              >
                Lấy mật khẩu
              </button>
            </div>
          )}

          {!register && !forgot && (
            <>
              <div className="mx-auto mb-6 flex flex-col items-center">
                <span
                  onClick={() => {
                    navigate(`/${Path.FORGOTPASS}`);
                    setPayLoad(initState);
                  }}
                  className="underline cursor-pointer hover:text-red-600"
                >
                  Quên mật khẩu?
                </span>
                <span
                  onClick={() => {
                    navigate(`/${Path.REGISTER}`);
                    setPayLoad(initState);
                  }}
                  className="underline cursor-pointer hover:text-red-600"
                >
                  Đăng ký
                </span>
              </div>
              <div className=" w-full flex gap-6 mb-3">
                <div className="flex-1 rounded-sm shadow-md cursor-pointer hover:opacity-80  flex bg-blue-700 items-center text-white justify-center gap-2 py-2 ">
                  <FaFacebook size={24} />
                  <span className="text-xl font-bold">Facebook</span>
                </div>
                <div className="flex-1 rounded-sm shadow-md cursor-pointer hover:opacity-80  flex text-[#333]  items-center  justify-center gap-2 py-2 ">
                  <FcGoogle size={24} />
                  <span className="text-xl font-bold">Google</span>
                </div>
              </div>
            </>
          )}

          {register && (
            <div className="mx-auto mb-6 flex flex-col items-center">
              <span
                onClick={() => {
                  navigate(`/${Path.LOGIN}`), setCheckMail(0);
                  setPayLoad(initState);
                }}
                className="underline cursor-pointer hover:text-red-600 flex items-center decoration-solid"
              >
                <span>
                  <TbArrowBackUp size={20} />
                </span>
                Quay lại đăng nhập
              </span>
            </div>
          )}
          {forgot && (
            <div className="mx-auto mb-6 flex flex-col items-center">
              <span
                onClick={() => {
                  navigate(`/${Path.LOGIN}`), setCheckMail(0);
                  setPayLoad(initState);
                }}
                className="underline cursor-pointer hover:text-red-600 flex items-center decoration-solid"
              >
                <span>
                  <TbArrowBackUp size={20} />
                </span>
                Quay lại đăng nhập
              </span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Login;
