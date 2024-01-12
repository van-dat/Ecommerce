import { useEffect, useState } from "react";
import React from "react";
import * as apis from "../apis/";
import { Product, Button, News } from "./";

const FeaturedProduct = ({ text, detail }) => {
  const [active, setActive] = useState(1);
  const [defaultData, setdefautData] = useState("Nike");
  const [dataProduct, setdataProduct] = useState([]);
  const taps = [
    {
      id: 1,
      name: "Giày Nike",
    },
    {
      id: 2,
      name: "Giày Adidas",
    },
    {
      id: 3,
      name: "MLB",
    },
    {
      id: 4,
      name: "VANS",
    },
    {
      id: 5,
      name: "CONVERSE",
    },
  ];
  const fetchDataProduct = async () => {
    const response = await Promise.all([apis.apiProducts({ sort: "-sole", title: defaultData, limit: 4 })]);
    if (response[0].success) setdataProduct(response[0].product);
  };

  useEffect(() => {
    fetchDataProduct();
  }, [defaultData]);
  return (
    <div className="flex py-8 flex-col text-[#333] gap-6 bg-white ">
      <div className="relative flex justify-center items-center w-full">
        <div className="flex relative">
          <div className="before:content-[''] w-[80px] h-[2px] bg-[#333] absolute top-1/2 left-[-110px]  "></div>
          <span className="font-semibold text-3xl ">{text}</span>
          <div className="after:content-[''] w-[80px] h-[2px] bg-[#333] absolute top-1/2 right-[-110px] "></div>
        </div>
      </div>
      <div className="flex justify-center items-center italic">
        <span>{`${detail || "Khuyến mãi cuối tuần"}`}</span>
      </div>
      {!detail && <div className="flex justify-center items-center gap-4 font-medium ">
        {taps.map((i) => (
          <span
            onClick={() => {
              setActive(i.id), setdefautData(i.name);
            }}
            className={`bg-white py-2 px-4  rounded-full border-2 ${
              active === i.id ? "border-2 border-btn font-bold" : ""
            }`}
            key={i.id}
          >
            {i.name}
          </span>
        ))}
      </div>}

      {!detail && <Product   data={dataProduct} />}
      {/* {!detail && ( 
        <div className="flex justify-center items-center">
          <Button
            text="Xem thêm các sản phẩm khác"
            css=" border-[1px] border-btn-100 bg-white py-2 px-4 font-semibold rounded-full hover:bg-btn hover:text-white  hover:border-btn"
          />
        </div>
      )} */}
      {detail && <News/>}
    </div>
  );
};

export default FeaturedProduct;
