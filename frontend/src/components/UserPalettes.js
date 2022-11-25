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
        <div className='home'>{
            palettes?<div className='palettes center'>
                {palettes && palettes.map((palette)=>(
                    <PaletteDetails key={palette._id} palette={palette}/>
                ))}
                
            </div>
            :<h5>You don't have any palettes saved. Click <a href='/'>here</a> to go generate some!</h5>
        }
        </div>
    )
}

export default UserPalettes