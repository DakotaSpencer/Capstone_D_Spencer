import React from 'react'
import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'


const Navbar = () => {
  const {logout} = useLogout()
  const {user} = useAuthContext()

  const handleClick = () => {
    logout()
  }
  return (
    <header>
        <div className='container'>
            
            <Link to="/">
                <p className='title text-size-large'>
                  <img src='../../logo192.png' style={{width:'25px', margin:'7px'}} alt=""/>
                  colors
                </p>
            </Link>
            <nav>
              {user &&(
                <div>
                <span><a href='/profile' className='link'>{user.email}</a></span>
                <button onClick={handleClick} className='logout'>Log out</button>
              </div>
              )}
              {!user && (
                <div>
                  <Link to='/login' className='link'>Log In</Link>
                  <Link to='/signup' className='link'>Sign Up</Link>
                </div>
              )}
              
            </nav>
        </div>
    </header>
  )
}

export default Navbar