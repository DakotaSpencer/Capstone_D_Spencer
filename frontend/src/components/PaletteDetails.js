import { Delete } from '@material-ui/icons';
import React from 'react'
import {usePalettesContext} from '../hooks/usePalettesContext'
import {useAuthContext} from '../hooks/useAuthContext';

import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const PaletteDetails = ({palette}) => {
  const {dispatch} = usePalettesContext()
  const {user} = useAuthContext()


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
    <div className='workout-details'>
        <h4>{palette.title}</h4>
        <p><strong>User ID: </strong>{palette.userID}</p>
        <p><strong>Colors: </strong>{palette.colors}</p>
        <p>Created {formatDistanceToNow(new Date(palette.createdAt), {addSuffix: true})}</p>
        <span class="" onClick={handleClick}><Delete/></span>
    </div>
  )
}

export default PaletteDetails