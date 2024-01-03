import { useSelector, useDispatch } from "react-redux";
import { noShow } from "../store/Slice/appSlice";
import { Modal } from "react-responsive-modal";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import SelectDetail from "./SelectDetail";

const overlay = "bg-model";
const modal = "drop-shadow-none w-full max-w-4xl";

const Model = () => {
  const { isHidden, size } = useSelector((state) => state.app);
  const {oneProduct} = useSelector(state=>state.product)
  
  const Dispatch = useDispatch();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 2500,
    mobileFirst: true,
    arrows: false,
  };
  return (
    <div>
      {oneProduct && (
        <div>
          <Modal
            open={isHidden}
            onClose={() => Dispatch(noShow())}
            center
            classNames={{
              overlay,
              modal,
              root,
            }}
          >
            <div className="flex gap-2">
              <div className=" flex-1 h-max-[500px] w-1/2 items-center ">
                <Slider {...settings}>
                  {oneProduct?.image?.map((i, index) => (
                    <div key={index} className="flex items-center h-[430px] focus:outline-none">
                      <img src={i} alt="slider" className="w-full focus:outline-none object-contain" />
                    </div>
                  ))}
                </Slider>
              </div>
              <SelectDetail/>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Model;
