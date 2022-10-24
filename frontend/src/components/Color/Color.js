import React from 'react'
import '../ColorList/ColorList.css';
import {useState,useEffect} from 'react'
import {LockOpenOutlined, Lock, SwapHoriz } from '@material-ui/icons';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';



const Color = ({color}) => {
  const [hexShown, setHexShown] = useState(true);
  const [locked, setLocked] = useState(false);
  const [viewHex, setViewHex] = useState(false);
  const [blendingMode, setBlendingMode] = useState('normal');

  const mixBlendingMode = {
    mixBlendMode: blendingMode
  }
  const handleSelect=(e)=>{
    console.log(e);
    setBlendingMode(e)
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className= {color.hsl.l >= 50 ? "text-dark text-weight-thick" : "text-light text-weight-thick"} style={{backgroundColor : `${color.hex.value}`, height:350} }>
        <div className='text-center text-size-medium'>
            <h3 className='text-weight-thick p-0_3'>{color.name.value}</h3>
            <div className='clear-button' onClick={() => setHexShown(!hexShown)}>{hexShown? <div><SwapHoriz fontSize='large'/>{color.hex.value}</div>: <div><SwapHoriz fontSize='large'/>R: {color.rgb.r} G: {color.rgb.g} B: {color.rgb.b}</div>}</div>
            <div className='clear-button'>H: {color.hsl.h} S: {color.hsl.s} L: {color.hsl.l}</div>
        </div>
        <div className={color.hsl.l >= 50 ? "text-dark text-weight-thick clear-button" : "text-light text-weight-thick clear-button"}>
          <Dropdown onSelect={handleSelect} title={blendingMode}>
            <Dropdown.Toggle variant="none" id="dropdown-basic" title={blendingMode} style={{fontSize:'18px'}} className={color.hsl.l >= 50 ? "text-dark text-weight-thick clear-button" : "text-light text-weight-thick clear-button"}>
              {capitalizeFirstLetter(blendingMode)}
            </Dropdown.Toggle>
            <Dropdown.Menu id="dropdown-menu-align-right" title={blendingMode}>
                <Dropdown.Item eventKey="pass-through">Pass Through</Dropdown.Item>
                <Dropdown.Item eventKey="normal">Normal</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="darken">Darken</Dropdown.Item>
                <Dropdown.Item eventKey="multiply">Multiply</Dropdown.Item>
                <Dropdown.Item eventKey="color-burn">Color Burn</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="lighten">Lighten</Dropdown.Item>
                <Dropdown.Item eventKey="screen">Screen</Dropdown.Item>
                <Dropdown.Item eventKey="color-dodge">Color Dodge</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="overlay">Overlay</Dropdown.Item>
                <Dropdown.Item eventKey="soft-light">Soft Light</Dropdown.Item>
                <Dropdown.Item eventKey="hard-light">Hard Light</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="difference">Difference</Dropdown.Item>
                <Dropdown.Item eventKey="exclusion">Exclusion</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="hue">Hue</Dropdown.Item>
                <Dropdown.Item eventKey="saturation">Saturation</Dropdown.Item>
                <Dropdown.Item eventKey="color">Color</Dropdown.Item>
                <Dropdown.Item eventKey="luminosity">Luminosity</Dropdown.Item>
              </Dropdown.Menu>
        </Dropdown>
        </div>
        
        <div style={{backgroundColor:'#323232'}}>
          <div style={{mixBlendMode:`${blendingMode}`}}>
            <div style={{backgroundColor : `${color.hex.value}`, height:50} }></div>
          </div>
        </div>
        <div className='clear-button' onClick={() => setLocked(!locked)}>{locked? <Lock fontSize='large'/>: <LockOpenOutlined fontSize='large'/>}</div>
    </div>
  )
}

export default Color