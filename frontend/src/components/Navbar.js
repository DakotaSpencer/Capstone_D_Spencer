import React from 'react'
import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'


const Navbar = () => {
  const {logout} = useLogout()

  const handleClick = () => {
    logout()
  }
  return (
    <header>
        <div className='container'>
            
            <Link to="/">
                <p className='title text-size-large'>
                  <img src='../../logo192.png' style={{width:'25px', margin:'7px'}}/>
                  colors
                </p>
            </Link>
            <nav>
              <div>
                <button onClick={handleClick} className='logout'>Log out</button>
              </div>
              <div>
                <Link to='/login' className='link'>Log In</Link>
                <Link to='/signup' className='link'>Sign Up</Link>
              </div>
            </nav>
        </div>
    </header>
  )
}

export default Navbar