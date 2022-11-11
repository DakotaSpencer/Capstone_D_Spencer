import React, { useEffect, useState } from 'react'

import {
  useParams
} from "react-router-dom";

const Color = () => {
    let { hex } = useParams();
    const [hexCode, setHexCode] = useState('')

    useEffect(() => {
        setHexCode('#' + hex)
    },[])

  return (
    <div className='pages'>
      <h3>Hex: {hex}</h3>
      <div>
        {hexCode}
      </div>
    </div>
  )
}

export default Color