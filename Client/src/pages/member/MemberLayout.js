import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { Header } from '../../components'
import profile from '../../assets/img/1.jpeg'
import { useSelector } from 'react-redux'
import Path from '../../ultils/path'

const Active = 'flex p-2  rounded-md text-md font-semibold text-red-500 shadow-md'
const inActive = 'flex p-2  rounded-md text-md font-semibold  '
const MemberLayout = () => {
  const { user } = useSelector(state => state.auth)
  console.log(user)
  return (
    <div className=' flex w-full relative bg-admin min-h-screen'>
      <div className={`fixed w-full z-20 bg-white`}>
        <Header />
      </div>
      <div className='grid w-full md:container md:mx-auto grid-cols-12 gap-4 mt-[175px] '  >
        <div className='col-span-3 w-full shadow-md rounded-md  '>
          <div className='p-4 flex items-center border-b gap-4'>
            <img src={profile} alt="image" className='w-[60px] h-[60px] object-contain rounded-full' />
            <span className='capitalize text-md font-semibold'>{user?.firstname} {user?.lastname}</span>
          </div>
          <div className='flex flex-col p-4  gap-2'>
            <NavLink
              to={Path.ACCOUNT}
              className={({ isActive }) => (isActive ? Active : inActive)}
            >
              Tài khoản của tôi
            </NavLink>
            <NavLink
              to={Path.PURCHASE}
              className={({ isActive }) => (isActive ? Active : inActive)}
            >
              Đơn mua
            </NavLink>
          </div>
        </div>
        <div className='col-span-9 w-full shadow-md rounded-md bg-white'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MemberLayout
