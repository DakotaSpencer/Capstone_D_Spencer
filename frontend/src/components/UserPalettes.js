import React from 'react'

import { useEffect} from "react";
import { usePalettesContext } from '../hooks/usePalettesContext';
import {useAuthContext} from '../hooks/useAuthContext';


//components
import PaletteDetails from '../components/PaletteDetails'
import PaletteForm from '../components/PaletteForm'

const UserPalettes = () => {
    const {palettes, dispatch} = usePalettesContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchPalettes = async () =>{
            const response = await fetch('/api/palettes', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
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
                <h5>You've reached the end.</h5>
            </div>
            <PaletteForm/>
        </div>
    )
}

export default UserPalettes