import React, { useState, useEffect, useCallback } from 'react'
import InputForm from './components/InputForm'
import { useForm } from 'react-hook-form'
import * as apis from '../../apis'
import notImage from './image/notimage.jpg'
import moment from 'moment'
import icons from '../../ultils/icon'
import { Pagination } from '../../components'
import UpdateProduct from './UpdateProduct'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

const { LuClipboardEdit, PiShoppingCartThin, BiSearch, BsFillTrashFill } = icons
const ManageProduct = () => {

  const { register, formState: { errors }, handleSubmit, reset } = useForm()
  const [counts, setCounts] = useState();

  const [dataProduct, setDataProduct] = useState();
  const [editProduct, setEditProduct] = useState(null);
  const [update, setUpdate] = useState(false);
  const [page, setPage] = useState(1);





  const fetchData = async (params) => {
    const response = await apis.apiProducts(params)
    if (response.success) {
      setCounts(response.counts)
      setDataProduct(response.product)
    }

  }
  const handleSearch = (data) => {
    if (data.q == '') {
      fetchData()
    }
    fetchData({ title: data.q })
  }

  const render = useCallback(() => {
    setUpdate(!update)
  })
  useEffect(() => {
    fetchData({ page })
  }, [page, update ]);

  const handleDeleteProduct = (id, title) => {
    console.log(id, title)
    Swal.fire({ text: 'Xác nhận xóa sản phẩm'+" "+ title , icon:'warning'}).then(async()=>{
      const response = await apis.apiDeleteProduct(id)
      console.log(response)
      if(response.success) {
        toast.success(response.msg)
        fetchData({ page })
      }
    })
  }




  console.log(dataProduct)
  return (
    <div className='flex flex-col'>
      <div className='p-4 mb-4 flex justify-between items-center  text-2xl font-semibold bg-white rounded-md'>
        <h6 className=' m-0 text-2xl text-[#333] uppercase'>{update ? 'Update Product' : 'Manage Product'}</h6>
      </div>
      <div className='flex flex-col bg-white p-4 relative  '>
        {update &&
          <div className=' inset-0 absolute bg-white z-30'>
            <UpdateProduct
              render={render}
              editProduct={editProduct}
            />
          </div>
        }
        <div className='flex relative  justify-end  items-center  mb-4'>
          <form onSubmit={handleSubmit(handleSearch)} className='w-[40%]'>
            <InputForm
              id={'q'}
              placeholder='Search product by title'
              register={register}
              errors={errors}
              fullWidth
            />
          </form>
          <div className='absolute inset-y-0 right-0 flex items-center px-4 text-[#333] '><BiSearch size={23} /></div>
        </div>
        <table className="table-auto w-full border-t ">
          <thead>
            <tr >
              <th className='text-center py-4 '>STT</th>
              <th className='text-center py-4 '>Title</th>
              <th className='text-center py-4 '>Image</th>
              <th className='text-center py-4 '>Price</th>
              <th className='text-center py-4 '>Category</th>
              <th className='text-center py-4 '>Quantity</th>
              <th className='text-center py-4 '>Sold</th>
              <th className='text-center py-4 '>size</th>
              {/* <th className='text-center py-4 '>description</th> */}
              <th className='text-center py-4 '>UpdatedAt</th>
              <th className='text-center py-4 '>Action</th>


            </tr>
          </thead>
          <tbody>
            {dataProduct?.map((item, idx) => (
              <tr key={item._id} className='border-y'>
                <td className='text-center '>{idx + 1}</td>
                <td className='text-center '>{item.title}</td>
                <td className='text-center flex items-center justify-center  '>
                  {item.thumbnail.length > 0 && <img src={item.thumbnail} alt="image" className='w-[100px] h-[100px] object-contain' />}
                  {item.thumbnail.length < 1 && <img src={notImage} alt="image" className='w-[100px] h-[100px] object-contain' />}

                </td>
                <td className='text-center '>{item.price}</td>
                <td className='text-center '>{item.category?.title}</td>
                <td className='text-center '>{item.quantity}</td>
                <td className='text-center '>{item.sold}</td>
                {/* <td className='text-center '><div innerHTML = {item.description}></div></td> */}
                <td className='text-center '>{item.size}</td>

                <td className='text-center '>{moment(item.updatedAt).format('DD-MM-YYYY')}</td>
                <td className=''>
                  <div className='flex gap-2 items-center justify-center'>
                    <div onClick={() => { setUpdate(true), setEditProduct(item) }} className='flex justify-center items-center hover:text-white cursor-pointer hover:bg-green-500 p-[6px] rounded-full'>
                      <LuClipboardEdit />
                    </div>
                    <div onClick={() => { handleDeleteProduct(item._id, item.title) }} className='flex justify-center items-center hover:text-white cursor-pointer hover:bg-red-400 p-[6px] rounded-full'>
                      <BsFillTrashFill />
                    </div>
                  </div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {dataProduct?.length < 1 &&
          <div className="flex border-t py-4 w-full items-center justify-center flex-col border-b mt-3 pb-4 text-main">
            <PiShoppingCartThin size={60} />
            <span >Hiện chưa có sản phẩm</span>
          </div>}
        <div className='flex  items-end justify-end my-4'>
          {dataProduct?.length > 1 &&
            <Pagination totalPage={counts}
              setPage={setPage} />}
        </div>
      </div>
    </div>
  )
}

export default ManageProduct
