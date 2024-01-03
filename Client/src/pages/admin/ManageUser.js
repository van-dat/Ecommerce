import React from 'react'
import Table from './components/Table'
import Search from '../../components/Search'
const ManageUser = () => {
  return (
    <div className='flex flex-col '>
       <div className='p-4 mb-4 flex justify-between items-center  text-2xl font-semibold bg-white rounded-md'>
          <h6 className=' m-0 text-2xl text-[#333] uppercase'>Manage User</h6>
        </div>
      <div className='bg-white  rounded-md '>
        <Table />
      </div>
    </div>
  )
}

export default ManageUser
