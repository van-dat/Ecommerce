import React, { memo } from "react";
import { date, year } from "../ultils/fn";

const BoxNew = ({ data, line, active }) => {
  return (
    <>
      {data && (
        <div className={`flex  gap-4 group text-main ${!active ? "flex-col" : "py-6 border-[1px] border-dashed"}`}>
          <div className={`relative ${active ? "w-1/3" : ""} `}>
            <img src={data?.Image} alt="" className="object-contain w-full" />
            {!active && (
              <div className="absolute bottom-[-30px] h-[60px] w-[80px]  left-0 bg-main flex flex-col items-center justify-center text-white font-medium">
                <span>{date(data?.createdAt)}</span>
                <span>{year(data?.createdAt)}</span>
              </div>
            )}
          </div>
          <div className={`flex flex-col ${active ? "w-2/3 gap-2" : ""}`}>
            <span className={`text-xl font-bold  group-hover:text-main-200 ${active ? "" : "pt-4 "}`}>
              {data?.title}
            </span>
                
            {active && <span>{date(data?.createdAt)}-{year(data?.createdAt)} | <span className="text-main-200">Tin tức chung</span></span> }
            <span className={` text-md gap-0  ${line ? line : "line-clamp-5"}`}>{data?.description}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(BoxNew);
