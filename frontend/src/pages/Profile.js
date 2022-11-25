import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import UserPalettes from '../components/UserPalettes'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const {user} = useAuthContext()
  const navigate = useNavigate();
  return (
    <div className='m-2 p-2 pages'>
      <button onClick={() => navigate(-1)} className='button' style={{position:'absolute'}}><ArrowBackIcon fontSize='large'/></button>
      {user &&(
        <div style={{marginLeft:'50px', paddingLeft:'50px', top:'0'}}>
          <label><h1 style={{fontSize:'48px'}}>Saved Palettes</h1></label>
          <div>
            <UserPalettes></UserPalettes>
          </div>
        </div>
      )}
      {!user && (
        <div className='error m-2 p-2'>
          You are currently not logged in. Please click <a href='/login'>Log In</a> or <a href='/signup'>Sign Up</a> to view your profile.
        </div>
      )}
    </div>
  )
}

export default Profile