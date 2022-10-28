import React from 'react'
import '../ColorList/ColorList.css';


const FilterColor = ({color}) => {
  return (
    <div style={{backgroundColor : `${color.hex.value}`, height:250, zIndex:-1} }>
    </div>
  )
}

export default FilterColor