import '../App.css'
import axios from 'axios'
import React from 'react';
import {useEffect, useState} from 'react'
import ColorList from './ColorList';

const PaletteGenerator = () => {
    const [hexCode, setHexCode] = useState(Math.floor(Math.random()*16777215).toString(16));
    const [generationMode, setGenerationMode] = useState('analogic');
    const [colorCount, setColorCount] = useState('1');
    const [colordata, setColorData] = useState([]);
  
    useEffect(() => {
      getData()
    },[])
  
    const getData = async () => {
      console.log(hexCode)
      //https://www.thecolorapi.com/scheme?hex=${this.hexcolor}&mode=${this.selectedMode}&count=${this.numOfColors}
      const result = await axios.get(`https://www.thecolorapi.com/scheme?hex=${hexCode}&mode=${generationMode}&count=${colorCount}`)
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
  
    return (
      <div className="App">
        <body>
          <form className="searchForm" onSubmit={handleSearch}>
            <label>Base Color</label>
            {/*Set the value to our search term */}
            {/* We need to tell react when the value of this textbox changes*/}
            <input type='text' value={hexCode} placeholder=''
              onChange={e => setHexCode(e.target.value)}/>
            <label>Count</label>
  
            <input type='number' value={colorCount} placeholder='5'
              onChange={e => setColorCount(e.target.value)}/>
  
  
            <label>Generation Mode</label>
            <select id="modeSelect" value={generationMode} onChange={e => setGenerationMode(e.target.value)}>
              <option value="monochrome">monochrome</option>
              <option value="monochrome-dark">monochrome-dark</option>
              <option value="monochrome-light">monochrome-light</option>
              <option value="analogic">analogic</option>
              <option value="complement">complement</option>
              <option value="analogic-complement">analogic-complement</option>
              <option value="triad">triad</option>
              <option value="quad">quad</option>
            </select>
            <input type='submit' value='Generate'/>
            <ColorList colordata={colordata}/>
          </form>
        </body>
      </div>
    );
}

export default PaletteGenerator