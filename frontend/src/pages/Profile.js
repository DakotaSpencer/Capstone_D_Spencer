import React from 'react'

import { useEffect} from "react";
import { usePalettesContext } from '../hooks/usePalettesContext';


//components
import PaletteDetails from '../components/PaletteDetails'
import PaletteForm from '../components/PaletteForm';

const Profile = () => {
    const {palettes, dispatch} = usePalettesContext()

    useEffect(() => {
        const fetchPalettes = async () =>{
            const response = await fetch('/api/palettes')
            const json = await response.json()
    
    
            if(response.ok){
                dispatch({type:'SET_PALETTES', payload: json})
            }
        }
    
        fetchPalettes()
    },[dispatch])

    return (
        <div className='home'>
            <div className='palettes'>
                {palettes && palettes.map((palette)=>(
                    <PaletteDetails key={palette._id} palette={palette}/>
                ))}
            </div>
            <PaletteForm/>
        </div>
    )
}

export default Profile