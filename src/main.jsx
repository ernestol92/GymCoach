import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import './i18n'
import { registerSW } from 'virtual:pwa-register'

registerSW({
  immediate: true,
  onOfflineReady() {
    console.log('App is ready to work offline.')
  },
  onNeedRefresh() {
    console.log('New content is available; please refresh.')
  }
})



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />    
    </HashRouter>
  </StrictMode>,
)
