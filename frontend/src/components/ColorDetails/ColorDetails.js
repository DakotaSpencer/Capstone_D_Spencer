import React from 'react'
import axios from 'axios'
import {useEffect, useState} from 'react'
import ColorPage from '../ColorPage/ColorPage';

const ColorDetails = (props) => {
    const [singlecolor, setSingleColor] = useState([]);

    useEffect(()=>{
        getBaseColor()
    },[])

    const getBaseColor = async () => {
        if (props.hex.toString().match(/([0-9a-fA-F]{3}){1,2}/)){
            const result = await axios.get(`https://www.thecolorapi.com/id?hex=${props.hex}`)
            setSingleColor(result.data)
        }else{
            const result = await axios.get(`https://www.thecolorapi.com/id?hex=123456`)
            setSingleColor(result.data)
        }
    }
    return (
        <div>
            <ColorPage singlecolor={singlecolor}/>
        </div>
    )
}

export default ColorDetails