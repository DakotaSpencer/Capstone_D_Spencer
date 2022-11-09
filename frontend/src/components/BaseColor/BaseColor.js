import React from 'react'
import {useState} from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const BaseColor = (props) => {
    const [hexShown, setHexShown] = useState(true);
    console.log('singlecolor passed through props')
    if(props.singlecolor.hex){
    console.log(props.singlecolor.hex.clean)
        return (
            <div className='text-weight-thick flex-container' style={{backgroundColor : `${props.singlecolor.hex.value}`, height:150, color: `${props.singlecolor.contrast.value}`} }>
                    <h3 className='text-weight-thick p-0_3'>{props.singlecolor.name.value}</h3>
                    <div className='flex-row flex-item'>
                        <div className='clear-button' onClick={() => setHexShown(!hexShown)}>{hexShown? <div>{props.singlecolor.hex.value}</div>: <div>R: {props.singlecolor.rgb.r} G: {props.singlecolor.rgb.g} B: {props.singlecolor.rgb.b}</div>}</div>
                        <div className='clear-button'>
                        <CopyToClipboard text={hexShown?props.singlecolor.hex.value:`R: ${props.singlecolor.rgb.r} G: ${props.singlecolor.rgb.g} B: ${props.singlecolor.rgb.b}`}>
                            <ContentCopyIcon fontSize='large' className='center-item' />
                        </CopyToClipboard>
                        </div>
                    </div>
                    
                    <div className='clear-button'>H: {props.singlecolor.hsl.h} S: {props.singlecolor.hsl.s} L: {props.singlecolor.hsl.l}</div>
            </div>
        )
    }else{
        return(
            <div></div>
        )
    }
    
}

export default BaseColor