import React, { memo, useEffect, useState } from "react";
import icons from "../ultils/icon";
import { NavLink, useParams } from "react-router-dom";
import { menu } from "../ultils/menu";
import { fnPercent, fnPrice, fncut } from "../ultils/fn";
import { getProduct } from "../store/action";
import * as apis from "../apis";
import { useDispatch, useSelector } from "react-redux";




const maxCost = 10000000;
const { HiMinus, HiMiniPlus } = icons;
const active = "flex items-center gap-3 px-4 text-main-300 py-1 ";
const noActive = "flex items-center gap-3 px-4  py-1 hover:text-main-300 ";



const NavBarLeft = () => {
  const {title} = useParams()

  const { category } = useSelector(state => state.app)
  const Dispatch = useDispatch();
  const [isHidden, setisHidden] = useState(true);
  const [isHiddenSize, setisHiddenSize] = useState(true);

  const [percent1, setPercent1] = useState(0);
  const [percent2, setPercent2] = useState(maxCost);
  const [Size, setSize] = useState();
  const [selectedValues, setSelectedValues] = useState([]);

  const fetchDataSize = async () => {
    const response = await apis.apiSize();
    if (response.success) setSize(response.rs);
  };

  useEffect(() => {
    const activeTrack = document.getElementById("track-active");
    let minTrack = percent1 < percent2 ? fnPercent(percent1) : fnPercent(percent2);
    activeTrack.style.left = `${minTrack}%`;
    let maxTrack = percent1 > percent2 ? 100 - fnPercent(percent1) : 100 - fnPercent(percent2);
    activeTrack.style.right = `${maxTrack}%`;
  }, [percent1, percent2]);

  useEffect(() => {
    const costMin = +percent1 < +percent2 ? percent1 : percent2;
    const costMax = +percent1 < +percent2 ? percent2 : percent1;
    Dispatch(getProduct({ title: title, "price[lte]": costMax, "price[gt]": costMin }));
  }, [percent1, percent2, title]);


  
  useEffect(() => {
    fetchDataSize();
    Dispatch(getProduct({ title: title }));
  }, []);


  const handleChangeSize = (e, value) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      // Nếu checkbox được chọn, thêm giá trị vào mảng
      setSelectedValues([...selectedValues, value]);
    } else {
      // Nếu checkbox bị bỏ chọn, loại bỏ giá trị khỏi mảng
      setSelectedValues(selectedValues.filter((val) => val !== value));
    }
  }

  return (
    <div className="flex cursor-pointer flex-col font-bold text-lg text-white">
      <div
        className="flex items-center justify-around bg-main py-2 w-full "
        onClick={() => setisHidden((prev) => !prev)}
      >
        <span>DANH MỤC SẢN PHẨM</span>
        {isHidden ? (
          <span>
            <HiMiniPlus size={24} />
          </span>
        ) : (
          <span>
            <HiMinus size={24} />
          </span>
        )}
      </div>


      {isHidden && (
        <div className="flex flex-col text-main font-medium bg-header  ">
          {category.map((i) => (
            <NavLink to={`/${i.slug}`} className={({ isActive }) => (isActive ? active : noActive)} key={i._id}>
              {({ isActive }) => (
                <>
                  <div
                    className={`before:content-[''] w-[15px] h-[15px] rounded-sm relative border-[1px]   ${isActive ? "border-main-300" : "border-main"
                      }`}
                  >
                    {isActive ? (
                      <div className="before:content-['\2713'] absolute text-xs right-[2px] text-main-200"></div>
                    ) : null}
                  </div>

                  <p className="capitalize">{i.title}</p>
                </>
              )}
            </NavLink>
          ))}
        </div>
      )}

      {/* max-min price */}
      <div className=" flex flex-col text-black gap-4 py-4 ">
        <span className="">GIÁ</span>
        <div className="flex flex-col relative w-full items-center justify-center ">
          <div className=" h-[10px] w-full bg-[#ddd]  absolute top-0 bottom-0"></div>
          <div
            id="track-active"
            className="slider-track-active h-[10px] right-0  bg-main  absolute top-0 bottom-0"
          ></div>
          <input
            type="range"
            step={100}
            min={0}
            max={maxCost}
            value={percent1}
            onChange={(e) => setPercent1(e.target.value)}
            className=" w-full appearance-none pointer-events-none absolute top-0 bottom-0"
          />
          <input
            type="range"
            step={10}
            min={0}
            max={maxCost}
            value={percent2}
            onChange={(e) => setPercent2(e.target.value)}
            className=" w-full appearance-none pointer-events-none absolute top-0 bottom-0"
          />
        </div>
        <div className="px-1 flex  items-center text-[#7a7c98] text-xs font-medium">
          <span id="costMin">{`${+percent1 > +percent2 ? fnPrice(percent2) : fnPrice(percent1)}đ`}</span>
          <span>-</span>
          <span id="constMax">{`${+percent2 < +percent1 ? fnPrice(percent1) : fnPrice(percent2)}đ`}</span>
        </div>
      </div>
      {/* size */}
      <div className="flex  flex-col">
        <div
          className="flex items-center justify-between px-3  bg-main py-2 w-full "
          onClick={() => setisHiddenSize((prev) => !prev)}
        >
          <span>KÍCH THƯỚC</span>
          {isHiddenSize ? (
            <span>
              <HiMiniPlus size={24} />
            </span>
          ) : (
            <span>
              <HiMinus size={24} />
            </span>
          )}
        </div>
        {isHiddenSize && (
          <div className=" px-4  h-[200px] overflow-y-auto">
            {Size?.map((i, index) => (
              <div key={index} className=" py-1 gap-3 flex   items-center group">
                <input onChange={(e) => handleChangeSize(e, i._id)}
                  type="checkbox"
                  value={i._id}
                  id={i.size}
                  className="checkbox2  h-[15px] w-[15px] outline-none focus:text-main-300 border-none  "
                />
                <label htmlFor={i.size}>
                  <span className="text-main cursor-pointer text-lg font-medium active:text-main-200 group-hover:text-main-300 group-hover:border-btn-main-200 ">
                    {i.size}
                  </span>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default memo(NavBarLeft);
