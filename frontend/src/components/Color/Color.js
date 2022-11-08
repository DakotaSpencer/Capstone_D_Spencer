import React from 'react'
import {useState} from 'react'
import {LockOpenOutlined, Lock, SwapHoriz } from '@material-ui/icons';
import Dropdown from 'react-bootstrap/Dropdown';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


const Color = ({color}) => {
  const [hexShown, setHexShown] = useState(true);
  const [locked, setLocked] = useState(false);
  const [blendingMode, setBlendingMode] = useState('normal');
  
  const handleSelect=(e)=>{
    console.log(e);
    setBlendingMode(e)
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    //like have an array of locked colors, 
    //filled with empty objects, 
    //and store that specific colors object into the array at whatever point it is in the api. (0,1, 2, etc), 
    //and then when a random palette is generated, replace whichever one it is when the locked one

    //create array of empty objects
    //fill array with color that is locked.
    //replace specific color at index with color at same index in array
    <div>
      <div className='text-weight-thick' style={{backgroundColor : `${color.hex.value}`, height:350, color: `${color.contrast.value}`} }>
          <div className='text-center text-size-medium'>
              <h3 className='text-weight-thick p-0_3'>{color.name.value}</h3>
              <div className='clear-button' onClick={() => setHexShown(!hexShown)}>{hexShown? <div>
                <SwapHoriz fontSize='large'/>{color.hex.value}</div>: <div><SwapHoriz fontSize='large'/>R: {color.rgb.r} G: {color.rgb.g} B: {color.rgb.b}</div>}</div>
              <div className='clear-button'>H: {color.hsl.h} S: {color.hsl.s} L: {color.hsl.l}</div>
          </div>
          <CopyToClipboard text={hexShown?color.hex.value:`R: ${color.rgb.r} G: ${color.rgb.g} B: ${color.rgb.b}`}>
            <ContentCopyIcon fontSize='large'/>
          </CopyToClipboard>
          <div style={{color: `${color.contrast.value}`}}>
            <Dropdown onSelect={handleSelect} title={blendingMode} drop='end'>
              <Dropdown.Toggle variant="none" id="dropdown-basic" title={blendingMode} style={{fontSize:'18px', color: `${color.contrast.value}`}}>
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
    </div>
  )
}

export default Color