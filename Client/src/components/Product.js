import { memo, useState } from "react";
import { fnPrice } from "../ultils/fn";
import icons from "../ultils/icon";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Show } from "../store/Slice/appSlice";
import { getOneProduct, getSize } from "../store/action";
import { review } from '../store/Slice/productSlice'

const { HiOutlineEye } = icons;

const Product = ({ data, css }) => {
  const Dispatch = useDispatch();
  const navigate = useNavigate();


  const handleClickNext = (pid, title, slug) => {
    navigate(`/${title}/${slug}`),
      Dispatch(getOneProduct(pid)),
      Dispatch(getSize())
    Dispatch(review(pid))
  }

  const handleClickModel = (pid) => {
    Dispatch(Show());
    Dispatch(getOneProduct(pid));
    Dispatch(getSize())
  };
  return (
    <>
      {data && data?.length > 0 &&

        <div
        className={` grid w-full flex-wrap gap-4 grid-cols-4 ${!css ? 'md:container md:mx-auto' : ''}`}
        >
          {data?.map((i, index) => (
            <div
              key={index}
              className={
                css
                  ? "w-full flex relative flex-wrap group shadow-md hover:shadow-md"
                  : " w-full flex shadow-md relative  flex-wrap group"
              }
            >
              <div className="  w-full ">
                <div className="w-full overflow-hidden">
                  <img
                    src={i?.thumbnail}
                    alt="thumbnail"
                    className="w-full object-center  hover:scale-110 ease-in-out duration-2000  cursor-pointer"
                    onClick={() => handleClickNext(i._id, i.category.slug, i.slug)}
                  />
                </div>
                <div className="flex flex-col z-40 gap-3 capitalize font-medium cursor-default">
                  <span className="text-sm  px-2 line-clamp-2">{i?.title}</span>
                  <span className="text-sm px-2">{fnPrice(i?.price)} ₫</span>
                </div>
                <div
                  onClick={() => handleClickModel(i._id)}
                  className="h-[40px] cursor-pointer  bg-main absolute top-[62%] left-0 right-0  justify-center items-center text-white gap-2 hidden  animate-slide-top  group-hover:flex"
                >
                  <HiOutlineEye size={24} />
                  <span className="uppercase text-md font-semibold ">Xem nhanh</span>
                </div>
              </div>
            </div>
          ))}

        </div>

      }
    </>)
};

export default memo(Product);
