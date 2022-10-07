import React from 'react'
import './ColorList.css';
import {useEffect, useState} from 'react'



const Color = ({color}) => {
  const [hexShown, setHexShown] = useState(true);
  return (
    <div className= {color.hsl.l > 50 ? "text-dark text-weight-thick" : "text-light text-weight-thick"} style={{backgroundColor : `${color.hex.value}`, height:400} }>
        <div className='text-center text-size-medium'>
            <div>{color.name.value}</div>
            {hexShown? color.hex.value: color.hex.clean}
        </div>
    </div>
  )
}

export default Color