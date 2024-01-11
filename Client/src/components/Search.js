import { useState } from "react";
import icons from "../ultils/icon";

import { useDispatch, useSelector } from "react-redux";
import { search, showModelSearch } from "../store/Slice/appSlice";
import { fnPrice } from "../ultils/fn";

const { IoCloseOutline, BiSearch, PiShoppingCartThin } = icons;

const Search = ({ data, placeholder }) => {

  const { product } = useSelector(state => state.app)

  const dispatch = useDispatch()

  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [detailSearch, setDetailSearch] = useState(false);
  const [dataSearch, setDataSearch] = useState([]);


  const handleSearch = () => {
    if (data) {
      const results = data?.filter(item =>
        item?.email?.toLowerCase().includes(searchValue.toLowerCase())
      );
      dispatch(search(results))
      setSearchValue('')

    } else {
      const rs = product?.product?.filter(item =>
        item?.title?.toLowerCase().includes(searchValue.toLowerCase())
      );
      setDataSearch(rs)
      dispatch(showModelSearch(false))
      setSearchValue('')
    }
  };


  const setSearchTerm = (e) => {
    setSearchValue(e)
    if (!data && e.length >= 4) {
      setDetailSearch(true)
      dispatch(showModelSearch(true))
      const rs = product?.product?.filter(item =>
        item?.title?.toLowerCase().includes(searchValue.toLowerCase())
      );
      setDataSearch(rs)
    }
    if (!data && e.length <= 3) {
      setDetailSearch(false)
      dispatch(showModelSearch(false))
    }
  }

  return (
    <div className="">
      <div className=" bg-white border  border-main rounded-[20px] items-center max-w-[500px] flex h-8 text-[#363636] font-medium relative">
        <div className="absolute right-3 cursor-pointer hidden">
          <IoCloseOutline size={20} />
        </div>
        <button onClick={handleSearch} className="px-2 outline-none">
          <BiSearch size={24} />
        </button>
        <div className="w-full h-full flex ">
          <input
            className="!outline-none border-none bg-transparent w-[90%] !focus:!outline-0 focus:!shadow-none focus:!border-0 text-sm text-ellipsis"
            type="text"
            placeholder={placeholder ? placeholder : 'Tìm kiếm sản phẩm'}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {!data && detailSearch && <div className="absolute  inset-x-0 top-10 h-[450px]  max-h-[450px] w-full   bg-white shadow-md rounded-md p-4">

          <div className="max-h-[400px] overflow-y-auto">
            <div className="flex justify-center items-center font-semibold">KẾT QUẢ TÌM KIẾM</div>
            <div className="flex justify-between items-center">
              <span>Sản phẩm</span>
              <span>có {dataSearch.length} sản phẩm</span>
            </div>
            {dataSearch?.map((i, index) => (
              <div key={index} className="  w-full flex items-center border-t py-2 gap-2  group">

                <div className="flex w-full gap-3">
                  <img src={i?.thumbnail[0]} alt="image" className="object-contain w-[80px]" />

                  <div className='block w-full'>
                    <div className="flex  flex-col text-sm  flex-2">
                      <span className="font-semibold capitalize">
                        {i.title}
                      </span>
                      <div className='flex justify-between w-full flex-1'>
                        <div className='flex flex-col'>
                          <span>Giá : <span className='text-main-100 font-semibold' >{fnPrice(i?.price)}₫</span></span>
                        </div>


                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        }

      </div>

    </div >
  );
};

export default Search;
