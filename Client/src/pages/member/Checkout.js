import React, { useState, useEffect } from 'react'
import imageCart from '../../assets/img/cart.gif'
import { useSelector, useDispatch } from 'react-redux'
import * as apis from '../../apis'
import { fnPrice } from '../../ultils/fn'
import icons from '../../ultils/icon'
import { Payment } from '../public'
import { AddressSelector } from '../../components'
import { useNavigate } from 'react-router-dom';
import Path from '../../ultils/path'
import { getCurrentUser } from '../../store/action'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import Select from 'react-dropdown-select'
import { optionsPayment } from '../../store/action'


const { TbArrowBackUp } = icons


const Checkout = () => {

    const dispatch = useDispatch()
    const history = useNavigate();
    const { cart, methodPayment, address } = useSelector(state => state.cart)
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentIntent, setPaymentIntent] = useState([]);
    console.log(methodPayment[0]?.method)

    const onChangepaymentIntent = (data) => {

        setPaymentIntent(data)
    }

    useEffect(() => {
        let total = 0;

        if (cart && cart?.length > 0) {
            for (const e of cart) {
                const cash = e.product?.price;
                const quantity = e.quantity
                if (cash) {
                    total += (cash * quantity);
                }
            }
        }
        setTotalPrice(total)

    }, [cart]);

    const handleOrder = async () => {
        if (address == '') return toast.warning('Vui lòng nhập địa chỉ nhận hàng')
        const response = await apis.apiCreateOrder({ products: cart, total: totalPrice, paymentIntent: methodPayment[0]?.method || paymentIntent[0]?.title , address, note: methodPayment[0]?.note||'', status: 'Pending' })
        if (response.status) {
            dispatch(getCurrentUser())
            Swal.fire({ text: 'Thanh toán thành công', icon: 'success' }).then(() => history(`/${Path.CART}`))
        }

    }


    return (
        <div className='flex md:container md:mx-auto h-screen items-center max-h-screen overflow-y-auto relative'>
            <div onClick={() => { history(`/${Path.CART}`) }} className=' cursor-pointer absolute top-10 left-0 px-6 py-2 rounded-md bg-main-100 text-white'><TbArrowBackUp size={23} /></div>
            <div className='grid grid-cols-2 gap-4 flex-row w-full '>
                <div className='col-span-1'>
                    <img src={imageCart} alt="cart" />
                </div>
                <div className='col-span-1 flex-col gap-2 mt-10'>
                    <h5 className='capitalize text-xl font-semibold  border-b py-4 mt-0'>
                        Thanh toán :
                    </h5>
                    {cart?.map((i, index) => (
                        <div key={index} className="  w-full flex items-center border-b py-2 gap-2  group">
                            <div className="flex w-full gap-3">
                                <img src={i.product?.thumbnail[0]} alt="image" className="object-contain w-[80px]" />

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
                                                    <span className=" py-1 border-r border-l text-center w-[40px] select-none">{i.quantity}</span>
                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='flex border-b py-2 justify-between'>
                        <h5 className='m-o text-lg font-semibold'>Tổng :</h5>
                        <span className='text-main-100 pr-4 font-semibold'>{fnPrice(totalPrice)}₫</span>
                    </div>
                    <div className='mb-4 '>
                        <AddressSelector />
                    </div>
                    {methodPayment[0]?.method == 'Thanh toán bằng Paypal' &&
                        <Payment payload={{ products: cart, total: totalPrice, paymentIntent: methodPayment[0]?.method, address, note: methodPayment[0]?.note, status: 'Success' }} amount={Math.round(totalPrice / 23500)} />
                    }


                    {methodPayment[0]?.method == 'Thanh toán khi nhận hàng' &&
                        <div className='w-full'>
                            <button onClick={() => handleOrder()} type='button' className='w-full rounded-md text-white font-semibold btn px-4 py-1 bg-red-500'>Đặt hàng </button>
                        </div>
                    }
                    {
                        !methodPayment[0]?.method &&
                        <>
                            <div className="flex flex-col gap-3">
                                <div className='flex flex-col gap-3 z-50'>
                                    <label className='font-semibold' htmlFor="Material">Phương thức thanh toán:</label>
                                    <Select
                                        values={paymentIntent}
                                        options={optionsPayment}
                                        onChange={(values) => onChangepaymentIntent(values)}
                                        labelField="title" valueField="title"
                                        placeholder='Vui lòng chọn Phương thức thanh toán'
                                        className
                                    />
                                </div>

                                
                                {paymentIntent[0]?.title === 'Thanh toán bằng Paypal' &&
                                   <div className='mt-10 w-full z-10'>
                                     <Payment payload={{ products: cart, total: totalPrice, paymentIntent: paymentIntent[0]?.title, address, note: methodPayment[0]?.note || '', status: 'Success' }} amount={Math.round(totalPrice / 23500)} />
                                   </div>
                                }

                                {paymentIntent[0]?.title === 'Thanh toán khi nhận hàng' &&
                                    <div className='w-full'>
                                        <button onClick={() => handleOrder()} type='button' className='w-full rounded-md text-white font-semibold btn px-4 py-1 bg-red-500'>Đặt hàng </button>
                                    </div>
                                }
                            </div>

                        </>


                    }
                </div>
            </div>
        </div>
    )
}

export default Checkout
