import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react';

//Pages and Components
import Home from './pages/Home';
import Explore from './pages/Explore'
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import UserPalettes from './pages/UserPalettes';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Generate from './pages/Generate';
import ImageGeneration from './pages/ImageGeneration';


function App() {
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
              path='/explore'
              element={<Explore/>}
            />
            <Route
              path='/profile'
              element={<Profile/>}
            />
            <Route
              path='/palettes'
              element={<UserPalettes/>}
            />
            <Route
              path='/login'
              element={<Login/>}
            />
            <Route
              path='/signup'
              element={<Signup/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
