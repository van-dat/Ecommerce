import React, { memo } from 'react'
import RateBar from './RateBar'
import { showRating } from '../ultils/_helper'

const Rating = ({ rating, totalUserRating }) => {

  console.log(totalUserRating)
  console.log(rating)

  return (
    <div className='md:container md:mx-auto grid grid-cols-10 ' >
      <div className='col-span-4 border border-r-0 p-4 rounded-l-lg flex justify-center flex-col items-center gap-2' >
        <div className='font-bold text-xl'>
          {rating}/5
        </div>
        <div className='flex '>
          {showRating(rating)}
        </div>
        <span>{totalUserRating?.length > 0 ? `${totalUserRating?.length} đánh giá và nhận xét` : 'Không có đánh giá và nhận xét'}</span>
      </div>
      <div className='col-span-6 border flex flex-col gap-1 p-4 rounded-r-lg'>
        {Array.from(Array(5).keys()).reverse().map(el => (
          <RateBar key={el} number={el + 1} totalRating={totalUserRating?.length || 0} ratingCount={totalUserRating?.filter(item => item.star == el + 1).length||0} />
        ))}
      </div>

    </div>
  )
}

export default memo(Rating)
