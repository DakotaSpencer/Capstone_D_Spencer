import React from 'react'
import Color from './Color';
import './ColorList.css'
const ColorList = (props) => {
    return (
        <div className="row center m-2">
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