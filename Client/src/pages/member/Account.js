import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import profile from '../../assets/img/1.jpeg'

const Account = () => {

  const { user } = useSelector(state => state.auth)
  console.log(user)
  return (
    <div className='flex w-full p-4 flex-col '>
      <div className='flex  flex-col border-b w-full pb-4'>
        <h5 className='font-bold text-lg m-0'>Hồ Sơ Của Tôi</h5>
        <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
      </div>



      <div className=' w-full md:container md:mx-auto flex flex-col '>
        <div className='flex w-full items-center justify-center py-4 '>
          <img src={profile} alt="image" className='w-[150px] h-[150px] object-contain rounded-full' />
        </div>


        <div className='flex justify-center items-center '>
          <div>
            <div className='flex gap-4'>
              <span className='min-w-[120px] text-[#333] text-end text-md font-medium '>Tên người dùng:</span>
              <span className='text-md font-medium capitalize'>{user?.firstname} {user?.lastname}</span>
            </div>
            <div className='flex  gap-2 py-2'>
              <span className='min-w-[120px] text-[#333] text-end text-md font-medium '>Email:</span>
              <span className='text-md font-medium '>{user?.email}</span>
            </div>
            <div className='flex  gap-2 py-2'>
              <span className='min-w-[120px] text-[#333] text-end text-md font-medium '>SDT:</span>
              <span className='text-md font-medium '>{user?.mobile} </span>
            </div>
          </div>

        </div>


      </div>
    </div>
  )
}

export default memo(Account)
