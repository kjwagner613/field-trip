import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { PrefillMapping } from '../types/formTypes'

type MappingStore = Record<string, PrefillMapping[]> // keyed by formId

interface MappingContextType {
  mappings: MappingStore
  setMappings: (updater: (prev: MappingStore) => MappingStore) => void
}

const MappingContext = createContext<MappingContextType | undefined>(undefined)

export const MappingProvider = ({ children }: { children: ReactNode }) => {
  const [mappings, _setMappings] = useState<MappingStore>({})

  const setMappings = (updater: (prev: MappingStore) => MappingStore) => {
    _setMappings(prev => updater(prev))
  }

  return (
    <MappingContext.Provider value={{ mappings, setMappings }}>
      {children}
    </MappingContext.Provider>
  )
}

export const useMappings = () => {
  const ctx = useContext(MappingContext)
  if (!ctx) throw new Error('useMappings must be used within a MappingProvider')
  return ctx
}