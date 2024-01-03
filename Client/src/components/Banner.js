import React, { memo, useEffect, useState } from "react";
import Slider from "react-slick";
import { useSelector } from "react-redux";

const Banner = () => {
  const dataBanner = useSelector((state) => state.app);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    mobileFirst: true,
    arrows: true,
  };
  return (
    <div className=" w-full overflow-hidden laptop:h-[500px] mt-[185px]">
      <Slider {...settings}>
        {dataBanner?.banner?.map((i, index) => (
          <div key={index} className="overflow-hidden" >
            <img src={i} alt="slider" className="laptop:h-[500px] h-full   w-full  " />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default memo(Banner);
