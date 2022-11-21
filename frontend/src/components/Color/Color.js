import React from 'react'
import {useState} from 'react'
import {LockOpenOutlined, Lock, SwapHoriz } from '@material-ui/icons';
import Dropdown from 'react-bootstrap/Dropdown';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import BrushIcon from '@mui/icons-material/Brush';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {
  Link,
} from "react-router-dom";

const Color = ({color}) => {
  const [hexShown, setHexShown] = useState(true);
  const [locked, setLocked] = useState(false);
  const [blendingMode, setBlendingMode] = useState('normal');
  const [blindnessMode, setBlindnessMode] = useState('no filter');
  var blinder = require('color-blind');
  
  const handleSelect=(e)=>{
    setBlendingMode(e)
    console.log(blendingMode)
  }

  const handleBlindnessSelect=(e)=>{
    setBlindnessMode(e)
    console.log(blindnessMode)
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

  return (
    //array of locked colors, 
    //filled with empty objects, 
    //and store that specific colors object into the array at whatever point it is in the api. (0,1, 2, etc), 
    //and then when a random palette is generated, replace whichever one it is when the locked one
    //create array of empty objects
    //fill array with color that is locked.
    //replace specific color at index with color at same index in array
    <div style={{backgroundColor:'#555'}}>
      <div className='text-weight-thick flex-container' style={{backgroundColor : `${blindnessMode!=='no filter'? blinder[blindnessMode](color.hex.value):color.hex.value}`, height:455, color: `${color.contrast.value}`} }>
          <Link to={`/color/${color.hex.clean}`} className='color-link' style={{color: `${color.contrast.value}`}}>
            <h2 className='text-weight-thick p-2 m-2 flex-item'>{color.name.value}</h2>
          </Link>
          
          <div className='clear-button text-size-small' onClick={() => setHexShown(!hexShown)}>{hexShown? <div><SwapHoriz fontSize='large'/>{color.hex.value}</div>: <div><SwapHoriz fontSize='large'/>{color.rgb.value}</div>}</div>
          
          <div className='center text-size-medium hsl'>{color.hsl.value}</div>

          <div className='clear-button'>
            <CopyToClipboard text={`${color.hex.value}\n${color.rgb.value}\n${color.hsl.value}`} className='flex-item remove'>
              <ContentCopyIcon fontSize='large' className='center-item' />
            </CopyToClipboard>
          </div>

          <div className='clear-button flex-item remove' onClick={() => setLocked(!locked)}>{locked? <Lock fontSize='large'/>: <LockOpenOutlined fontSize='large'/>}</div>
          <div style={{color: `${color.contrast.value}`}} className='flex-row text-size-large text-weight-thick remove'>
            <RemoveRedEyeIcon className='m-2' fontSize='large'/>
            <Dropdown onSelect={handleBlindnessSelect} title={blindnessMode} drop='end'>
                <Dropdown.Toggle variant="light" id="dropdown-basic" title={blindnessMode} style={{fontSize:'20px'}}>
                  {capitalizeFirstLetter(blindnessMode)}
                </Dropdown.Toggle>
                <Dropdown.Menu id="dropdown-menu-align-right" title={blindnessMode}>
                    <Dropdown.Item eventKey="no filter">No Filter</Dropdown.Item>
                    <Dropdown.Divider />
                    <div className='center'>Anomalous</div>
                    <div className='center'>Trichromat</div>
                    <Dropdown.Item eventKey="protanomaly">Protanomaly</Dropdown.Item>
                    <Dropdown.Item eventKey="deuteranomaly">Deuteranomaly</Dropdown.Item>
                    <Dropdown.Item eventKey="tritanomaly">Tritanomaly</Dropdown.Item>
                    <Dropdown.Divider />
                    <div className='center'>Dichromat</div>
                    <Dropdown.Item eventKey="protanopia">Protanopia</Dropdown.Item>
                    <Dropdown.Item eventKey="deuteranopia">Deuteranopia</Dropdown.Item>
                    <Dropdown.Item eventKey="tritanopia">Tritanopia</Dropdown.Item>
                    <Dropdown.Divider />
                    <div className='center'>Monochromat</div>
                    <Dropdown.Item eventKey="achromatomaly">Achromatomaly</Dropdown.Item>
                    <Dropdown.Item eventKey="achromatopsia">Achromatopsia</Dropdown.Item>
                  </Dropdown.Menu>
            </Dropdown>
          </div>
          <div style={{color: `${color.contrast.value}`}} className='flex-row text-size-large text-weight-thick remove'>
            <BrushIcon className='m-2 center' fontSize='large'/>
            <Dropdown onSelect={handleSelect} title={blendingMode} drop='end'>
              <Dropdown.Toggle variant="light" id="dropdown-basic" title={blendingMode} style={{fontSize:'20px'}}>
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
            
          
      </div>
      <div style={{backgroundColor:'#323232'}}>
        <div style={{mixBlendMode:`${blendingMode}`}}>
          <div style={{backgroundColor : `${color.hex.value}`, height:100, width:'100%'} }></div>
        </div>
      </div>
    </div>
  )
}

export default Color