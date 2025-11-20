import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/css/reset.css';
import './assets/css/stylesheet.css';
// import './assets/css/swiper-bundle.min.css';
// import './assets/css/select2.min.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
