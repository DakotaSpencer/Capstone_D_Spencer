import React from 'react'
import './ColorList.css';

const Color = ({color}) => {
  return (
    <div style={{backgroundColor : `${color.hex.value}`, height:400} }>
        <div className='text-center text-size-medium'>
            {color.hex.value}
        </div>
    </div>
  )
}

export default Color