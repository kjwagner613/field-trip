
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MappingProvider } from './contexts/MappingContext'
import { FormDataProvider } from '../src/contexts/FormDataContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FormDataProvider graph={[]}>
      <MappingProvider>
        <App />
      </MappingProvider>
    </FormDataProvider>
  </StrictMode>
)