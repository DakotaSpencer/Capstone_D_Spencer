import { Delete } from '@material-ui/icons';
import React, {useState, useEffect} from 'react'
import {usePalettesContext} from '../hooks/usePalettesContext'
import {useAuthContext} from '../hooks/useAuthContext';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Link } from 'react-router-dom';


const PaletteDetails = ({palette}) => {
  const {dispatch} = usePalettesContext()
  const {user} = useAuthContext()
  const [hexCode, setHexCode] = useState(palette.colors);
  const [colordata, setColorData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setHexCode(palette.colors.toString())
    getData()
  },[])

  const getData = async () => {
    if (hexCode.toString().match(/([0-9a-fA-F]{3}){1,2}/)){
      const results = await axios.get(`https://www.thecolorapi.com/scheme?hex=${hexCode}&mode=analogic&count=5`)
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

  const handleClick = async() => {
    if(!user){
      return
    }
    const response = await fetch('/api/palettes/' + palette._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if(response.ok){
      dispatch({
        type: 'DELETE_PALETTE',
        payload: json
      })
    }
  }
  return (
    <div className='palette-details'>
            <div classname="iibox" style={{opacity:'50%'}}>
              <div className='color-details color-container'>
                {
                  colordata.map((color)=>(
                  <div key={color.hex.clean} className="color-box">
                      {/* savedIndexes.forEach(index => {
                          colors[index] = savedColorFromThatIndex
                      }); */}
                      {/* <Color color={color}/> */}
                      <div className='' style={{backgroundColor : `${color.hex.value}`, color:`${color.contrast.value}`, height:'150px', width:'space-evenly'}}></div>
                  </div>
                  ))
                }
              </div>
            </div>
            <div className="iibox stack-top" style={{opacity:'100%'}}>
              <span className="box_shadow" onClick={handleClick}><Delete/></span>
              <h4 className='' style={{ width: 'max-content', marginBottom:'20px'}}><Link to={`/generate/${palette.colors}`} className='link box_shadow'>{palette.title}</Link></h4>
              <p className='' style={{width: 'max-content', marginTop:'8px'}}><strong>Base Color: </strong>#{palette.colors}</p>
              <p className='' style={{width: 'max-content'}}>Created {formatDistanceToNow(new Date(palette.createdAt), {addSuffix: true})}</p>
            </div>
        
    </div>
  )
}

export default PaletteDetails