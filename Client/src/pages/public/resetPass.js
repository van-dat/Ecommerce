import React, { useState } from "react";
import icons from "../../ultils/icon";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Path from "../../ultils/path";
import { fnCheckMail } from "../../ultils/fn";
import * as apis from "../../apis";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { checkNull } from "../../ultils/_helper";

const ResetPass = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams()
    const initState = {
        password: "",
        confirmPass: ""
    };

    const [payLoad, setPayLoad] = useState(initState);
    const { password, confirmPass } = payLoad;

    const handleSubmit = async () => {
        if (checkIsNull(password) == 1 || checkIsNull(confirmPass) == 1) return
        if (password !== confirmPass) {
            toast.warning('Mật khẩu không trùng khớp')
            return
        }

        const response = await apis.apiResetPass({ password, token })
        console.log(response)
        if (response.success == true) {
            toast.success(response.msg)
            navigate(Path.LOGIN)
            setPayLoad(initState)
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

    return (
        <div className="mt-[165px]  bg-gradient-to-b from-[#dee7ee] to-[#eaf1f6] pb-10">
            <div className="w-full h-[70px]"></div>
            <div className=" md:container md:mx-auto ">
                <div className=" max-w-[650px] mx-auto bg-white flex flex-col p-6 shadow-sm rounded-sm ">
                    <span className="mx-auto font-semibold text-xl ">Thay Đổi Mật Khẩu</span>
                    <div className="mb-6">
                        <span className="py-2 text-sm">Nhập mật khẩu mới</span>
                        <input
                            type="password"
                            value={payLoad?.password}
                            placeholder="Mật Khẩu"
                            onChange={(e) => setPayLoad((prev) => ({ ...prev, password: e.target.value }))}
                            className="border-1 border w-full h-9 px-4 outline-none rounded-md"
                        />
                    </div>

                    <div className="mb-6">
                        <span className="py-2 text-sm">Xác nhận mật khẩu</span>
                        <input
                            type="password"
                            value={payLoad?.confirmPass}
                            placeholder="Xác nhận mật khẩu"
                            onChange={(e) => setPayLoad((prev) => ({ ...prev, confirmPass: e.target.value }))}
                            className="border-1 border w-full h-9 px-4 outline-none rounded-md"
                        />
                    </div>
                    <div className="mx-auto mb-3 ">
                        <button
                            onClick={() => handleSubmit()}
                            className="px-3 py-2 rounded-md bg-red-800 text-white font-bold hover:opacity-80"
                        >
                            Thay Đổi Mật Khẩu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPass;
