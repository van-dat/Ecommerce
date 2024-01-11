import React, { memo, useState, useEffect } from 'react'
import icons from '../../../ultils/icon'
import * as apis from '../../../apis'
import { fnPrice } from '../../../ultils/fn'

const { BsCart2, CiLocationOn, HiOutlineGift, TfiUser } = icons
const Card = () => {

    const [statistical, setStatistical] = useState(null);


    const fetchData = async () => {
        const response = await apis.apiGetStatistical()
        console.log(response)
        if (response.status) {
            setStatistical(response)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);
    console.log(statistical?.totalOrder)
    return (

        <div className="grid grid-cols-4 justify-around gap-6">

            <div className="col-span-1 shadow-md rounded-md bg-white">
                <div className="p-3">
                    <div className="flex justify-between mb-3">
                        <div className='flex flex-col'>
                            <span className="block text-xl font-medium mb-3">Đơn hàng</span>
                            <div className="text-900 font-medium text-xl">{statistical?.totalOrder}</div>
                        </div>
                        <div className="flex align-center rounded-md w-full  bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <span className='w-full text-blue-500 flex justify-center items-center'><BsCart2 size={20} /></span>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">24 new </span>
                    <span className="text-500">since last visit</span>
                </div>
            </div>
            <div className="col-span-1 shadow-md rounded-md bg-white">
                <div className="p-3">
                    <div className="flex justify-between mb-3">
                        <div>
                            <span className="block text-xl font-medium mb-3">Doanh thu</span>
                            <div className="text-900 font-medium text-xl">{fnPrice(statistical?.totalPayment)}VND</div>
                        </div>
                        <div className="flex align-center rounded-md w-full bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <span className='w-full text-orange-500 flex justify-center items-center'><CiLocationOn size={20} /></span>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">%52+ </span>
                    <span className="text-500">since last week</span>
                </div>
            </div>
            <div className="col-span-1 shadow-md rounded-md bg-white">
                <div className="p-3">
                    <div className="flex justify-between mb-3">
                        <div>
                            <span className="block text-xl font-medium mb-3">Khách hàng</span>
                            <div className="text-900 font-medium text-xl">{statistical?.totalUser}</div>
                        </div>
                        <div className="flex align-center bg-cyan-100 rounded-md" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <span className='w-full text-cyan-500 flex justify-center items-center'><TfiUser size={20} /></span>

                        </div>
                    </div>
                    <span className="text-green-500 font-medium">520  </span>
                    <span className="text-500">newly registered</span>
                </div>
            </div>
            <div className="col-span-1 shadow-md rounded-md bg-white">
                <div className="p-3">
                    <div className="flex justify-between mb-3">
                        <div>
                            <span className="block text-xl font-medium mb-3">Sản phẩm</span>
                            <div className="text-900 font-medium text-xl">{statistical?.totalProduct} Sp</div>
                        </div>
                        <div className="flex align-center bg-purple-100 rounded-md" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <span className='w-full text-purple-500 flex justify-center items-center'><HiOutlineGift size={20} /></span>
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">85 </span>
                    <span className="text-500">responded</span>
                </div>
            </div>
        </div>
    )
}

export default memo(Card)
