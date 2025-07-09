import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from '../context/AuthContext';
import { ChatProvider } from '../context/ChatContext.jsx';
import { ItemProvider } from '../context/ItemContext.jsx';


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <AuthProvider>
  //   <App />
  //   </AuthProvider>
  // </StrictMode>,
    <StrictMode>
      
    <AuthProvider>
      <ChatProvider>
        <ItemProvider>
    <App />
    </ItemProvider>
    </ChatProvider>
    </AuthProvider>
  </StrictMode>,
)
