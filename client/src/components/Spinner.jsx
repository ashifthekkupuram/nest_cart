import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

const override = {
    display: "block",
    margin: "0 auto",
};

const Spinner = ({ size = 32, color='#FFB200' }) => {
  return (
    <div className='flex items-center justify-center w-full my-1'>
        <ClipLoader color={color} size={size} override={override} />
    </div>
  )
}

export default Spinner
