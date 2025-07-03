// data/demoBlueprint.ts
export const demoBlueprint = {
  forms: [
    {
      id: 'form-a',
      name: 'Form A',
      field_schema: {
        type: 'object',
        properties: {
          email: {
            title: 'Email',
            type: 'string',
            avantos_type: 'short-text',
          },
          dob: {
            title: 'Date of Birth',
            type: 'string',
            avantos_type: 'date',
            format: 'date',
          },
        },
      },
      dependsOn: [],
    },
    {
      id: 'form-b',
      name: 'Form B',
      field_schema: {
        type: 'object',
        properties: {
          contact_email: {
            title: 'Contact Email',
            type: 'string',
            avantos_type: 'short-text',
          },
        },
      },
      dependsOn: ['form-a'],
    },
    {
      id: 'form-c',
      name: 'Form C: Summary Info',
      field_schema: {
        type: 'object',
        properties: {
          summary_email: {
            title: 'Summary Email',
            type: 'string',
            avantos_type: 'short-text',
          },
          age_estimate: {
            title: 'Age (Estimate)',
            type: 'number',
            avantos_type: 'number',
          },
        },
      },
      dependsOn: ['form-a', 'form-b'],
    },
  ],
}