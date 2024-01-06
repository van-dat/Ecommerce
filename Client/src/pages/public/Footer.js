import React, { memo } from 'react'

import icons from '../../ultils/icon'



const { CiLocationOn, RiTelegramLine, CiMail } = icons


const Footer = () => {
    return (
        <div className='grid grid-cols-4 md:container md:mx-auto text-white py-6'>
            <div className='col-span-1  flex flex-col gap-4 p-2'>
                <span className='text-2xl font-semibold '>
                    GIỚI THIỆU
                </span>
                <span className='font-semibold text-md'>Shoes Store chuyên cung cấp, order các loại giày authentic từ các hãng Nike, Adidas, Puma, MLB...</span>
                <div className='flex items-center gap-1 font-semibold text-md hover:text-red-800 cursor-pointer'><span><CiLocationOn /></span> Tầng 4 - Số nhà 31, ngách 69, ngõ 117 Ngũ Hành Sơn, Đà Nẵng</div>
                <div className='flex items-center gap-1 font-semibold text-md  hover:text-red-800 cursor-pointer'><span><RiTelegramLine /></span> 099999999</div>
                <div className='flex items-center gap-1 font-semibold text-md  hover:text-red-800 cursor-pointer'><span><CiMail /></span>shoestore@gmail.com</div>
            </div>
            <div className='col-span-1  text-white p-2 flex flex-col gap-4'>
                <span className='text-2xl font-semibold '>
                    CHÍNH SÁCH
                </span>
                <ul className='list-disc px-4 flex flex-col gap-2 font-semibold text-md'>
                    <li className='hover:text-red-800 cursor-pointer'>Chính sách bảo mật thông tin</li>
                    <li className='hover:text-red-800 cursor-pointer'>Chính sách thanh toán</li>
                    <li className='hover:text-red-800 cursor-pointer'>Chính sách vận chuyển và giao nhận</li>
                    <li className='hover:text-red-800 cursor-pointer'>Chính sách kiểm hàng</li>
                    <li className='hover:text-red-800 cursor-pointer'>Chính sách đổi trả</li>
                    <li className='hover:text-red-800 cursor-pointer'>Chính sách xử lý khiếu nại</li>
                    <li className='hover:text-red-800 cursor-pointer'>Chính sách bảo hành</li>
                </ul>
            </div>
            <div className='col-span-1  text-white p-2 flex flex-col gap-4'>
                <span className='text-2xl font-semibold '>
                    HƯỚNG DẪN
                </span>
                <ul className='list-disc px-4 flex flex-col gap-2 font-semibold text-md'>
                    <li className='hover:text-red-800 cursor-pointer'>Hướng dẫn order</li>
                    <li className='hover:text-red-800 cursor-pointer'>Hướng dẫn mua hàng</li>
                    <li className='hover:text-red-800 cursor-pointer'>Điều khoản dịch vụ</li>
                    <li className='hover:text-red-800 cursor-pointer'>Tất cả sản phẩm</li>
                    <li className='hover:text-red-800 cursor-pointer'>Liên Hệ</li>

                </ul>
            </div>
            <div className='col-span-1  text-white p-2 flex flex-col gap-4'>
                <span className='text-2xl font-semibold '>
                    FANPAGE CHÚNG TÔI
                </span>

            </div>

        </div>
    )
}

export default memo(Footer)
