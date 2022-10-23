import axios from 'axios'
import React from 'react';
import {useEffect, useState, useCallback} from 'react'
import ColorList from '../ColorList/ColorList';
import '../ColorList/ColorList.css'
import DownloadOutlined from '@mui/icons-material/Download';
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
import BaseColor from '../BaseColor/BaseColor';
import FilterColorList from '../FilterColorList/FilterColorList';

const PaletteGenerator = () => {
    const [hexCode, setHexCode] = useState(Math.floor(Math.random()*16777215).toString(16).toUpperCase());
    const [generationMode, setGenerationMode] = useState('analogic');
    const [blendingMode, setBlendingMode] = useState('');
    const [colorCount, setColorCount] = useState('');
    const [colordata, setColorData] = useState([]);
    const [singlecolor, setSingleColor] = useState([]);
    
    useEffect(() => {
      getData()
      getBaseColor()
    },[])
  
    const mixBlendingMode = {
      mixBlendMode: blendingMode
    }

    const getBaseColor = async () => {
      //https://www.thecolorapi.com/id?format=json&named=false&hex=${hexCode}
      const result = await axios.get(`https://www.thecolorapi.com/id?hex=${hexCode}`)
      setSingleColor(result.data)
    }
    

    const getData = async () => {
      //https://www.thecolorapi.com/scheme?hex=${this.hexcolor}&mode=${this.selectedMode}&count=${this.numOfColors}
      const results = await axios.get(`https://www.thecolorapi.com/scheme?hex=${hexCode}&mode=${generationMode}&count=${colorCount}`)
      setColorData(results.data.colors)
    }
  
    const handleSearch = (e) => {
      e.preventDefault();
      console.log('User Submitted My Form!');
      getData();
      getBaseColor();
    }

    const handleCaptureClick = useCallback(async () => {
      const canvas = await html2canvas(document.getElementById('color-canvas'));
      const dataURL = canvas.toDataURL('image/png');
      downloadjs(dataURL, 'download.png', 'image/png');
    }, []);
  
    return (
      <div className="align-center">
        <div>
          <h1>Palette Generator</h1>
          <form className="searchForm align-center" onSubmit={handleSearch}>

            <div>
              <label className='m-1 text-size-medium text-weight-thick'>Base Color</label>
              <input type='text' value={hexCode} placeholder=''
                onChange={e => setHexCode(e.target.value)}/>


              <label className='m-1 text-size-medium text-weight-thick'>Count</label>
              <input type='number' value={colorCount} placeholder='5'
                onChange={e => e.target.value > 10 ? setColorCount(10) : setColorCount(e.target.value)}/>
              
              
              <label className='m-1 text-size-medium text-weight-thick'>Generation Mode</label>
              <select id="modeSelect" value={generationMode} onChange={e => setGenerationMode(e.target.value)}>
                <option value="analogic">analogic</option>
                <option value="analogic-complement">analogic-complement</option>
                <option value="complement">complement</option>
                <option value="monochrome">monochrome</option>
                <option value="monochrome-dark">monochrome-dark</option>
                <option value="monochrome-light">monochrome-light</option>
                <option value="triad">triad</option>
                <option value="quad">quad</option>
              </select>

              <label className='m-1 text-size-medium text-weight-thick'>Blending Mode</label>
              <select id="modeSelect" value={blendingMode} onChange={e => setBlendingMode(e.target.value)}>
                <option value="normal">normal</option>
                <option value="multiply">multiply</option>
                <option value="screen">screen</option>
                <option value="overlay">overlay</option>
                <option value="darken">darken</option>
                <option value="lighten">lighten</option>
                <option value="color-dodge">color-dodge</option>
                <option value="color-burn">color-burn</option>
                <option value="hard-light">hard-light</option>
                <option value="soft-light">soft-light</option>
                <option value="difference">difference</option>
                <option value="exclusion">exclusion</option>
                <option value="hue">hue</option>
                <option value="saturation">saturation</option>
                <option value="color">color</option>
                <option value="luminosity">luminosity</option>
              </select>
              <input type='submit' value='Generate' className='button'/>
            </div>
            
            
          </form>
          <div>
            <div id="color-canvas">
              <BaseColor singlecolor={singlecolor}/>
              <ColorList colordata={colordata} singlecolor={singlecolor}/>
              <div style={{mixBlendMode:`${blendingMode}`}}>
                <FilterColorList colordata={colordata} singlecolor={singlecolor}/>
              </div>
              
            </div>
          </div>
          
          <div className='align-center center-content p-2'>
            <h3 className='center button text-size-medium' onClick={handleCaptureClick}>
              <DownloadOutlined className='m-0_2'/> Download
            </h3>
            <h3 className='center button text-size-medium m-2'>
              Save Palette
            </h3>
          </div>
        </div>
      </div>
    );
}

export default PaletteGenerator