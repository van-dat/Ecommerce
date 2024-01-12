import React, { useEffect } from 'react'
import { Card } from './components'
import Chart from '../admin/components/Chart/Chart'


const DashBoard = () => {



  return (
    <div className='flex flex-col gap-6'>
      <Card />
      <div className='md:container md:mx-auto'>
        <Chart />
      </div>
    </div>
  )
}

export default DashBoard
