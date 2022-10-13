import axios from 'axios'
import React from 'react';
import {useEffect, useState, useCallback} from 'react'
import ColorList from '../ColorList/ColorList';
import '../ColorList/ColorList.css'
import DownloadOutlined from '@mui/icons-material/Download';
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';

const PaletteGenerator = () => {
    const [hexCode, setHexCode] = useState(Math.floor(Math.random()*16777215).toString(16).toUpperCase());
    const [generationMode, setGenerationMode] = useState('analogic');
    const [blendingMode, setBlendingMode] = useState('');
    const [colorCount, setColorCount] = useState('');
    const [colordata, setColorData] = useState([]);
  
    useEffect(() => {
      getData()
    },[])
  
    const mixBlendingMode = {
      mixBlendMode: blendingMode
    }

    const getData = async () => {
        console.log(hexCode)
        //https://www.thecolorapi.com/scheme?hex=${this.hexcolor}&mode=${this.selectedMode}&count=${this.numOfColors}
        const result = await axios.get(`https://www.thecolorapi.com/scheme?hex=${hexCode}&mode=${generationMode}&count=${colorCount}`)
        console.log(`https://www.thecolorapi.com/scheme?hex=${hexCode}&mode=${generationMode}&count=${colorCount}`)
        console.log(result.data.colors)
        setColorData(result.data.colors)
    }
  
    const handleSearch = (e) => {
      e.preventDefault();
      
      //Default is to do a postback, which is refreshing the page, which we dont want
      //preventDefault() says dont post back, and instead do a console log
      console.log('User Submitted My Form!');
  
      //Based on the entered search term, reload out movies
      //Make sure to call the movie hook so react knows
      getData();
    }

    const handleCaptureClick = useCallback(async () => {
      const canvas = await html2canvas(document.getElementById('color-canvas'));
      const dataURL = canvas.toDataURL('image/png');
      downloadjs(dataURL, 'download.png', 'image/png');
    }, []);
  
    return (
      <div className="align-center">
        <body>
          <h1>Palette Generator</h1>
          <form className="searchForm align-center" onSubmit={handleSearch}>
            <div>
              <label className='m-2'>Base Color</label>
              <input type='text' value={hexCode} placeholder=''
                onChange={e => setHexCode(e.target.value)}/>
            </div>
            <div>
              <label className='m-2'>Count</label>
              <input type='number' value={colorCount} placeholder='5'
                onChange={e => e.target.value > 10 ? setColorCount(10) : setColorCount(e.target.value) | e.target.value < 1 ? setColorCount(1) : setColorCount(e.target.value)}/>
            </div>
            <div>
              <label className='m-2'>Generation Mode</label>
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

              <label className='m-2'>Blending Mode</label>
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
              <input type='submit' value='Generate'/>
            </div>
            
            
          </form>
          <div style={{mixBlendMode:`${blendingMode}`}} id="color-canvas">
            <ColorList colordata={colordata} />
          </div>
          
          <div className='align-center center-content p-2'>
            <h3 className='center button text-size-medium' onClick={handleCaptureClick}>
              <DownloadOutlined className='m-0_2'/> Download
            </h3>
            <h3 className='center button text-size-medium m-2'>
              Save Palette
            </h3>
          </div>
        </body>
      </div>
    );
}

export default PaletteGenerator