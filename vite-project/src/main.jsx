import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { ClerkProvider } from "@clerk/clerk-react";
import { DataProvider } from './context/DataContext.jsx';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <DataProvider>
     <CartProvider>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <App/>
    </ClerkProvider>

         </CartProvider>
    </DataProvider>
  </StrictMode>,
)
