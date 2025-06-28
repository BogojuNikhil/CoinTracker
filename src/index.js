import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CreateContext from './createContext';
import 'react-alice-carousel/lib/alice-carousel.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CreateContext>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </CreateContext>
);
