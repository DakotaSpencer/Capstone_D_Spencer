import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PaletteContextProvider } from './context/PaletteContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <PaletteContextProvider>
      <App />
    </PaletteContextProvider>
  </>
);
