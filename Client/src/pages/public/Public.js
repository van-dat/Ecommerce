import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components";
import {Model} from '../../components/'
import { useSelector } from "react-redux";

const Public = () => {
  const {isHidden} = useSelector(state => state.app)
  return (
    <>
      <div className="relative flex flex-col ">
        <div className={`fixed  w-full z-20 bg-white`}>
          <Header />
        </div>
        <div className="bg-content">
          <Outlet />
        </div>
      </div>
     { isHidden && <Model />}
    </>
  );
};

export default Public;
