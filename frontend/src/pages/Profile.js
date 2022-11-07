import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import UserPalettes from '../components/UserPalettes'

const Profile = () => {
  const {user} = useAuthContext()
  return (
    <div>
      {user &&(
        <div>
          <label><h1>User Information</h1></label>
          <div>
            <span>{user.email}</span>
          </div>
          <label><h1>User Palettes</h1></label>
          <div>
            <UserPalettes></UserPalettes>
          </div>
        </div>
      )}
      {!user && (
        <div className='error'>
          You are currently not logged in. Please click <a href='/login'>Log In</a> or <a href='/signup'>Sign Up</a> to view your profile.
        </div>
      )}
    </div>
  )
}

export default Profile