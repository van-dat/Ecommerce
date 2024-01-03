import React, { memo, useEffect, useState } from "react";
import { BoxNew } from "../components/";
import {useSelector} from "react-redux"

const News = () => {
const {blog} = useSelector(state => state.app)

 
  return (
    <div className="flex container md:mx-auto text-main ">
      <div className="w-2/3 pr-2 flex flex-col gap-4 group  ">
        <BoxNew data={blog[0]} />
      </div>
      <div className="w-1/3 pl-2">
        <div className="pr-2 flex flex-col gap-4 group  ">
          <BoxNew data={blog[1]} line="line-clamp-2" />
        </div>
        <div className="pr-2 flex flex-col gap-4 group  ">
          <BoxNew data={blog[2]} line="line-clamp-2" />
        </div>
      </div>
    </div>
  );
};

export default memo(News);
