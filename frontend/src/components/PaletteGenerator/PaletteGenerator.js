import axios from 'axios'
import React, { useRef } from 'react';
import {useEffect, useState, useCallback} from 'react'
import {
  useParams
} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import ColorList from '../ColorList/ColorList';
import DownloadOutlined from '@mui/icons-material/Download';
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
import BaseColor from '../BaseColor/BaseColor';
import { CloudUpload, ShareRounded } from '@material-ui/icons';
import RefreshIcon from '@mui/icons-material/Refresh';
import { ChromePicker } from 'react-color';
import ColorizeIcon from '@mui/icons-material/Colorize';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { usePalettesContext } from '../../hooks/usePalettesContext';
import {useAuthContext} from '../../hooks/useAuthContext';
import Dropdown from 'react-bootstrap/Dropdown';
// import { TwitterShareButton } from "react-share";
// import {
//   TwitterIcon,
// } from "react-share";

const PaletteGenerator = () => {
    let { hex } = useParams();
    const [hexCode, setHexCode] = useState(hex? hex : Math.floor(Math.random()*16777215).toString(16).toUpperCase());
    const [generationMode, setGenerationMode] = useState('analogic');
    const [colorCount, setColorCount] = useState('5');
    const [colordata, setColorData] = useState([]);
    const [singlecolor, setSingleColor] = useState([]);
    const [displayShown, setDisplayShown] = useState(true);
    const [displayMode, setDisplayMode] = useState('hidden')
    const {dispatch} = usePalettesContext()
    const {user} = useAuthContext()
    const [title, setTitle] = useState('')
    const [colors, setColors] = useState(colordata)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const [state, setState] = useState({
      background: '#fff',
    })
    const navigate = useNavigate();

    useEffect(() => {
      var s = hexCode;
      while(s.charAt(0) === '#')
      {
        s = s.substring(1);
        
      }
      setHexCode(s)
      getData()
      getBaseColor()
      executeScroll()
      
    },[generationMode, colorCount, hexCode, hex])

    var blinder = require('color-blind');
    blinder.protanopia('#42dead'); // result: "#d1c4a0"

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(!user) {
          setError('You must be logged in before performing this action.')
          return
        }

        const palette = {title, colors}
    
    const response = await fetch('/api/palettes', {
      method: 'POST',
      body: JSON.stringify(palette),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
        setError(json.error)
        setEmptyFields(json.emptyFields)
      }
      if (response.ok) {
        setError(null)
        setTitle('')
        setColors('')
        setEmptyFields([])
        console.log('new palette added:', json)
        dispatch({
          type: 'CREATE_PALETTE', payload: json
        })
      }
    }

    const handleChangeComplete = (color) => {
      setState({ background: color.hex });
      var s = color.hex.toString();
      while(s.charAt(0) === '#')
      {
      s = s.substring(1);
      }
      setHexCode(s)
    };

    const getBaseColor = async () => {
      if (hexCode.toString().match(/([0-9a-fA-F]{3}){1,2}/)){
        navigate(`/generate/${hexCode}`);
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
        if(results.data.colors[0].hex.clean === '000000' && results.data.colors[0].hex.clean === '000000'){
          navigate('/')
        }else(
          console.log(results.data)
        )
      }else{
        const results = await axios.get(`https://www.thecolorapi.com/scheme?hex=123456&mode=analogic&count=5`)
        setColorData(results.data.colors)
      }
    }

    const addColor = () => {
      colorCount >= 10 ? setColorCount(10) : setColorCount(parseInt(colorCount) + 1)
      
    }

    const removeColor = () => {
      colorCount <= 1 ? setColorCount(1) :  setColorCount(parseInt(colorCount) - 1)
      //check if color is less than or equal to 1, or over 10, if not do nothing
    
    }

    const handleGen = (e)=>{
      setHexCode(Math.floor(Math.random()*16777215).toString(16).toUpperCase())
      setTimeout(200)
      getData()
      getBaseColor()
      executeScroll()
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
      var slides = document.getElementsByClassName("remove");
      
      console.log(slides)
      
      for (var i = 0; i < slides.length; i++) {
        console.log(slides.item(i));
        slides.item(i).style.visibility="hidden"
      }
      const canvas = await html2canvas(document.getElementById('color-canvas'));
      for (var n = 0; n < slides.length; n++) {
        console.log(slides.item(i));
        slides.item(n).style.visibility="visible"
      }
      const dataURL = canvas.toDataURL('image/png');
      downloadjs(dataURL, 'download.png', 'image/png');
      
      
    }, []);

    const handleSelect=(e)=>{
      setGenerationMode(e)
      console.log(generationMode)
    }
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  

    const colorPalette = useRef(null)

    const executeScroll = () => colorPalette.current.scrollIntoView() 


    return (
      <div className="align-center">
        <div>
          <h1>Palette Generator</h1>

          {/* <TwitterShareButton title={"test"} url={"https://www.twitter.com/home"}>
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton> */}
            
            <div className='center p-1 center-row' id='container'>

              {/* <label className='m-1 text-size-medium text-weight-thick'>Base Color</label> */}
              <button className='button' onClick={handleGen}><RefreshIcon fontSize='large'/></button>
              <button className='button' onClick={toggleColorPicker}><ColorizeIcon fontSize='large'/></button>
              <div id="container" style={{visibility:displayMode}}>
                  <div id="infoi">
                    <ChromePicker
                    color={ state.background }
                    onChange={ handleChangeComplete }
                    className='overlayed'
                    />
                  </div>
                </div>
              <Dropdown onSelect={handleSelect} title={generationMode} drop='end'>
              <Dropdown.Toggle variant="dark" id="dropdown-basic" title={generationMode} style={{fontSize:'20px'}}>
                {capitalizeFirstLetter(generationMode)}
              </Dropdown.Toggle>
              <Dropdown.Menu id="dropdown-menu-align-right" title={generationMode}>
                  <Dropdown.Item eventKey="analogic">Analogic</Dropdown.Item>
                  <Dropdown.Item eventKey="analogic-complement">Analogic Complement</Dropdown.Item>
                  <Dropdown.Item eventKey="complement">Complement</Dropdown.Item>
                  <Dropdown.Item eventKey="monochrome">Monochrome</Dropdown.Item>
                  <Dropdown.Item eventKey="monochrome-dark">Monochrome Dark</Dropdown.Item>
                  <Dropdown.Item eventKey="monochrome-light">Monochrome Light</Dropdown.Item>
                  <Dropdown.Item eventKey="triad">Triad</Dropdown.Item>
                  <Dropdown.Item eventKey="quad">Quad</Dropdown.Item>
                  <Dropdown.Divider />
                </Dropdown.Menu>
          </Dropdown>
              
            </div>
            
            
            <div id="color-canvas"  ref={colorPalette}>
              <BaseColor singlecolor={singlecolor}/>
              <div className='flex-num-buttons'>
                <div className='left white-circle box_shadow remove' onClick={removeColor}>
                  <RemoveIcon fontSize='large'/>
                </div>
                <ColorList colordata={colordata} singlecolor={singlecolor} />
                <div className='right white-circle box_shadow remove' onClick={addColor}>
                  <AddIcon fontSize='large'/>
                </div>
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
          {user?
          <div>
            <form className='create' onSubmit={handleSubmit}>
              <h3>Add a New Palette</h3>
              <label>Palette Title:</label>
              <input
                  type={'text'}
                  onChange={(e)=>setTitle(e.target.value)}
                  value={singlecolor.name?singlecolor.name.value:''}
                  className={emptyFields.includes('title')? 'error': ''}
              />
              <label>Colors. Will be removed and replaced with color palette generated before.:</label>
              <input
                  type={'text'}
                  onChange={(e)=>setColors(e.target.value)}
                  value={colordata}
                  className={emptyFields.includes('colors')? 'error': ''}
              />
              <button>Add Palette</button>
              {error && <div className='error'>{error}</div>}
            </form>
          </div>:<div></div>}
          
          
        </div>
      </div>
    );
}

export default PaletteGenerator