import React from 'react'
import FilterColor from '../FilterColor/FilterColor';
import '../FilterColor/FilterColor'

const FilterColorList = (props) => {
    return (
        <div className="center">
            {
            props.colordata.map((color)=>(
            <div key={color.hex.clean} className="col">
                <FilterColor color={color}/>
            </div>
            ))
        }
        </div>
    )
}

export default FilterColorList