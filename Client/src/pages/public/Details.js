import React, { useEffect, useState } from "react";
import { random } from "../../ultils/fn";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Product, NavBarLeft, BreadCrumb, Pagination } from "../../components";
import { getProduct } from "../../store/action";
import { fncut } from "../../ultils/fn";
import * as apis from "../../apis";

const Details = () => {
  const { banner, product } = useSelector((state) => state.app);
  const Dispatch = useDispatch();
  const { title } = useParams();
  const [Category, setCategory] = useState();
  const [page, setPage] = useState();
  const handleChangeOption = (e) => {
    let selectElement = document.getElementById("option").value;
    Dispatch(getProduct({ sort: selectElement, title: title, page: page }));
  };

  useEffect(() => {
    Dispatch(getProduct({ title: title, page: page }));
  }, [page]);


  return (
    <div className="flex flex-col bg-white mt-[165px] ">
      <div className="md:container mx-auto flex mt-2">
        <BreadCrumb />
      </div>
      <div className="md:container md:mx-auto flex mt-2 gap-6">
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1 ">
            <NavBarLeft />
          </div>
          <div className="col-span-3 ">
            <div className="flex flex-col col-span-2 ">
              {/* <h3 className="font-bold text-2xl px-2">{Category?.filter(e => e.slug === title).title}</h3> */}
              <div className="flex justify-end p-4 items-center gap-3 text-md font-normal">
                <span>
                  Hiển thị {product?.product?.length} trong {product.counts} Kết quả
                </span>
                <select
                  id="option"
                  defaultValue="-createdAt"
                  onChange={(e) => handleChangeOption(e)}
                  className="border-[1px] rounded-md border-[#bbb9b9] py-2 w-1/3  focus:outline-none text-md"
                >
                  <option selected value="-createdAt">
                    Mới nhất
                  </option>
                  <option value="price">Giá tăng dần</option>
                  <option value="-price">Giá giảm dần</option>
                  <option value="-sale">Sale</option>
                </select>
              </div>
            </div>

            <Product data={product?.product} css />
            <div className="flex justify-center w-full mt-6">
              <Pagination totalPage={product.counts}
                setPage={setPage} />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Details;
