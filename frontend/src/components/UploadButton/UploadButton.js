import React from 'react'
import { PhotoOutlined} from '@material-ui/icons';

export const FileInput = props => (

  
  

  <div style={{ marginTop: 20 }}>
    <div className='share-options'>
      <label htmlFor="file" className='share-option'>
        <PhotoOutlined className='share-icon'/>
        <span className='share-option-text' id="file-upload">Upload Photo</span>
        <input
          style={{ display: "none" }}
          type="file"
          id="uploader"
          accept="image/*"
          onChange={props.uploadFiles}
        />
      </label>
    </div>
  </div>
)