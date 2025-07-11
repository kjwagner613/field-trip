// src/contexts/FormDataContext.tsx
import React, { createContext, useContext, useState } from 'react'
import { useLocalGraph } from '../adapters/useLocalGraph'
import type { FormNode } from '../types/formTypes'

// Store actual form field values by formId -> fieldId -> value
type FormDataStore = Record<string, Record<string, string>>

interface FormDataContextValue {
  graph: FormNode[]
  formData: FormDataStore
  setFormFieldValue: (formId: string, fieldId: string, value: string) => void
  getFormFieldValue: (formId: string, fieldId: string) => string | undefined
}

const FormDataContext = createContext<FormDataContextValue | undefined>(undefined)

export const FormDataProvider = ({ children }: { children: React.ReactNode }) => {
  const { graph } = useLocalGraph() // ✅ provide the required value
  const [formData, setFormData] = useState<FormDataStore>({})

  const setFormFieldValue = (formId: string, fieldId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [formId]: {
        ...prev[formId],
        [fieldId]: value
      }
    }))
  }

  const getFormFieldValue = (formId: string, fieldId: string) => {
    return formData[formId]?.[fieldId]
  }

  return (
    <FormDataContext.Provider value={{ graph, formData, setFormFieldValue, getFormFieldValue }}>
      {children}
    </FormDataContext.Provider>
  )
}

export const useFormData = () => {
  const context = useContext(FormDataContext)
  if (!context) throw new Error('useFormData must be used within a FormDataProvider')
  return context
}
