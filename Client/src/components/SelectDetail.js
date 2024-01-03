import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { noShow } from "../store/Slice/appSlice";
import { fnPrice } from "../ultils/fn";
import icons from "../ultils/icon";
import { useNavigate } from "react-router-dom";
import * as apis from '../apis/user'
import Box from "../assets/img/img_policy_product_1.png";
import exchange from "../assets/img/img_policy_product_2.webp";
import Shipment from "../assets/img/img_policy_product_3.webp";
import { toast } from "react-toastify";
import { getCurrentUser } from '../store/action'



const { HiMinus, HiMiniPlus, RiShoppingCartLine } = icons;
const SelectDetail = ({ isShow }) => {
    const navigate = useNavigate();
    const { size } = useSelector((state) => state.app);
    const { oneProduct } = useSelector((state) => state.product);
    const { user } = useSelector((state) => state.auth);

    const Dispatch = useDispatch();
    const [Select, setSelect] = useState(36);
    const [Number, setNumber] = useState(1);
    const [checkShoes, setCheckShoes] = useState(null);
    useEffect(() => {
        if (Select == 0) setNumber(1);
    }, [oneProduct]);



    

    const handlerSelect = (e) => {
        setSelect(e);
        if (oneProduct?.size?.some((i) => i == e)) setCheckShoes(true);
        setCheckShoes(false);
    };
    const HandleViewDetail = () => {
        Dispatch(noShow());
        navigate(`/${oneProduct?.category?.slug}/${oneProduct?.slug}`);
    };

    const handleAddCart = async () => {
        if (!user) {
            toast.warning('Thêm vào giỏ hàng thất bại. Vui lòng đăng nhập để thêm vào giỏ hàng của mình !!')
        }
        const response = await apis.apiAddCart({ pid: oneProduct._id, size: Select, quantity: Number })
        if (response.status) {
            toast.success(response.mes)
            Dispatch(getCurrentUser())
        }
    }

    return (
        <div className="flex-1 p-4  flex flex-col gap-3 bg-white justify-start h-full py-6 text-md font-medium  capitalize text-[#292929] ">
            <span className="font-semibold">{oneProduct?.title}</span>
            <span>
                Tình trạng:{" "}
                <span className="text-main-100">{`${oneProduct?.quantity > 0 && checkShoes ? "Còn hàng" : "Hết hàng"
                    }`}</span>
            </span>
            <span className="text-main-200 font-bold">{`${fnPrice(oneProduct?.price)}₫`}</span>
            <span className="text-[#6a6a6a]">Kích thước: {Select}</span>
            <div className="flex gap-3 flex-wrap items-center">
                {size?.map((i) => (
                    <div
                        onClick={() => handlerSelect(i.size)}
                        className={`flex  items-center cursor-pointer  border-[1px] px-2 py-1 ${Select === i.size ? "border-[1px] border-dashed border-main-300" : ""
                            }`}
                        key={i._id}
                    >
                        <span>{i.size}</span>
                    </div>
                ))}
            </div>
            <div className="flex items-center ml-10 gap-2 select-none  ">
                <div className="bg-[#ddd] border-[1px]  flex items-center">
                    <span
                        onClick={() => setNumber((prev) => (prev == 0 ? prev : prev - 1))}
                        className="py-2 px-4 cursor-pointer"
                    >
                        <HiMinus />
                    </span>
                    <span className=" py-2 bg-white text-center w-[50px] select-none">{Number}</span>
                    <span onClick={() => setNumber((prev) => prev + 1)} className="py-2 px-4 cursor-pointer ">
                        <HiMiniPlus />
                    </span>
                </div>
            </div>
            <div className="w-full flex items-center py-3 gap-2">
                <div onClick={handleAddCart} className=" disabled:opacity-75 border-btn border-[1px] select-none flex w-1/2 py-3 bg-red-100 p-2 rounded-sm text-sm font-semibold text-main-100 cursor-pointer items-center gap-2 hover:bg-red-50">
                    <RiShoppingCartLine size={20} /> <span>Thêm vào giỏ hàng</span>
                </div>
                <div className="  bg-main-100 select-none text-white text-center flex w-1/2 py-3 p-2 rounded-sm text-sm font-semibold  cursor-pointer items-center justify-center hover:bg-btn">
                    <span>+ mua với voucher</span>
                </div>
            </div>
            {!isShow && (
                <span
                    className="cursor-pointer decoration-solid underline  hover:text-main-100"
                    onClick={() => HandleViewDetail()}
                >
                    Xem chi tiết {`>>`}{" "}
                </span>
            )}
            <div className="flex ">
                <div className="flex-1">
                    <img src={Box} className="img-fluid rounded-top object-contain" alt="" />
                </div>
                <div className="flex-1">
                    <img src={exchange} className="img-fluid rounded-top object-contain" alt="" />
                </div>
                <div className="flex-1">
                    <img src={Shipment} className="img-fluid rounded-top object-contain" alt="" />
                </div>
            </div>
        </div>
    );
};

export default SelectDetail;
