export interface FormNode {
  field_schema: any
  id: string
  name: string
  fields: Field[]
  dependsOn: string[] // Form IDs
}

export interface Field {
  id: string
  label: string
  type: string
}

export interface PrefillMapping {
  targetFieldId: string
  source: {
    type: 'form' | 'global'
    formId?: string
    fieldId: string
  }
  transform?: 'calculateAge' | 'uppercase' | 'none'
}

export type TransformType = 'calculateAge' | 'uppercase' | 'none' | undefined