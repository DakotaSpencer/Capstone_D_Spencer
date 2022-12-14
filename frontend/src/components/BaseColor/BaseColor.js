import React from 'react'
import {useState} from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { SwapHoriz } from '@material-ui/icons';
import {
    Link,
} from "react-router-dom";

const BaseColor = (props) => {
    const [hexShown, setHexShown] = useState(true);


    if(props.singlecolor.hex){
        return (
            <div className='text-weight-thick flex-container color' style={{backgroundColor : `${props.singlecolor.hex.value}`, height:170, color: `${props.singlecolor.contrast.value}`} }>
                    
                    <Link to={`/color/${props.singlecolor.hex.clean}`} className='color-link' style={{color: `${props.singlecolor.contrast.value}`}}>
                        <h3 className='text-weight-thick p-0_3'>{props.singlecolor.name.value}</h3>
                    </Link>
                    
                    <div className='flex-row flex-item'>
                        {/* <button className='button box_shadow remove'><RefreshIcon fontSize='large'/></button> */}
                        <div className='clear-button'>{props.singlecolor.hex.value}</div>

                        <div className='clear-button remove'>
                            <CopyToClipboard text={`${props.singlecolor.hex.value}\n${props.singlecolor.rgb.value}\n${props.singlecolor.hsl.value}`}>
                                <ContentCopyIcon fontSize='large' className='center-item' />
                            </CopyToClipboard>
                        </div>

                        {/* <button className='button box_shadow remove' onClick={toggleColorPicker}><ColorizeIcon fontSize='large'/></button>

                        <div id="container" style={{visibility:displayMode}}>
                            <div id="infoi">
                                <ChromePicker
                                color={ state.background }
                                onChange={ handleChangeComplete }
                                className='overlayed'
                                />
                            </div>
                        </div> */}

                    </div>
                    <div className='clear-button' onClick={() => setHexShown(!hexShown)}>{hexShown? <div><SwapHoriz fontSize='large'/>{props.singlecolor.hsl.value}</div>: <div><SwapHoriz fontSize='large'/>{props.singlecolor.rgb.value}</div>}</div>
            </div>
        )
    }else{
        return(
            <div></div>
        )
    }
    
}

export default BaseColor