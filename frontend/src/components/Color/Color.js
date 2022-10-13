import React from 'react'
import '../ColorList/ColorList.css';
import {useState} from 'react'



const Color = ({color}) => {
  const [hexShown, setHexShown] = useState(true);
  return (
    <div className= {color.hsl.l > 50 ? "text-dark text-weight-thick" : "text-light text-weight-thick"} style={{backgroundColor : `${color.hex.value}`, height:550} }>
        <div className='text-center text-size-medium'>
            <div>{color.name.value}</div>
            {hexShown? color.hex.value: color.hex.clean}
            <div>R: {color.rgb.r} G: {color.rgb.g} B: {color.rgb.b}</div>
            <div>H: {color.hsl.h} S: {color.hsl.s} L: {color.hsl.l}</div>
        </div>
    </div>
  )
}

export default Color