import axios from 'axios'
import React, { useRef } from 'react';
import {useEffect, useState, useCallback} from 'react'
import ColorList from '../ColorList/ColorList';
import DownloadOutlined from '@mui/icons-material/Download';
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
import BaseColor from '../BaseColor/BaseColor';
import FilterColorList from '../FilterColorList/FilterColorList';
import { CloudUpload, ShareRounded } from '@material-ui/icons';
import Dropdown from 'react-bootstrap/Dropdown';
import RefreshIcon from '@mui/icons-material/Refresh';
import { ChromePicker } from 'react-color';
import ColorizeIcon from '@mui/icons-material/Colorize';

const PaletteGenerator = () => {
    const [hexCode, setHexCode] = useState(Math.floor(Math.random()*16777215).toString(16).toUpperCase());
    const [generationMode, setGenerationMode] = useState('analogic');
    const [blendingMode, setBlendingMode] = useState('normal');
    const [colorCount, setColorCount] = useState('');
    const [colordata, setColorData] = useState([]);
    const [singlecolor, setSingleColor] = useState([]);
    const [displayShown, setDisplayShown] = useState(true);
    const [displayMode, setDisplayMode] = useState('hidden')
    
    useEffect(() => {
      var s = hexCode;
      while(s.charAt(0) === '#')
      {
        s = s.substring(1);
        
      }
      console.log('S While Loop')
      console.log(s)
      setHexCode(s)
      getData()
      getBaseColor()
      executeScroll()
    },[generationMode, colorCount, hexCode])
  
    const [state, setState] = useState({
      background: '#fff',
    })

    const handleChangeComplete = (color) => {
      setState({ background: color.hex });
      
      console.log("Hex Color From Color Picker")
      console.log(color.hex)
      var s = color.hex.toString();
      while(s.charAt(0) === '#')
      {
      s = s.substring(1);
      }
      console.log('S While Loop')
      console.log(s)
      setHexCode(s)
    };

    const getBaseColor = async () => {
      if (hexCode.toString().match(/([0-9a-fA-F]{3}){1,2}/)){
        //https://www.thecolorapi.com/id?format=json&named=false&hex=${hexCode}
        const result = await axios.get(`https://www.thecolorapi.com/id?hex=${hexCode}`)
        setSingleColor(result.data)
      }else{
        const result = await axios.get(`https://www.thecolorapi.com/id?hex=123456`)
        setSingleColor(result.data)
      }
      
    }
    

    const getData = async () => {
      if (hexCode.toString().match(/([0-9a-fA-F]{3}){1,2}/)){
        const results = await axios.get(`https://www.thecolorapi.com/scheme?hex=${hexCode}&mode=${generationMode}&count=${colorCount}`)
        setColorData(results.data.colors)
        console.log(results.data.colors)
      }else{
        const results = await axios.get(`https://www.thecolorapi.com/scheme?hex=123456&mode=analogic&count=5`)
        setColorData(results.data.colors)
      //https://www.thecolorapi.com/scheme?hex=${this.hexcolor}&mode=${this.selectedMode}&count=${this.numOfColors}
      }
    }

    const handleGen = (e)=>{
      setHexCode(Math.floor(Math.random()*16777215).toString(16).toUpperCase())
      setTimeout(200)
      getData()
      getBaseColor()
      executeScroll()
    }

    const handleSelect=(e)=>{
      console.log(e);
      setBlendingMode(e)
    }
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const toggleColorPicker = () => {
      if(displayShown === true){
        setDisplayMode('visible')
        
      }
      if(displayShown === false){
        setDisplayMode('hidden')
      }
      setDisplayShown(!displayShown)
    }

    const handleCaptureClick = useCallback(async () => {
      const canvas = await html2canvas(document.getElementById('color-canvas'));
      const dataURL = canvas.toDataURL('image/png');
      downloadjs(dataURL, 'download.png', 'image/png');
    }, []);
  

    const colorPalette = useRef(null)

    const executeScroll = () => colorPalette.current.scrollIntoView() 


    return (
      <div className="align-center">
        <div>
          <h1>Palette Generator</h1>
          
          {/* <form className="searchForm align-center" onSubmit={handleSearch}> */}
            
            <div className='center p-1' id='container'>

              <label className='m-1 text-size-medium text-weight-thick'>Base Color</label>
              <button className='button' onClick={handleGen}><RefreshIcon fontSize='large'/></button>
              <button className='button' onClick={toggleColorPicker}><ColorizeIcon fontSize='large'/></button>
              <div id="container" style={{visibility:displayMode}}>
                  <div id="infoi">
                    <ChromePicker
                    color={ state.background }
                    onChangeComplete={ handleChangeComplete }
                    className='overlayed'
                    />
                  </div>
                </div>
              
              <input className='search-input' type='text' value={hexCode} placeholder=''
                onChange={e => setHexCode(e.target.value)}/>

              <label className='m-1 text-size-medium text-weight-thick'>Count</label>
              <input className='search-input' type='number' value={colorCount} placeholder='5'
                onChange={e => e.target.value > 10 ? setColorCount(10) : setColorCount(e.target.value)}/>
              
              
              <label className='m-1 text-size-medium text-weight-thick'>Generation Mode</label>
              <select id="modeSelect" className='search-input' value={generationMode} onChange={e => setGenerationMode(e.target.value)}>
                <option value="analogic">analogic</option>
                <option value="analogic-complement">analogic-complement</option>
                <option value="complement">complement</option>
                <option value="monochrome">monochrome</option>
                <option value="monochrome-dark">monochrome-dark</option>
                <option value="monochrome-light">monochrome-light</option>
                <option value="triad">triad</option>
                <option value="quad">quad</option>
              </select>
              {/* <input type='submit' value='Generate' className='button'/> */}
            </div>
          {/* </form> */}

          <div>
            
            <div id="color-canvas" ref={colorPalette}>
              <BaseColor singlecolor={singlecolor}/>
              <ColorList colordata={colordata} singlecolor={singlecolor}/>
              <div style={{backgroundColor:'#323232'}}>
                <div style={{mixBlendMode:`${blendingMode}`}}>
                  <FilterColorList colordata={colordata} singlecolor={singlecolor}/>
                </div>
              </div>
            </div>
            <div className='p-2'>
              <label>Blending Mode: </label>
              <Dropdown onSelect={handleSelect} title={blendingMode} drop='end'>
              <Dropdown.Toggle variant="dark" id="dropdown-basic" title={blendingMode} style={{fontSize:'18px'}}>
                {capitalizeFirstLetter(blendingMode)}
              </Dropdown.Toggle>
              <Dropdown.Menu alignRight id="dropdown-menu-align-right" title={blendingMode}>
                  <Dropdown.Item eventKey="pass-through">Pass Through</Dropdown.Item>
                  <Dropdown.Item eventKey="normal">Normal</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="darken">Darken</Dropdown.Item>
                  <Dropdown.Item eventKey="multiply">Multiply</Dropdown.Item>
                  <Dropdown.Item eventKey="color-burn">Color Burn</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="lighten">Lighten</Dropdown.Item>
                  <Dropdown.Item eventKey="screen">Screen</Dropdown.Item>
                  <Dropdown.Item eventKey="color-dodge">Color Dodge</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="overlay">Overlay</Dropdown.Item>
                  <Dropdown.Item eventKey="soft-light">Soft Light</Dropdown.Item>
                  <Dropdown.Item eventKey="hard-light">Hard Light</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="difference">Difference</Dropdown.Item>
                  <Dropdown.Item eventKey="exclusion">Exclusion</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="hue">Hue</Dropdown.Item>
                  <Dropdown.Item eventKey="saturation">Saturation</Dropdown.Item>
                  <Dropdown.Item eventKey="color">Color</Dropdown.Item>
                  <Dropdown.Item eventKey="luminosity">Luminosity</Dropdown.Item>
              </Dropdown.Menu>
              </Dropdown>
            </div>
            
          </div>

          {/* <h5 className='p-2 m-2'>Current Blending Mode: {capitalizeFirstLetter(blendingMode)}</h5> */}
          <div className='align-center center-content p-2'>
            <h3 className='center button text-size-medium m-2 p-2' onClick={handleCaptureClick}>
              <DownloadOutlined /><div className='m-1'>Download</div>
            </h3>
            <h3 className='center button text-size-medium m-2 p-2'>
              <CloudUpload className='m-0_2'/><div className='m-1'>Save Palette</div>
            </h3>
            <h3 className='center button text-size-medium m-2 p-2'>
              <ShareRounded className='m-0_2'/><div className='m-1'>Share Palette</div>
            </h3>
          </div>
        </div>
      </div>
    );
}

export default PaletteGenerator