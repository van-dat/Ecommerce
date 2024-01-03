import { useNavigate } from "react-router-dom";
import {Button} from './'
import Path from "../ultils/path";
import adidas from "../assets/img/nike.jpg";
import nike from "../assets/img/nike2.jpg";
import phukien from "../assets/img/phukien.jpg";
import { memo } from "react";

const BannerCategory = () => {
  const navigate = useNavigate();
  return (
    <div className="md:container md:mx-auto py-10 laptop:flex gap-8">
      <div className="w-full flex  relative justify-center">
        <img src={adidas} alt="img" className="object-contain rounded-2xl cursor-pointer" onClick={()=>navigate(Path.ADIDAS)} />
        <div  className="absolute bottom-8  flex  ">
            <Button
            text = 'Giày Adidas'
            link = {Path.ADIDAS}
            css = 'bg-white py-2 px-4 font-semibold rounded-lg shadow-md hover:bg-btn hover:text-white'
            />
        </div>
      </div>
      <div className="w-full flex flex-col gap-5 pt-5  laptop:pt-0" >
        <div className="flex h-1/2 relative justify-center">
          <img src={nike} alt="img" className="object-contain rounded-2xl cursor-pointer" onClick={()=>navigate(Path.NIKE)} />
          <div  className="absolute bottom-8  flex  ">
            <Button
            text = 'Giày Nike'
            css = 'bg-white py-2 px-4 font-semibold rounded-lg shadow-md hover:bg-btn hover:text-white'
            link = {Path.NIKE}
            />
        </div>
        </div>
        
        <div className="flex h-1/2 relative justify-center">
          <img src={phukien} alt="img" className="object-contain rounded-2xl cursor-pointer" 
          onClick={()=>navigate(Path.PHUKIEN)}
          />
          <div  className="absolute bottom-8 flex ">
            <Button
            text = 'Phụ Kiện'
            css = 'bg-white py-2 px-4 font-semibold rounded-lg shadow-md hover:bg-btn hover:text-white'
            link = {Path.PHUKIEN}
            />
        </div>
        </div>
      </div>
    </div>
  );
};

export default memo(BannerCategory);
