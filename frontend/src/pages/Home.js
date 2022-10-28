import React from 'react'

import PaletteGenerator from '../components/PaletteGenerator/PaletteGenerator';

import { ImagePalette } from '../components/ImagePalette/ImagePalette';

const Home = () =>{
    return(
        <div>
            <PaletteGenerator/>
            <ImagePalette/>
        </div>
    )
}

export default Home