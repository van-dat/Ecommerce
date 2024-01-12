import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components";
import { Model } from '../../components/'
import { useSelector, useDispatch } from "react-redux";
import Footer from "./Footer";
import { showModelSearch } from "../../store/Slice/appSlice";

const Public = () => {
  const { isHidden, showModel } = useSelector(state => state.app)

  const dispatch = useDispatch()

  const handleScroll = (e) => {
    console.log(e.target.scrollTop)
  
  }

  return (
    <>
      <div  className="relative flex flex-col ">
        <div className={`fixed  w-full z-20 bg-white`}>
          <Header />
        </div>
        {showModel && <div className="absolute inset-0 bg-black opacity-50 z-10"></div>}
        <div  onScroll={handleScroll} onClick={() => dispatch(showModelSearch(false))} className="bg-content overflow-y-scroll">
          <Outlet />
        </div>
        <div className="bg-black">
          <Footer />
        </div>
      </div>
      {isHidden && <Model />}
    </>
  );
};

export default Public;
