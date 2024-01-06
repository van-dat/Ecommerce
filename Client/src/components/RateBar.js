import React, { memo, useRef, useEffect } from 'react'
import icons from '../ultils/icon'



const { AiFillStar } = icons
const RateBar = ({ number, ratingCount, totalRating }) => {

    console.log(ratingCount)
    console.log(totalRating)


    const ratePercent = useRef()

    useEffect(() => {
        if (ratingCount == 0 && totalRating == 0) {
            ratePercent.current.style.right = `100%`;
        } else {
            ratePercent.current.style.right = `${+100 - Math.round((ratingCount * 100) / totalRating)}%`;

        }
    }, [ratingCount, totalRating]);
    return (
        <div className=' text-[#333] items-center justify-center grid grid-cols-10 gap-4  '>
            <div className='flex items-center justify-end gap-2 col-span-1'>
                <label className='w-1 flex items-center justify-center' htmlFor="star">{number}</label>
                <AiFillStar color='orange' />
            </div>
            <div className='w-full col-span-7'>
                <div className='relative h-[6px] bg-gray-300 rounded-lg w-full'>
                    <div ref={ratePercent} className='absolute rounded-l-lg inset-0 bg-red-500   '></div>
                </div>
            </div>
            <div className='text-xs col-span-2'>{ratingCount} Đánh giá</div>
        </div>
    )
}

export default memo(RateBar)
