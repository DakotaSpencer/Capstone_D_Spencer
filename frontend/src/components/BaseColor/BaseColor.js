import React from 'react'
import '../ColorList/ColorList.css';
import {useState} from 'react'

const BaseColor = (props) => {
    const [hexShown, setHexShown] = useState(true);
    console.log('singlecolor passed through props')
    if(props.singlecolor.hex){
    console.log(props.singlecolor.hex.clean)
        return (
            <div className= {props.singlecolor.hsl.l >= 50 ? "text-dark text-weight-thick" : "text-light text-weight-thick"} style={{backgroundColor : `${props.singlecolor.hex.value}`, height:150} }>
                    <h3 className='text-weight-thick p-0_3'>{props.singlecolor.name.value}</h3>
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