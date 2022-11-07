import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {useAuthContext} from './hooks/useAuthContext';
import React from 'react';

//Pages and Components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Generate from './pages/Generate';
import ImageGeneration from './pages/ImageGeneration';


function App() {
  const {user} = useAuthContext()

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar/>
        <div className='pages'>
          <Routes>
            <Route
              path='/'
              element={<Home/>}
            />
            <Route
              path='/generate'
              element={<Generate/>}
            />
            <Route
              path='/image'
              element={<ImageGeneration/>}
            />
            <Route
              path='/profile'
              element={user?<Profile/>:<Home/>}
            />
            <Route
              path='/login'
              element={!user ?<Login/> : <Navigate to="/profile"/>}
            />
            <Route
              path='/signup'
              element={!user ?<Signup/> : <Navigate to="/"/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
