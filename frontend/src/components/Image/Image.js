import React from 'react'

import { ColorExtractor } from 'react-color-extractor'


export const Image = props =>
  props.error ? (
    <div className="error-message">
      An error occurred while processing the image.
    </div>
  ) : (
    <div className="image-container">
      <ColorExtractor getColors={props.getColors} onError={props.onError}>
        <img src={props.image} alt={props.image.name}/>
      </ColorExtractor>
    </div>
  )