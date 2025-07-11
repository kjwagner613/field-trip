// data/globalSources.ts
import type { FormNode } from '../types/formTypes'

export const globalSources: FormNode = {
  id: 'global',
  name: '🌐 Global Fields',
  dependsOn: [],
fields: [
  { id: 'organization_name', label: 'Organization Name', type: 'string' },
  { id: 'timezone', label: 'Default Timezone', type: 'string' },
  { id: 'support_email', label: 'Support Email', type: 'string' },
],

  field_schema: {
    type: 'object',
    properties: {
      organization_name: { title: 'Organization Name', type: 'string', avantos_type: 'short-text' },
      timezone: { title: 'Default Timezone', type: 'string', avantos_type: 'short-text' },
      support_email: { title: 'Support Email', type: 'string', avantos_type: 'short-text' },
    },
  },
}