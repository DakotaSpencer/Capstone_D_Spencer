import React from 'react'
import '../ColorList/ColorList.css';
import {useState} from 'react'
import Color from '../Color/Color';

const BaseColor = (props) => {
    const [hexShown, setHexShown] = useState(true);
    console.log('singlecolor passed through props')
    console.log(props.singlecolor)
    return (
        <div>
            <h4>Base Color</h4>
            <div>Base Color Information should Go Here</div>
        </div>
    )
}

export default BaseColor