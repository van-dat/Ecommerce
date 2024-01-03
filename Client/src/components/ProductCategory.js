import React, { memo } from "react";
import imgBanner from "../assets/img/banner-mid.png";
import { Product, Button } from "../components/";
import { useSelector } from "react-redux";
const ProductCategory = ({ name }) => {
  const { dataNike , dataAdidas, dataMlb } = useSelector((state) => state.app);
  const data = name == 'Giày Nike' ? dataNike : name == "Giày Adidas" ? dataAdidas : dataMlb 
  return (
    <>
      {data && data?.length > 0 && (
        <div className="flex flex-col py-8">
          <div className="relative py-6 ">
            <img src={imgBanner} alt="" className="w-full object-contain" />
            <div className="absolute top-[40%] right-[40%] text-white flex flex-col gap-3 items-center">
              <span className="font-bold text-3xl">{name}</span>
              <span className="italic">Sản phẩm mới nhất nổi bật nhất</span>
            </div>
          </div>
          <Product data={data} />
          <div className="flex justify-center items-center py-6">
            <Button
              text="Xem thêm các sản phẩm khác"
              css=" border-[1px] border-btn-100 bg-white py-2 px-4 font-semibold rounded-full hover:bg-btn hover:text-white  hover:border-btn"
              link={data[0]?.category?.slug}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default memo(ProductCategory);
