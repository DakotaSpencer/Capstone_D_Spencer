import React from 'react'
import {useState} from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import ColorizeIcon from '@mui/icons-material/Colorize';
import { ChromePicker } from 'react-color';

const BaseColor = (props) => {
    const [hexShown, setHexShown] = useState(true);
    const [displayShown, setDisplayShown] = useState(true);
    const [displayMode, setDisplayMode] = useState('hidden')
    const [state, setState] = useState({
        background: '#fff',
    })

    const toggleColorPicker = () => {
        if(displayShown === true){
        setDisplayMode('visible')
        
    }
    if(displayShown === false){
        setDisplayMode('hidden')
    }
    setDisplayShown(!displayShown)
    }

    const handleChangeComplete = (color) => {
    setState({ background: color.hex });
    var s = color.hex.toString();
    while(s.charAt(0) === '#')
    {
    s = s.substring(1);
    }
    console.log(s)
    };

    if(props.singlecolor.hex){
        return (
            <div className='text-weight-thick flex-container' style={{backgroundColor : `${props.singlecolor.hex.value}`, height:170, color: `${props.singlecolor.contrast.value}`} }>
                    <h3 className='text-weight-thick p-0_3'>{props.singlecolor.name.value}</h3>
                    <div className='flex-row flex-item'>
                        <button className='button'><RefreshIcon fontSize='large'/></button>
                        <div className='clear-button'>{props.singlecolor.hex.value}</div>
                        <div className='clear-button'>
                        <CopyToClipboard text={`${props.singlecolor.hex.value}\nR: ${props.singlecolor.rgb.r} G: ${props.singlecolor.rgb.g} B: ${props.singlecolor.rgb.b}\nH: ${props.singlecolor.hsl.h} S: ${props.singlecolor.hsl.s} L: ${props.singlecolor.hsl.l}`}>
                            <ContentCopyIcon fontSize='large' className='center-item' />
                        </CopyToClipboard>
                        </div>
                        <button className='button' onClick={toggleColorPicker}><ColorizeIcon fontSize='large'/></button>
                        <div id="container" style={{visibility:displayMode}}>
                            <div id="infoi">
                                <ChromePicker
                                color={ state.background }
                                onChangeComplete={ handleChangeComplete }
                                className='overlayed'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='clear-button' onClick={() => setHexShown(!hexShown)}>{hexShown? <div>H: {props.singlecolor.hsl.h} S: {props.singlecolor.hsl.s} L: {props.singlecolor.hsl.l}</div>: <div>R: {props.singlecolor.rgb.r} G: {props.singlecolor.rgb.g} B: {props.singlecolor.rgb.b}</div>}</div>
            </div>
        )
    }else{
        return(
            <div></div>
        )
    }
    
}

export default BaseColor