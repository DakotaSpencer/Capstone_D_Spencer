import React, {useState} from 'react'
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
import Dropdown from 'react-bootstrap/Dropdown';
import {useCallback} from 'react'
import DownloadOutlined from '@mui/icons-material/Download';

const ColorPage = (props) => {
    const [blindnessMode, setBlindnessMode] = useState('no filter');
    var blinder = require('color-blind');

    const handleBlindnessSelect=(e)=>{
        setBlindnessMode(e)
        console.log(blindnessMode)
    }
    const handleCaptureClick = useCallback(async () => {
        var slides = document.getElementsByClassName("remove");
      
        console.log(slides)
        
        for (var i = 0; i < slides.length; i++) {
          console.log(slides.item(i));
          slides.item(i).style.visibility="hidden"
        }
        const canvas = await html2canvas(document.getElementById('color-canvas'));
        for (var n = 0; n < slides.length; n++) {
          console.log(slides.item(i));
          slides.item(n).style.visibility="visible"
        }
        const dataURL = canvas.toDataURL('image/png');
        downloadjs(dataURL, 'download.png', 'image/png');
    }, []);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    if(props.singlecolor.hex){
        return (
            <div className='center'>
                <div className='text-weight-thick flex-container p-2 m-2 box_shadow'>
                    <div className='text-weight-thick flex-container p-2 m-2' id='color-canvas' style={{backgroundColor : `${blindnessMode!=='no filter'? blinder[blindnessMode](props.singlecolor.hex.value):props.singlecolor.hex.value}`, width:500, height:'fit-content' , color: `${props.singlecolor.contrast.value}`} }>
                        <div className='text-size-medium p-2 m-2' style={{fontFamily:'Montserrat', fontSize:'48px'}}>{props.singlecolor.name.value}</div>
                        <div className='text-size-medium p-2 m-2'>HEX: {props.singlecolor.hex.value}</div>
                        <div className='text-size-medium p-2 m-2'>HSL: {props.singlecolor.hsl.value}</div>
                        <div className='text-size-medium p-2 m-2'>HSV: {props.singlecolor.hsv.value}</div>
                        <div className='text-size-medium p-2 m-2'>RGB: {props.singlecolor.rgb.value}</div>
                        <div className='text-size-medium p-2 m-2'>CMYK: {props.singlecolor.cmyk.value}</div>
                        <div className='text-size-medium p-2 m-2 flex-row'>Contrast: <div style={{backgroundColor : `${props.singlecolor.contrast.value}`, width:100, height:20, margin:'10px'}} className='center'></div></div>
                        <div className='remove'>
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
                        
                    </div>
                <div className='center button text-size-medium m-2 p-2' onClick={handleCaptureClick}>
                    <DownloadOutlined /><div className='m-1'>Download</div>
                </div>
                </div>
            </div>
        )
    }else{
        return(
            <div></div>
        )
    }
}

export default ColorPage