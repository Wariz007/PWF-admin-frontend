import { createRoot } from 'react-dom/client'
import Root from './Root.tsx'
import './styles/main.scss';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename='/'>
    <Root />
  </BrowserRouter>
);