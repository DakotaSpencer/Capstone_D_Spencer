import './App.css';
import React from 'react';
import PaletteGenerator from './components/PaletteGenerator/PaletteGenerator';

import { ImagePalette } from './components/ImagePalette/ImagePalette';

function App() {
  return (
    <>
      <PaletteGenerator/>
      <ImagePalette/>
    </>
  );
}

export default App;
