import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { useTodoStore } from './store/useTodoStore';

(globalThis as any).__store = useTodoStore;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
