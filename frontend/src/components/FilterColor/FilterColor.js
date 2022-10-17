import React from 'react'
import '../ColorList/ColorList.css';
import {useState} from 'react'



const FilterColor = ({color}) => {
  const [hexShown, setHexShown] = useState(true);
  return (
    <div style={{backgroundColor : `${color.hex.value}`, height:250, zIndex:-1} }>
        <div className='text-center text-size-medium'>
            <h3 className='text-weight-thick p-2'></h3>
        </div>
    </div>
  )
}

export default FilterColor