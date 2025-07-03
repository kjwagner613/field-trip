import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

// Store actual form field values by formId -> fieldId -> value
type FormDataStore = Record<string, Record<string, string>>

interface FormDataContextType {
  formData: FormDataStore
  setFormFieldValue: (formId: string, fieldId: string, value: string) => void
  getFormFieldValue: (formId: string, fieldId: string) => string | undefined
}

const FormDataContext = createContext<FormDataContextType | undefined>(undefined)

export const FormDataProvider = ({ children }: { children: ReactNode }) => {
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

  return FormDataContext.Provider({
    value: { formData, setFormFieldValue, getFormFieldValue },
    children
  });
}

export const useFormData = () => {
  const ctx = useContext(FormDataContext)
  if (!ctx) throw new Error('useFormData must be used within a FormDataProvider')
  return ctx
}