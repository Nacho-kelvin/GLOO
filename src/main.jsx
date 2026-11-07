import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource/quicksand/400.css'
import '@fontsource/quicksand/600.css'
import '@fontsource/quicksand/700.css'
import '@fontsource/cormorant-garamond/700.css' // the HOMEAFAR title only (upright + the italic A)
import '@fontsource/cormorant-garamond/700-italic.css'
import App from './App.jsx'
import './styles/index.css'

const root = document.getElementById('root')
const app = <BrowserRouter><App /></BrowserRouter>
// Built pages arrive with their content already in the HTML (see scripts/prerender.mjs): attach to it instead of redrawing.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
