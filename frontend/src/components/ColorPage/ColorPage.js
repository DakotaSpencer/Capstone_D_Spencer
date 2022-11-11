import React from 'react'
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
import {useCallback} from 'react'
import DownloadOutlined from '@mui/icons-material/Download';

const ColorPage = (props) => {
    const handleCaptureClick = useCallback(async () => {
        const canvas = await html2canvas(document.getElementById('color-canvas'));
        const dataURL = canvas.toDataURL('image/png');
        downloadjs(dataURL, 'download.png', 'image/png');
    }, []);

    if(props.singlecolor.hex){
        return (
            <div className='center'>
                <div className='text-weight-thick flex-container p-2 m-2 box_shadow'>
                    <div className='text-weight-thick flex-container p-2 m-2' id='color-canvas' style={{backgroundColor : `${props.singlecolor.hex.value}`, width:500, height:'fit-content' , color: `${props.singlecolor.contrast.value}`} }>
                        <div className='text-size-medium p-2 m-2' style={{fontFamily:'Montserrat', fontWeight:200, fontSize:'48px'}}>{props.singlecolor.name.value}</div>
                        <div className='text-size-medium p-2 m-2'>HEX: {props.singlecolor.hex.value}</div>
                        <div className='text-size-medium p-2 m-2'>HSL: {props.singlecolor.hsl.value}</div>
                        <div className='text-size-medium p-2 m-2'>HSV: {props.singlecolor.hsv.value}</div>
                        <div className='text-size-medium p-2 m-2'>RGB: {props.singlecolor.rgb.value}</div>
                        <div className='text-size-medium p-2 m-2'>CMYK: {props.singlecolor.cmyk.value}</div>
                        <div className='text-size-medium p-2 m-2 flex-row'>Contrast: <div style={{backgroundColor : `${props.singlecolor.contrast.value}`, width:100, height:20, margin:'10px'}} className='center'></div></div>
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