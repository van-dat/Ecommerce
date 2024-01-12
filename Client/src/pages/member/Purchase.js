import React, { memo, useState, useEffect } from 'react'
import * as apis from '../../apis'
import { fnPrice } from '../../ultils/fn'
import moment from 'moment'
import {toast} from 'react-toastify'

const Purchase = () => {


    const [orderUser, setOrderUser] = useState(null);


    const fetchData = async () => {
        const response = await apis.apiGetOrderUser()
        if (response.status) {
            setOrderUser(response.rs)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    const handleCancelOrder = async(oid) => {
        const response = await apis.apiUpdateOder({status:'Canceled'}, oid)
        if(response.status){
            toast.success(response.msg)
            fetchData()
        }else {
            toast.warning(response.msg)
        }
    }
    

    console.log(orderUser)
    return (
        <div>
            <div className='w-full flex flex-col p-4 max-h-[400px] overflow-y-auto'>
                <div className='p-4 mb-4 flex justify-between items-center  text-2xl font-semibold bg-white rounded-md'>
                    <h6 className=' m-0 text-xl text-[#333] uppercase'>Lịch sử mua hàng</h6>
                </div>
                {orderUser?.map((i, index) => (
                    <div key={index} className="  w-full flex items-center border-t py-2 gap-2  group">
                        <div className="flex w-full gap-3">
                            <img src={i?.products[0]?.product?.thumbnail[0]} alt="image" className="object-contain w-[80px]" />

                            <div className='block w-full'>
                                <div className="flex  flex-col text-sm gap-3 flex-2">
                                    <span className="font-semibold uppercase">
                                        {i?.products[0]?.product?.title}
                                    </span>
                                    <div className='flex justify-between w-full flex-1'>
                                        <div className='flex flex-col'>
                                            <span>Kích Thước : <span>{i?.products[0]?.size[0]}</span></span>
                                            <span>Giá : <span className='text-main-100 font-semibold' >{fnPrice(i?.products[0]?.product?.price)}₫</span></span>
                                            <span>Ngày mua : <span>{moment(i?.createdAt).format('DD-MM-YYYY')}</span></span>
                                        </div>
                                        <div className='min-w-[150px]'>
                                            <span className='text-start'>Tình trạng: <span className='text-red-500'>{i.status == "Processing" ? 'Đang xử lý' : i.status == 'Canceled' ? 'Đã hủy' : i.status == 'Pending' ? 'Đang chờ xác nhận' : 'Thành công'}</span></span>
                                           
                                        </div>
                                        <div className='flex flex-col  gap-2'>
                                            {i.status == 'Pending' && 
                                            <button onClick={()=>handleCancelOrder(i._id)} type='button' className='px-2 py-1 text-white font-medium rounded-md bg-red-500 text hover:opacity-70 shadow-md  '>Hủy đơn hàng</button>}
                                            <div className='text-md font-medium min-w-[150px]'>Thành tiền :<span className='text-red-500 '>{fnPrice(i.total)}₫</span></div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default memo(Purchase)
