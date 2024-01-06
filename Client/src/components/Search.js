import { useState } from "react";
import icons from "../ultils/icon";

import { useDispatch, useSelector } from "react-redux";
import { search } from "../store/Slice/appSlice";

const { IoCloseOutline, BiSearch } = icons;

const Search = ({ data }) => {

  const { product } = useSelector(state => state.app)

  
  const dispatch = useDispatch()

  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  const handleSearch = () => {
    const results = data?.filter(item =>
      item?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    dispatch(search(results))
  };


  const setSearchTerm = (e) => {
    setSearchValue(e)
  }
  console.log(searchValue)

  return (
    <div>
      <div className=" bg-white border border-main rounded-[20px] items-center flex h-8 text-[#363636] font-medium relative">
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
            placeholder="Tìm kiếm sản phẩm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
