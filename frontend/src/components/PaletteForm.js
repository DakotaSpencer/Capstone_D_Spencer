import React, { useState } from 'react'
import { usePalettesContext } from '../hooks/usePalettesContext';
import {useAuthContext} from '../hooks/useAuthContext';

const PaletteForm = () => {
    const {dispatch} = usePalettesContext()
    const {user} = useAuthContext()

    const [title, setTitle] = useState('')
    const [userID, setUserID] = useState('')
    const [colors, setColors] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(!user) {
          setError('You must be logged in before performing this action.')
          return
        }

        const palette = {title, userID, colors}
    
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
        setUserID('')
        setColors('')
        setEmptyFields([])
        console.log('new palette added:', json)
        dispatch({
          type: 'CREATE_PALETTE', payload: json
        })
      }
    }

    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add a New Palette</h3>
            <label>Palette Title:</label>
            <input
                type={'text'}
                onChange={(e)=>setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title')? 'error': ''}
            />

            <label>Should be User ID (but will be done and removed later):</label>
            <input
                type={'number'}
                onChange={(e)=>setUserID(e.target.value)}
                value={userID}
                className={emptyFields.includes('userID')? 'error': ''}
            />

            <label>Colors. Will be removed and replaced with color palette generated before.:</label>
            <input
                type={'text'}
                onChange={(e)=>setColors(e.target.value)}
                value={colors}
                className={emptyFields.includes('colors')? 'error': ''}
            />
            <button>Add Palette</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default PaletteForm