import React from "react";
import { useSelector } from "react-redux";
import { BoxNew } from "../../components";

const News = () => {
  const { blog } = useSelector((state) => state.app);

  return (
    <div className="md:container mx-auto flex flex-col mt-[165px]">
      <div className="h-[60px]"></div>
      <span className="text-5xl font-bold py-4">Tin Tức</span>
      <div>
        {blog?.map((i) => (
          <div key={i._id} className=" py-3">
            <BoxNew data={i} active />
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
