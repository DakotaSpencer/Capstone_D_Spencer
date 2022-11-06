import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PaletteContextProvider } from './context/PaletteContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <AuthContextProvider>
      <PaletteContextProvider>
        <App />
      </PaletteContextProvider>
    </AuthContextProvider>
  </>
);
