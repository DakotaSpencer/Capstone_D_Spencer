import React from 'react'
import '../ColorList/ColorList.css';
import {useState,useEffect} from 'react'
import {LockOpenOutlined, Lock, SwapHoriz } from '@material-ui/icons';



const Color = ({color}) => {
  const [hexShown, setHexShown] = useState(true);
  const [locked, setLocked] = useState(false);
  const [viewex, setViewHex] = useState(false);

  return (
    <div className= {color.hsl.l >= 50 ? "text-dark text-weight-thick" : "text-light text-weight-thick"} style={{backgroundColor : `${color.hex.value}`, height:250} }>
        <div className='text-center text-size-medium'>
            <h3 className='text-weight-thick p-0_3'>{color.name.value}</h3>
            <div className='clear-button' onClick={() => setHexShown(!hexShown)}>{hexShown? <div><SwapHoriz fontSize='large'/>{color.hex.value}</div>: <div><SwapHoriz fontSize='large'/>R: {color.rgb.r} G: {color.rgb.g} B: {color.rgb.b}</div>}</div>
            <div className='clear-button'>H: {color.hsl.h} S: {color.hsl.s} L: {color.hsl.l}</div>
        </div>
        <div className='clear-button' onClick={() => setLocked(!locked)}>{locked? <Lock fontSize='large'/>: <LockOpenOutlined fontSize='large'/>}</div>
    </div>
  )
}

export default Color