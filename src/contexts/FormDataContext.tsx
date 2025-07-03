// src/contexts/FormDataContext.tsx
import React, { createContext, useContext } from 'react'
import { useLocalGraph } from '../adapters/useLocalGraph'
import type { FormNode } from '../types/form'

interface FormDataContextValue {
  graph: FormNode[]
}

const FormDataContext = createContext<FormDataContextValue | undefined>(undefined)

export const FormDataProvider = ({ children }: { children: React.ReactNode }) => {
  const { graph } = useLocalGraph() // ✅ provide the required value

  return (
    <FormDataContext.Provider value={{ graph }}>
      {children}
    </FormDataContext.Provider>
  )
}

export const useFormData = () => {
  const context = useContext(FormDataContext)
  if (!context) throw new Error('useFormData must be used within a FormDataProvider')
  return context
}
