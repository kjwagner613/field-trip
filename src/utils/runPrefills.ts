import type { PrefillMapping } from '../types/formTypes'
import { applyTransform } from './transformFunctions'

export const runPrefill = (
  mappings: PrefillMapping[],
  // Add parameter for actual form data
  formData: Record<string, Record<string, string>>
): Record<string, string> => {
  const output: Record<string, string> = {}

  for (const mapping of mappings) {
    const sourceId = mapping.source.fieldId    

    let raw = ''
    if (mapping.source.type === 'form' && mapping.source.formId) {
      raw = formData[mapping.source.formId]?.[sourceId] ?? ''
    }
    // Handle global sources here if needed
    
    const transformed = applyTransform(raw, mapping.transform)
    output[mapping.targetFieldId] = transformed
  }

  return output
}