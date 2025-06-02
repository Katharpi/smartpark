import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/UserAuthContext.jsx'
import { SocketProvider } from './context/SocketContext.jsx'

export default App

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SocketProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </SocketProvider>
  </React.StrictMode>
)
