import moment from 'moment'
import React, { useEffect } from 'react'
import * as apis from '../../apis'
import { useState } from 'react'
import { Pagination } from '../../components'
import icons from '../../ultils/icon'
import { Select } from 'react-dropdown-select'
import { optionsStatus } from '../../store/action'
import { toast } from 'react-toastify'
import { fnPrice } from '../../ultils/fn'

const { HiOutlinePencilSquare, IoCheckmarkCircle,BsPrinter } = icons

const ManageOrder = () => {
  const [dataOrder, setDataOrder] = useState(null);
  const [totalOrder, setTotalOrder] = useState(1);
  const [page, setPage] = useState(1);
  const [updateStatus, setUpdateStatus] = useState(null);

  const [selectOption, setSelectOption] = useState([]);

  const fetchData = async (params) => {


    const response = await apis.apiGetOders(params)
    
    if (response.success) {
      setDataOrder(response.Order)
      setTotalOrder(response.counts)
    }

  }

  const handleUpdateProduct = (item) => {
    setUpdateStatus(item)
    setSelectOption(() => optionsStatus?.filter(it => it.value == item.status))
  }


  useEffect(() => {
    fetchData({ page })
  }, [page]);

  const setValues = (option) => {
    setSelectOption(option)

  }

  const handleUpdate = async (oid) => {

    const response = await apis.apiUpdateOder({ status: selectOption[0].value }, oid)
    if (response.status) {
      toast.success('Thay đổi trạng thái thành công ')
      setUpdateStatus(null)
      fetchData({ page })
    }
  }

  const handlePrint = (item) => {


    const printWindow = window.open('', '_blank');
  
    printWindow.document.write('<html><head><title>Hóa đơn thanh toán</title></head><body>');
    printWindow.document.write('<div>'+item.products?.map(it => it.product.title)+'</div>');
    printWindow.document.write('<p>Giá: ' + item.products?.map(it => it.product.price) + '</p>');
    printWindow.document.write('<p>Phương thức thanh toán: ' + item.paymentIntent + '</p>');
    printWindow.document.write('<hr/>');
  

  
    printWindow.document.write('<hr/>');
    printWindow.document.write('<p>TOTAL: ' + fnPrice(item.total) + 'VND</p>');
    printWindow.document.write('</body></html>');
  
    printWindow.document.close();
    printWindow.print();
  }


  return (
    <div className='flex flex-col '>
      <div className='p-4 mb-4 flex justify-between items-center  text-2xl font-semibold bg-white rounded-md'>
        <h6 className=' m-0 text-2xl text-[#333] uppercase'>Manage Order</h6>
      </div>
      <div className='bg-white  rounded-md '>
        <table className="table-auto w-full border-t ">
          <thead>
            <tr >
              <th className='text-center py-4 '>STT</th>
              <th className='text-center py-4 '>Tên sản phẩm</th>
              <th className='text-center py-4 '>Tổng tiền</th>
              <th className='text-center py-4 '>Phương thức thanh toán</th>
              <th className='text-center py-4 '>Số lượng</th>
              <th className='text-center py-4 '>Status</th>
              <th className='text-center py-4 '>Ngày tạo</th>
              <th className='text-center py-4 '>action</th>
            </tr>
          </thead>
          <tbody>
            {dataOrder?.map((item, idx) => (
              <tr key={item._id} className='border-y'>
                <td className='text-center  h-10 min-h-10'>{idx + 1}</td>
                <td className=' justify-center items-center flex flex-col  h-10 min-h-10'>{item.products?.map(item => (
                  <span key={item}>{item.product.title}</span>
                ))}
                </td>
                <td className='text-center  h-10 min-h-10'>
                  {item.total}
                </td>
                <td className='text-center  h-10 min-h-10'>{item.paymentIntent}</td>
                <td className='text-center  h-10 min-h-10'>{fnPrice(item.products?.map(item => item.quantity)?.reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0))}
                    </td>
                <td className='text-center  h-10 min-h-10 '>{
                  updateStatus?._id == item._id ? <Select options={optionsStatus} values={selectOption} labelField="label" valueField="value" onChange={(values) => setValues(values)} /> : <span className={`py-1 px-2 rounded-md text-white font-semibold text-sm  ${item.status === 'Pending' ? 'bg-blue-500' : item.status === 'Processing' ? 'bg-yellow-400' : item.status === 'Success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {item.status}
                  </span>
                }</td>

                <td className='text-center  h-10 min-h-10'>{moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                <td className=''>
                  <div className='flex gap-2 items-center justify-center'>
                    {updateStatus?._id == item._id ?
                      <div onClick={() => { handleUpdate(item._id) }} className='flex justify-center items-center hover:text-white cursor-pointer hover:bg-green-500 p-[6px] rounded-full'>
                        <IoCheckmarkCircle />
                      </div> :
                      <div onClick={() => { handleUpdateProduct(item) }} className='flex justify-center items-center hover:text-white cursor-pointer hover:bg-red-400 p-[6px] rounded-full'>
                        <HiOutlinePencilSquare />
                      </div>}
                     
                        <div onClick={() => { handlePrint(item) }} className='flex justify-center items-center hover:text-white cursor-pointer hover:bg-red-400 p-[6px] rounded-full'>
                        <BsPrinter />
                      </div>
                     
                  </div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex  items-end justify-end my-4'>
          {dataOrder?.length > 1 &&
            <Pagination totalPage={totalOrder}
              setPage={setPage} />}
        </div>
      </div>
    </div>
  )
}

export default ManageOrder
