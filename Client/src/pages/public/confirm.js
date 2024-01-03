import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import icons from '../../ultils/icon'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Path from '../../ultils/path'
import * as apis from '../../apis'


const {FaArrowLeftLong} = icons
const Confirm = () => {
  const {sendMail} = useSelector(state => state.auth)
  const navigate = useNavigate();

  useEffect(() => {
    const handle = () => {
      const OTPinputs = document.querySelectorAll('.inputOtp');
      const button = document.querySelector('#button');
      let currentFocusedIndex = 0;
    
      window.onload = () => {
        OTPinputs[currentFocusedIndex].focus();
      };
    
      OTPinputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
          const currentInput = e.target;
          const nextInput = currentInput.nextElementSibling;
    
          // Giữ lại chỉ số chỉ khi giá trị là số
          currentInput.value = currentInput.value.replace(/\D/g, '');
    
          if (nextInput !== null && !nextInput.hasAttribute('disabled') && currentInput.value !== '') {
            nextInput.removeAttribute('disabled');
            currentFocusedIndex = index + 1;
            OTPinputs[currentFocusedIndex].focus();
          }
    
          // Kiểm tra giá trị của input cuối cùng
          if (index === 3) {
            if (!button.hasAttribute('disabled') && OTPinputs[3].value !== '') {
              button.classList.add('active');
            } else {
              button.classList.remove('active');
            }
          }
        });
    
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Backspace' && input.value === '' && index > 0) {
            const previousInput = OTPinputs[index - 1];
            previousInput.removeAttribute('disabled');
            currentFocusedIndex = index - 1;
            OTPinputs[currentFocusedIndex].focus();
          }
        });
      });
    };
    
    // Gọi hàm handle để kích hoạt xử lý
    handle();
    
  }, []);

  const handleVerify = async() => {
    const otpInputs = document.querySelectorAll('.inputOtp');
    const enteredOTP = Array.from(otpInputs).map((input) => input.value).join('');



    if(enteredOTP) {
      if(enteredOTP?.length > 4) {
        if (enteredOTP) {
          const response = await apis.apiConfirm(enteredOTP)
          if(response.result){
            Swal.fire({ icon: 'success', title: 'Đăng ký thành công vui lòng đăng nhập !' }).then(() => {
            navigate(Path.LOGIN);
          });
          }else{
            toast.warning("Mã xác nhận không đúng vui lòng thử lại ??")
          }
           
        } else {
          Swal.fire({ icon: 'error', title: 'Verification failed!' });
        }
      }else {toast.warning("Bạn chưa nhập đủ mã xác nhận vui lòng nhập lại")}
      
    }else {
      toast.warning("vui lòng nhập mã xác nhận")
    }



    
  };

  return (
    <div className="h-screen w-screen bg-white flex justify-center items-center ">
      <div className="max-w-md w-[500px] mx-auto border  rounded shadow-md">
        <div className='flex justify-between p-4' >
          <span className='text-[#ee4d2d] cursor-pointer' onClick={()=>{navigate(`/${Path.LOGIN}`)}}>
            <FaArrowLeftLong  size={20}/>
          </span>
          <span className='text-lg font-semibold '>Nhập mã xác nhận</span>
          <div></div>
        </div>
        <div className='flex justify-center flex-col gap-1 mb-6'>
          <span className='text-center'>Mã xác thực sẽ được gửi qua Email đến  </span>
          <span className='text-center'>{sendMail}</span>

        </div>
        <form className="shadow-md px-4 py-6 ">
          <div className="flex justify-center gap-4 mb-6">
            {[1, 2, 3, 4, 5].map((index) => (
              <input
                key={index}
                id={`inputOtp${index}`}
                className="w-12 h-12 text-center border
                 outline-none
                 rounded-md shadow-sm focus:border-[#ee4d2d] focus:ring-teal-500 inputOtp"
                type="text"
                maxLength={1}
                pattern="[0-9]"
                inputMode="numeric"
                autoComplete="one-time-code"
                required=""
              />
            ))}
          </div>
          <div className='w-full h-[100px]'></div>
          <div className="flex items-center justify-center ">
            <button
            id='button'
              className="bg-[#ee4d2d] hover:opacity-75 w-full  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline active"
              type="button"
              onClick={handleVerify}
              
            >
              KẾ TIẾP
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default Confirm;
