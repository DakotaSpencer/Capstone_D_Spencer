import React from 'react'
import Color from '../Color/Color';
import '../Color/Color'
const ColorList = (props) => {
    return (
        <div className="center">
            {
            props.colordata.map((color)=>(
            <div key={color.hex.clean} className="col">
                <Color color={color}/>
            </div>
            ))
        }
        </div>
    )
}

export default ColorList