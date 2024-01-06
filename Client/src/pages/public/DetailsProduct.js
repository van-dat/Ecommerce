import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, memo } from "react";
import { BreadCrumb, Product, Rating, SelectDetail } from "../../components";
import imageLogo from '../../assets/img/icon_logo.svg'
import icons from "../../ultils/icon";
import { getOneProduct, optionRating } from "../../store/action";
import * as apis from '../../apis'
import { toast } from "react-toastify";



const { IoIosCloseCircleOutline, AiFillStar } = icons
const DetailsProduct = () => {

  const dispatch = useDispatch()
  const { oneProduct, recommend } = useSelector((state) => state.product);
  const [Hidden, setHidden] = useState(0);
  const [ShowBtn, setShowBtn] = useState(false);
  const [comment, setComment] = useState('');
  const [checkStar, setCheckStar] = useState(null);

  console.log(recommend)
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



  const handleRating = () => {
    setShowBtn(true)
  }

  const handleChoseStar = (e) => {
    setCheckStar(e)
  }
  const handleEvaluation = async () => {

    if (!checkStar) return toast.warning('Vui chọn chất lượng của sản phẩm')
    const response = await apis.apiCreateRating({ star: checkStar, comment: comment, pid: oneProduct._id })
    if (response.status) {
      setComment('')
      setCheckStar(null)
      setShowBtn(false)
      dispatch(getOneProduct(oneProduct._id))
      toast.success('Đánh giá sản phẩm thành công')
    }
  }


  return (
    <>
      {oneProduct && (
        <div className="bg-content">
          <div className="md:container md:mx-auto mt-[165px] pb-[50px]  ">
            <BreadCrumb />
            <div className="grid grid-cols-6 gap-4 ">
              <div className=" col-span-2 items-center bg-white shadow-md  max-h-[570px] p-4 ">
                <Slider {...settings}>
                  {oneProduct?.thumbnail?.map((i, index) => (
                    <div key={index} className="flex items-center focus:outline-none">
                      <img
                        src={i}
                        alt="slider"
                        className="w-full  focus:outline-none object-contain"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="flex col-span-4 max-h-[570px] shadow-md">
                <SelectDetail isShow />
              </div>
            </div>
            {/* <div className="inline-flex px-3 py-1 border-[1px] ">
            <span>Sản phẩm yêu thích</span>
            <span className="hidden">Đã thêm vào yêu thích</span>
          </div> */}
            <div className="flex flex-col mt-4 bg-white shadow-md mb-4">
              <div className="flex font-semibold text-md items-center bg-content  w-full  ">
                <div
                  onClick={() => setHidden(0)}
                  className={`py-2 text-center border px-4 cursor-pointer rounded-sm ${Hidden === 0
                    ? "border-t-2 border-t-red-800 border-b-0 border-r-0 bg-white "
                    : " "
                    }`}
                >
                  Mô tả
                </div>
                <div
                  onClick={() => setHidden(1)}
                  className={`py-2 text-center border px-4 cursor-pointer  border-r-0 rounded-sm ${Hidden === 1 ? "border-t-2 border-t-red-800 border-b-0 border-x-0 bg-white" : "border"
                    }`}
                >
                  Chính sách thanh toán
                </div>

                <div
                  onClick={() => setHidden(2)}
                  className={`py-2 text-center border px-4 cursor-pointer border-r-0 rounded-sm ${Hidden === 2 ? "border-t-2 border-t-red-800 border-r-0 border-b-0 bg-white " : ""
                    }`}
                >
                  Chính sách đổi trả
                </div>
                <div
                  onClick={() => setHidden(3)}
                  className={`py-2 text-center border px-4  cursor-pointer rounded-sm ${Hidden === 3 ? "border-t-2 border-t-red-800 border-b-0 border-l-0 bg-white " : ""
                    }`}
                >
                  Đánh giá
                </div>
              </div>

              <div className="w-full ">
                {Hidden === 0 && (
                  <div className="flex p-4 shadow-md text-sm font-bold flex-col gap-4">
                    <span className=" text-md font-bold  ">{oneProduct.title}</span>
                    <span>description</span>
                    <span>
                      Thương Hiệu : <span className="font-medium">{oneProduct.category.title}</span>
                    </span>
                    <span>
                      Mã sản phẩm : <span className="font-medium">{oneProduct.category.title}</span>
                    </span>
                    <span>
                      Chất liệu : <span className="font-medium">Da cao cấp</span>
                    </span>
                    <span>
                      Tình trạng : <span className="font-medium">Hàng Fullbox - New 100%</span>
                    </span>
                    <span>Cam kết chính hãng 100%</span>
                    <span>
                      Lưu ý :
                      <span className="font-medium">
                        Đối với các sản phẩm hết hàng sẵn hoặc hết size bạn cần, Quý khách có thể
                        liên hệ với Shoes Store để sử dụng dịch vụ ORDER sản phẩm của chúng tôi.
                      </span>
                    </span>
                  </div>
                )}

                {Hidden === 1 && (
                  <div className="flex p-4 shadow-md text-sm  font-bold flex-col gap-4 ">
                    <span>1.Giới thiệu </span>
                    <span className="font-medium">
                      Chào mừng quý khách hàng đến với website của Shoes Store
                    </span>
                    <span className="font-medium">
                      Khi quý khách hàng truy cập vào trang website của chúng tôi có nghĩa là quý
                      khách đồng ý với các điều khoản này. Trang web có quyền thay đổi, chỉnh sửa,
                      thêm hoặc lược bỏ bất kỳ phần nào trong Điều khoản mua bán hàng hóa này, vào
                      bất cứ lúc nào. Các thay đổi có hiệu lực ngay khi được đăng trên trang web mà
                      không cần thông báo trước. Và khi quý khách tiếp tục sử dụng trang web, sau
                      khi các thay đổi về Điều khoản này được đăng tải, có nghĩa là quý khách chấp
                      nhận với những thay đổi đó.
                    </span>
                    <span className="font-medium">
                      Quý khách hàng vui lòng kiểm tra thường xuyên để cập nhật những thay đổi của
                      chúng tôi.
                    </span>
                    <span>2.Hướng dẫn sử dụng website</span>
                    <span className="font-medium">
                      Khi vào web của chúng tôi, khách hàng phải đảm bảo đủ 18 tuổi, hoặc truy cập
                      dưới sự giám sát của cha mẹ hay người giám hộ hợp pháp. Khách hàng đảm bảo có
                      đầy đủ hành vi dân sự để thực hiện các giao dịch mua bán hàng hóa theo quy
                      định hiện hành của pháp luật Việt Nam.
                    </span>
                    <span className="font-medium">
                      Trong suốt quá trình đăng ký, quý khách đồng ý nhận email quảng cáo từ
                      website. Nếu không muốn tiếp tục nhận mail, quý khách có thể từ chối bằng cách
                      nhấp vào đường link ở dưới cùng trong mọi email quảng cáo.
                    </span>

                    <span>3. Thanh toán an toàn và tiện lợi</span>
                    <span className="font-medium">
                      Người mua có thể tham khảo các phương thức thanh toán sau đây và lựa chọn áp
                      dụng phương thức phù hợp:
                    </span>
                    <span>
                      Cách 1:{" "}
                      <span className="font-medium">
                        Thanh toán trực tiếp (người mua nhận hàng tại địa chỉ cửa hàng)
                      </span>
                    </span>
                    <span>
                      Cách 2:{" "}
                      <span className="font-medium">
                        Thanh toán sau (COD – giao hàng và thu tiền tận nơi)
                      </span>
                    </span>
                    <span>
                      Cách 3:{" "}
                      <span className="font-medium">Thanh toán online qua chuyển khoản</span>
                    </span>
                  </div>
                )}
                {Hidden === 2 &&
                  <div className="flex p-4 shadow-md text-sm font-medium flex-col gap-4 ">
                    <span className="font-bold">
                      Shoes Store luôn trân trọng sự tín nhiệm của quý khách giành cho chúng tôi.
                      Chính vì vậy, chúng tôi luôn cố gắng để mang đến quý khách hàng những sản phẩm
                      chất lượng cao và tiết kiệm chi phí.
                    </span>
                    <span>
                      Thay cho cam kết về chất lượng sản phẩm, Shoes Store thực hiện chính sách đổi
                      trả hàng hóa. Theo đó, tất cả các sản phẩm được mua tại Shoes Store đều có thể
                      đổi size và mẫu trong vòng 07 ngày sau khi nhận hàng.
                    </span>
                    <span>
                      {" "}
                      Để được thực hiện đổi hàng hoá, Quý khách cần giữ lại Hóa đơn mua hàng tại
                      Shoes Store. Sản phẩm được đổi là những sản phẩm đáp ứng được những điều kiện
                      trong Chính sách đổi trả hàng hóa.
                    </span>
                    <span className="font-bold">
                      Shoes Store thực hiện đổi hàng/trả lại tiền cho Quý khách, nhưng không hoàn
                      lại phí vận chuyển hoặc lệ phí giao hàng, trừ những trường hợp sau:
                    </span>
                    <li>Không đúng chủng loại, mẫu mã như quý khách đặt hàng.</li>
                    <li>
                      Tình trạng bên ngoài bị ảnh hưởng như bong tróc, bể vỡ xảy ra trong quá trình
                      vận chuyển,…
                    </li>
                    <li>
                      Không đạt chất lượng như: phát hiện hàng fake, hàng kém chất lượng, không phải
                      hàng chính hãng
                    </li>

                    <span>
                      Quý khách vui lòng kiểm tra hàng hóa và ký nhận tình trạng với nhân viên giao
                      hàng ngay khi nhận được hàng. Khi phát hiện một trong các trường hợp trên, quý
                      khách có thể trao đổi trực tiếp với nhân viên giao hàng hoặc phản hồi cho
                      chúng tôi trong vòng 24h theo số Hotline : 084. 850. 6666
                    </span>
                    <span className="font-bold">
                      Shoes Store sẽ không chấp nhận đổi/trả hàng khi:
                    </span>
                    <li>Hàng hoá là hàng order</li>
                    <li>Thời điểm thông báo đổi trả quá 07 ngày kể từ khi Quý khách nhận hàng</li>
                    <li>
                      Quý khách tự làm ảnh hưởng tình trạng bên ngoài như rách bao bì, bong tróc, bể
                      vỡ, bị bẩn, hư hại (không còn như nguyên vẹn ban đầu),...
                    </li>
                    <li>Quý khách vận hành không đúng chỉ dẫn gây hỏng hóc hàng hóa.</li>
                    <li>
                      Quý khách đã kiểm tra và ký nhận tình trạng hàng hóa nhưng không có phản hồi
                      trong vòng 24h kể từ lúc ký nhận hàng.
                    </li>
                    <li>Không còn size/ mẫu mà khách hàng muốn đổi.</li>
                    <li>Không đổi từ hàng hóa có sẵn sang hàng phải order.</li>
                    <li>Sản phẩm đã cắt tag/mác.</li>
                    <li>Sản phẩm đã qua sử dụng.</li>
                    <span className="font-bold ">
                      Shoes Store thực hiện đổi trả theo quy trình sau:
                    </span>
                    <span className="font-bold  ">
                      Bước 1:
                      <span className="font-medium no-underline ">
                        Quý khách liên hệ trực tiếp với Shoes Store qua số Hotline : 084. 850. 9999
                        để thông báo tình trạng hàng hoá cần đổi/trả trong vòng 07 ngày kể từ khi
                        nhận hàng.
                      </span>
                    </span>
                    <span className="font-bold ">
                      Bước 2:
                      <span className="font-medium">
                        Nhân viên Shoes Store sẽ tiếp nhận phản hồi và hướng dẫn bạn cung cấp thông
                        tin đơn hàng để chúng tôi truy soát.
                      </span>
                    </span>
                    <span className="font-bold ">
                      Bước 3:{" "}
                      <span className="font-medium">
                        {" "}
                        Quý khách ship hàng cần đổi/ trả kèm hoá đơn lại về địa chỉ của Shoes Store
                        để chúng tôi kiểm tra.{" "}
                      </span>
                    </span>
                    <span className="font-bold ">
                      Bước 4:{" "}
                      <span className="font-medium">
                        {" "}
                        Sau khi kiểm tra hàng và xác nhận đủ sản phẩm đủ điều kiện đổi/trả, Shoes
                        Store sẽ liên hệ lại xác nhận với bạn và gửi hàng về cho bạn theo địa chỉ
                        bạn cung cấp.
                      </span>
                    </span>
                    <span className="italic">
                      Lưu ý: Quý khách sẽ phải chịu phí ship 2 chiều khi đổi/trả. Chỉ hỗ trợ đổi sản
                      phẩm một lần duy nhất.
                    </span>
                  </div>
                }
                {Hidden === 3 &&
                  <div className="flex p-4 shadow-md  text-sm font-medium flex-col gap-4 ">
                    {!ShowBtn && <Rating rating={oneProduct?.totalRating} totalUserRating={oneProduct?.rating} />}
                    {ShowBtn &&
                      <div className="flex w-full justify-center items-center">
                        <div className="flex p-4 border w-1/2 flex-col rounded-md text-sm  font-medium ">
                          <div className="flex justify-end w-full">
                            <span onClick={() => setShowBtn(false)} className="hover:text-white hover:bg-red-500 p-1 rounded-full cursor-pointer"><IoIosCloseCircleOutline size={23} /></span>
                          </div>
                          <div className="flex justify-center w-full items-center mb-4">
                            <img src={imageLogo} alt=" logo" className="h-[100px] w-[100px] object-contain" />
                          </div>
                          <div className="w-full">
                            <textarea class="w-full border-[#ddd] h-[100px] min-h-[50px] text-sm" value={comment} onChange={(e) => { setComment(e.target.value) }} placeholder="Xin mời chia sẻ một số cẩm nhận về sản phẩm" id="floatingTextarea2"></textarea>
                          </div>
                          <div className="flex flex-col gap-4 justify-center items-center">
                            <span>Nhận xét về sản phẩm của chúng tôi</span>
                            <div className="flex gap-4 justify-center items-center">
                              {optionRating?.map(item => (
                                <div key={item} onClick={() => handleChoseStar(item.code)} className="flex gap-1 cursor-pointer">
                                  <span className={checkStar == item.code ? 'text-orange-400' : 'text-gray-500'}>
                                    <AiFillStar size={18} />
                                  </span>
                                  <span className="hidden lg:flex">{item.value}</span>
                                </div>
                              ))}
                            </div>
                            <div className="w-full">
                              <button onClick={() => handleEvaluation()} type="button" className="btn w-full rounded-md text-white text-md font-semibold  py-1 px-4 bg-red-500 ">Gửi đánh giá</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                    {!ShowBtn &&
                      <div className="flex md:container md:mx-auto justify-center items-center flex-col gap-2">
                        <span>Bạn đánh giá gì về sản phẩm này</span>
                        <button type="button" onClick={() => handleRating()} className="btn py-2 px-4 rounded-md text-md text-white font-medium bg-red-500"> Đánh giá ngay</button>
                      </div>
                    }
                  </div>
                }
              </div>
            </div>
            <div className="bg-white p-4 mb-2">
              <div className='border-l-4 uppercase border-l-black  text-xl font-bold p-2  mb-2 '>
                SẢN PHẨM LIÊN QUAN
              </div>
              <div><Product data={recommend} css  /></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(DetailsProduct);
