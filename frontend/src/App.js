import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react';
import Home from './pages/Home';
import Explore from './pages/Explore'
import Navbar from './components/Navbar';
import Profile from './pages/Profile';


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
              path='/explore'
              element={<Explore/>}
            />
            <Route
              path='/profile'
              element={<Profile/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
