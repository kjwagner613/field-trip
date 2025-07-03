import { useState, useEffect } from 'react'
import type { FormNode } from '../types/formTypes'
import { fetchFormGraph } from '../api/fetchGraph'



export const useFormGraph = () => {
  const [formGraph, setFormGraph] = useState<FormNode[]>([])
  const [normalizedGraph, setNormalizedGraph] = useState<Record<string, FormNode>>({})

useEffect(() => {
  const load = async () => {
    const forms = await fetchFormGraph()
    setFormGraph(forms)

    const normalized = forms.reduce((acc, form) => {
      acc[form.id] = {
        ...form,
        dependsOn: form.dependsOn ?? [],
        fields: form.fields ?? []
      }
      return acc
    }, {} as Record<string, FormNode>)

    setNormalizedGraph(normalized)
  }

  load()
}, [])

  return { formGraph, normalizedGraph }
}


