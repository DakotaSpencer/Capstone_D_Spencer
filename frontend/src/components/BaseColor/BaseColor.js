import React from 'react'
import '../ColorList/ColorList.css';
import {useState,useEffect} from 'react'
import {LockOpenOutlined, Lock } from '@material-ui/icons';

const BaseColor = (props) => {
    const [hexShown, setHexShown] = useState(true);
    const [locked, setLocked] = useState(false);
    console.log('singlecolor passed through props')
    if(props.singlecolor.hex){
    console.log(props.singlecolor.hex.clean)
        return (
            <div className= {props.singlecolor.hsl.l >= 50 ? "text-dark text-weight-thick" : "text-light text-weight-thick"} style={{backgroundColor : `${props.singlecolor.hex.value}`, height:150} }>
                    <h5 className='text-weight-thick p-0_3'>{props.singlecolor.name.value}</h5>
                    <div className='clear-button' onClick={() => setHexShown(!hexShown)}>{hexShown? <div>{props.singlecolor.hex.value}</div>: <div>R: {props.singlecolor.rgb.r} G: {props.singlecolor.rgb.g} B: {props.singlecolor.rgb.b}</div>}</div>
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