import React, { useCallback, useEffect, useState } from 'react'
import icons from '../../../ultils/icon'
import * as apis from '../../../apis'
import Search from '../../../components/Search'
import InputForm from './InputForm'
import Selected from './Selected'
import { useSelector } from 'react-redux'
import { convertDateFormat } from '../../../ultils/_helper'
import { useForm } from 'react-hook-form'
import { Toast, toast } from 'react-toastify'
import { valueRole, valueStatus } from '../../../store/action'
import { Pagination } from '../../../components'

const { BsFillTrashFill, HiOutlinePencilSquare, IoIosCloseCircleOutline } = icons

const Table = () => {

  const { handleSubmit, register, formState: { errors } } = useForm({
    email: '',
    firstname: '',
    lastname: '',
    role: '',
    phone: '',
    status: '',
  })



  const { user } = useSelector(state => state.auth)
  const { search } = useSelector(state => state.app)
  const [data, setData] = useState(null);
  const [dataTable, setDataTable] = useState(null);
  const [editTable, setEditTable] = useState(null);
  const [updateState, setUpdateState] = useState(false);
  const [Count, setCount] = useState();
  const [page, setPage] = useState(1);


  const fetchData = async () => {
    const response = await apis.apiGetAllUser({ page: page })
    if (response.success) {
      setDataTable(response.products)
      setData(response.products)
      setCount(response.counts)
    }
  }



  const render = useCallback(() => {
    setUpdateState(!updateState)
  })
  useEffect(() => {
    if (!search) {
      fetchData()
    } else {
      setDataTable(search)
    }
  }, [search, updateState]);


  const handleUpdate = async (data) => {
    if (editTable) {
      const response = await apis.apiUpdateAdmin(data, editTable._id)
      if (response.success) {
        render()
        toast.success(response.mes)
        setEditTable(null)
      } else {
        toast.success(response.mes)
        setEditTable(null)
      }
    }
  }

  const deleteTable = async (uid) => {
    const response = await apis.apiDeleteUser(uid)
    if (response.success) {
      render()
      toast.success(response.mes)
      setDataTable(null)
    }
  }
  console.log(dataTable)

  return (
    <>
      <div className='flex flex-col gap-2'>
       
        <div className="w-full overflow-hidden flex flex-col">

          <form onSubmit={handleSubmit(handleUpdate)}>
            <div className='flex items-center justify-between '>
              <div className='p-2 '>
                {editTable && <button type="submit" className='btn bg-green-600 text-white p-2 rounded-md'>Update</button>}
              </div>
              <div className='w-[400px] p-2'>
                <Search data={data} />
              </div>
            </div>
            <table className="table-auto w-full ">
            <tbody>
              <tr className="bg-gray-2 text-left bg-[#24303F] py-8 text-white">
                <th className="min-w-[30px] text-center  p-4 font-medium  ">STT</th>
                <th className="min-w-[60px] text-center  p-4 font-medium  ">Email</th>
                <th className=" p-4 font-medium text-center  ">First Name</th>
                <th className=" p-4 font-medium text-center  ">Last Name</th>
                <th className=" text-center  p-4 font-medium  ">Role</th>
                <th className=" p-4 font-medium text-center  ">Trạng Thái</th>
                <th className=" p-4 font-medium text-center  ">Actions</th>
              </tr>
            </tbody>
              {dataTable?.filter(el => el._id !== user?._id)?.map((item, index) => (
                <tbody key={index}> 
                <tr  className="content-center">
                  <td className="border-b text-center border-[#eee] py-5 px-4 dark:border-strokedark">
                    {index + 1}
                  </td>
                  <td className="border-b text-center border-[#eee] py-5 px-4 dark:border-strokedark">
                    {editTable?._id === item._id ? <InputForm
                      register={register}
                      defaultValue={item.email}
                      errors={errors}
                      fullWidth
                      id={'email'}
                      validate={{
                        require: true, pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "Invalid email address",
                        },
                      }}
                    /> : <span>{item.email}</span>}
                  </td>

                  <td className="border-b text-center border-[#eee] py-5 px-4 dark:border-strokedark">
                    {editTable?._id === item._id ? <InputForm
                      register={register}
                      defaultValue={item.firstname}
                      errors={errors}
                      fullWidth
                      id={'firstname'}
                      validate={{ require: true }}
                    /> : <span>{item.firstname}</span>}
                  </td>
                  <td className="border-b text-center border-[#eee] py-5 px-4 dark:border-strokedark">
                    {editTable?._id === item._id ? <InputForm
                      register={register}
                      defaultValue={item.lastname}
                      errors={errors}
                      fullWidth
                      id={'lastname'}
                      validate={{ require: true }}
                    /> : <span>{item.lastname}</span>}
                  </td>
                  <td className="border-b text-center text-black border-[#eee] py-5 px-4 dark:border-strokedark">
                    {editTable?._id === item._id ?
                      <Selected
                        register={register}
                        defaultValue={item?.role}
                        errors={errors}
                        fullWidth
                        options={valueRole}
                        id={'role'}
                        validate={{ require: true }} />
                      : <span className={`px-1 rounded-lg`}>
                        {item.role}
                      </span>
                    }

                  </td>
                  <td className="border-b text-center text-black border-[#eee] py-5 px-4 dark:border-strokedark">
                    {editTable?._id === item._id ?
                      <Selected
                        register={register}
                        defaultValue={item.isBlocked ? 'InActive' : 'Active'}
                        errors={errors}
                        fullWidth
                        options={valueStatus}
                        id={'status'}
                        validate={{ require: true }} />
                      : <span className={`px-1 rounded-lg text-white ${item.isBlocked ? 'bg-green-500' : ' bg-red-500'}`}>
                        {item.isBlocked ? 'Active' : 'InActive'}
                      </span>}
                  </td>
                  {!editTable?._id === item._id &&
                    <td className="border-b text-center border-[#eee] py-5 px-4 dark:border-strokedark">
                      {convertDateFormat(item.createdAt)}
                    </td>
                  }

                  <td className="border-b   border-[#eee] py-5 px-4 dark:border-strokedark">
                    <span className="actions w-full justify-center items-center flex grid-cols-2 gap-4">
                      <BsFillTrashFill color='red'
                        className="delete-btn cursor-pointer"
                        onClick={() => deleteTable(item._id)} />

                      {!editTable &&
                        <HiOutlinePencilSquare
                          className="edit-btn cursor-pointer"
                          onClick={() => setEditTable(item)} />
                      }
                      {editTable?._id === item._id &&
                        <IoIosCloseCircleOutline size={20}
                          className="edit-btn cursor-pointer"
                          onClick={() => setEditTable(null)} />
                      }

                    </span>
                  </td>
                </tr>
                </tbody>
              ))}
            </table>
          </form>
          <div className='flex justify-between'>
            <div></div>
            <Pagination totalPage={Count}
              setPage={setPage} />

          </div>
        </div>
      </div>


    </>
  )
}

export default Table
