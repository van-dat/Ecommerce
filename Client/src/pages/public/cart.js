import React, { useState } from 'react'
import { BreadCrumb, Product } from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { totalPrice } from '../../ultils/_helper'
import { fnPrice } from '../../ultils/fn'
import icons from '../../ultils/icon'
import { getCurrentUser } from '../../store/action'
import * as apis from '../../apis'
import Path from '../../ultils/path'
import { cartCurrent, getMethodPayment } from '../../store/Slice/cartSlice'
import { toast } from 'react-toastify'
import Select from 'react-dropdown-select';
import { optionsPayment } from '../../store/action'

const { HiMiniPlus, HiMinus, MdOutlineDelete, PiShoppingCartThin } = icons




const Cart = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { reviewProduct } = useSelector(state => state.product)
    const [selectedValues, setSelectedValues] = useState([]);
    const [note, setNote] = useState('');
    const [paymentIntent, setPaymentIntent] = useState([]);
    const [review, setReview] = useState([]);

    const [listProductPayment, setListProductPayment] = useState([]);

    const fetchData = async (pid) => {
        const response = await apis.apiOneProduct(pid);
        if (response.success) {
            setReview(prevReview => [...prevReview, response.product])
        }
    };

    useEffect(() => {
        setReview([])

        if (Array.isArray(reviewProduct) && reviewProduct?.length > 0) {
            const fetchDataForAllUsers = async () => {
                await Promise.all(reviewProduct?.map(e => fetchData(e)));
            };
            fetchDataForAllUsers();
        }
    }, [reviewProduct]);



    const handleChangeProduct = (e, value, product) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setSelectedValues([...selectedValues, value]);
            setListProductPayment([...listProductPayment, product])

        } else {
            setSelectedValues(selectedValues.filter((val) => val !== value));
            setListProductPayment(listProductPayment.filter((val) => val !== product));
        }
    }

    const handleReduce = async (e, pid) => {
        const response = await apis.apiUpdateQuantity({ id: e, action: 0, pid })
        if (response.result == 'ok') {
            dispatch(getCurrentUser())
        }else {
            toast.warning(response.msg)
            dispatch(getCurrentUser())
        }
    }


    const handleIncrease = async (e, pid) => {
        console.log(pid)
        const response = await apis.apiUpdateQuantity({ id: e, action: 1, pid })
        if (response.result == 'ok') {

            dispatch(getCurrentUser())
        }
    }

    const onChangepaymentIntent = (data) => {
        setPaymentIntent(data)
    }



    const handleRemove = async (e) => {
        const response = await apis.apiRemoveItemCart({ id: e })
        if (response.result == true) {
            dispatch(getCurrentUser())
        }
    }
    // payment
    const handlePayment = () => {
        const data = []
        if (listProductPayment?.length < 1) {
            if(listProductPayment)
            return toast.warning('Vui lòng chọn sản phẩm để thanh toán ')
        }
        if (paymentIntent?.length < 1) {
            return toast.warning('Vui lòng chọn phương thức thanh toán ')
        }
        dispatch(cartCurrent(listProductPayment))
        navigate(`/${Path.CHECKOUT}`)
        data.push({ method: paymentIntent[0].title, note: note })
        dispatch(getMethodPayment(data))
        setPaymentIntent([])
    }

    console.log(user)

    return (
        <div className='mt-[165px] md:container md:mx-auto '>
            <BreadCrumb />
            <div className="flex pb-4">
                <div className="flex flex-8 flex-col gap-4 pr-2  ">
                    <div className='bg-white flex flex-col p-4 w-full gap-2 max-h-[450px]'>
                        <h5 className='capitalize text-xl font-semibold'>
                            Giỏ hàng :
                        </h5>
                        {user?.cart?.length < 1 &&
                            <div className="flex items-center max-h-[450px] justify-center h-[450px] flex-col border-b mt-3 pb-4 text-main">
                                <PiShoppingCartThin size={60} />
                                <span >Hiện chưa có sản phẩm</span>
                            </div>
                        }
                        <div className='w-full flex flex-col max-h-[400px] overflow-y-auto'>
                            {user?.cart?.map((i, index) => (
                                <div key={index} className="  w-full flex items-center border-t py-2 gap-2  group">
                                    <input onChange={(e) => handleChangeProduct(e, i._id, i)}
                                        type="checkbox"
                                        value={i._id}
                                        id={i.size}
                                        className="checkbox2  h-[15px] w-[15px] outline-none focus:text-main-300 border-none  "
                                    />
                                    <div className="flex w-full gap-3">
                                        <img src={i.product.thumbnail[0]} alt="image" className="object-contain w-[80px]" />

                                        <div className='block w-full'>
                                            <div className="flex  flex-col text-sm gap-3 flex-2">
                                                <span className="font-semibold capitalize">
                                                    {i.product.title}
                                                </span>
                                                <div className='flex justify-between w-full flex-1'>
                                                    <div className='flex flex-col'>
                                                        <span>Kích Thước : <span>{i.size}</span></span>
                                                        <span>Giá : <span className='text-main-100 font-semibold' >{fnPrice(i.product?.price)}₫</span></span>
                                                    </div>
                                                    <div className='flex items-center   gap-6 select-none justify-center flex-1'>
                                                        <div className=" border-[1px]  flex items-center">
                                                            <span
                                                                onClick={() => handleIncrease(i._id, i.product._id)}
                                                                className="py-1  px-2 cursor-pointer"
                                                            >
                                                                <HiMinus />
                                                            </span>
                                                            <span className=" py-1 border-r border-l text-center w-[40px] select-none">{i.quantity}</span>
                                                            <span onClick={() => handleReduce(i._id,i.product._id)} className="py-1 px-2 cursor-pointer ">
                                                                <HiMiniPlus />
                                                            </span>
                                                        </div>
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

                    </div>


                </div>
                <div className="flex flex-2 pl-2 max-h-[450px] ">
                    <div className='bg-white flex-col p-4 w-full'>
                        <h5 className='capitalize text-lg font-semibold border-b pb-3'>
                            thông tin đơn hàng
                        </h5>
                        <div className="flex justify-between items-center py-3 border-b">
                            <h5 className="capitalize font-semibold ">Tổng tiền:</h5>
                            <span className="text-red-600 font-semibold ">{fnPrice(totalPrice(user, selectedValues)) || '0'}₫</span>
                        </div>
                        <div className="flex py-3 flex-col gap-3">
                            <h5 className=" font-semibold ">Ghi chú đơn hàng</h5>
                            <textarea
                                className='border p-2 text-sm focus:outline-none'
                                onChange={(e) => setNote(e.target.value)}
                                rows={4}
                                cols={35}
                                value={note}
                            />
                        </div>
                        <div className="flex py-3 flex-col gap-3">
                            <label className='font-semibold' htmlFor="Material">Phương thức thanh toán:</label>
                            <Select
                                values={paymentIntent}
                                options={optionsPayment}
                                onChange={(values) => onChangepaymentIntent(values)}
                                labelField="title" valueField="title"
                                placeholder='Vui lòng chọn Phương thức thanh toán'
                            />
                        </div>
                        <div onClick={() => handlePayment()} className="uppercase cursor-pointer rounded-sm  text-md font-semibold px-4 py-2 flex flex-1 justify-center hover:bg-hover  bg-[#a00000] text-white ">
                            Thanh toán ngay
                        </div>
                    </div>
                </div>



            </div>
            <div className='bg-white p-4 mb-4 flex flex-col '>
                <div className='border-l-4 uppercase border-l-black  text-xl font-bold p-2 mb-2 '>
                    Sản phẩm đã xem
                </div>
                <Product css
                    data={review}
                />
            </div>

        </div>
    )
}

export default Cart
