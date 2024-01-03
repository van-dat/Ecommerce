import { Search, Login } from "./";
import logo from "../assets/img/GroupWhite.svg";
import { menu } from "../ultils/menu";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import * as apis from '../apis/'
import Path from "../ultils/path";
import { getCurrentUser } from '../store/action'

const Header = () => {
  const isActiveType = "rounded-xl font-bold  text-xl px-3 py-3 bg-btn text-white";
  const noActiveType = "rounded-xl font-bold  text-xl px-3 py-3  hover:text-white hover:bg-btn";
  const [dataCategory, setDataCategory] = useState(null);

  const {isLogin} = useSelector(state => state.auth)
  const Navigate = useNavigate();
  const dispatch = useDispatch()
  const fetchDataCategory = async () => {
    const response = await apis.apiCategory();
    if (response.status) setDataCategory(response.rs);
  };
  useEffect(() => {
    fetchDataCategory()
  }, []);



  return (
    <div className="border-b flex flex-col text-white bg-black">
      <div className="border-b">
        <div className="md:container md:mx-auto h-[40px] flex justify-between items-center px-4">
          <span className="">Hotline:</span>
          <div className="flex items-center gap-8">
            <Search />
            <Login />
          </div>
        </div>
      </div>
      <div className="">
        <div className="md:container md:mx-auto  h-header px-4 flex items-center justify-between">
          <div className="w-auto h-full flex justify-start items-center cursor-pointer">
            <img src={logo} alt="logo" className=" text-white w-[90px]  object-contain z-40 drop-shadow-md " onClick={() => Navigate('/')} />
          </div>
          {/* <div className="w-auto flex items-center gap-4 "> */}
          {dataCategory?.map((i) => (
            <NavLink key={i._id} to={i.slug} className={({ isActive }) => (isActive ? isActiveType : noActiveType)}>
              <span className="uppercase p-0 m-0">{i.title}</span>
            </NavLink>
          ))}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
