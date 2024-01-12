import React from 'react'
import { RotatingLines } from 'react-loader-spinner'
const Loading = () => {
    return (
        <RotatingLines
            visible={true}
            height="40"
            width="40"
            color="white"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />

    )
}

export default Loading
