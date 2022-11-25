import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const renderSwatches = (type, colors) => {
  const [linkColor, setLinkColor] = useState('')

  return colors.map((color, id) => {
    const normalizeColorValue =
      Array.isArray(color) && type === 'rgb'
        ? `rgb(${color[0]}, ${color[1]}, ${color[2]})`
        : color

    return (
      <div key={id++} >
        <div
          className="swatches"
          style={{
            backgroundColor: normalizeColorValue,
            color: normalizeColorValue
          }}
        />
        <div className="center-content hex-codes"><Link to={`/color/${normalizeColorValue.substring(1)}`}>{color}</Link></div>
      </div>
    )
  })
}

export const Swatches = props => (
  <div className="display-swatches" style={{ marginTop: 20 }}>
    {renderSwatches('hex', props.colors)}
  </div>
)