// src/api/fetchGraph.ts

import type { FormNode } from '../types/formTypes'


function extractFieldsFromSchema(schema: any): FormNode['fields'] {
  if (!schema?.properties) return []

  return Object.entries(schema.properties).map(([id, def]: [string, any]) => ({
    id,
    label: def.title || id,
    type: def.avantos_type || def.type || 'string',
    required: schema.required?.includes(id) || false
  }))
}



type RawNode = {
  id: string
  type: string
  position: { x: number; y: number }
  data: any
}





function extractFormsFromGraph(
  nodes: RawNode[],
  formDefs: Array<{ id: string; field_schema: any }>
): FormNode[] {
  return nodes
    .filter(node => node.type === 'form')
    .map(node => {
      const def = formDefs.find(f => f.id === node.data.component_id)
      return {
        id: node.id,
        name: node.data.name,
        dependsOn: node.data.prerequisites ?? [],
        field_schema: def?.field_schema, // Add the missing property
        fields: extractFieldsFromSchema(def?.field_schema)
      }
    })
}

export async function fetchFormGraph(): Promise<FormNode[]> {
  const res = await fetch('/api/v1/123/actions/blueprints/bp_456/bpv_123/graph', {
    headers: { Accept: 'application/json, application/problem+json' },
  });

  if (!res.ok) {
    console.warn('⚠️ Remote graph fetch failed, falling back to local.');
    const { demoBlueprint } = await import('../data/dataBlueprint');
    const { globalSources } = await import('../data/globalSources');
    
    // Transform demo data to match FormNode structure
    const transformedDemo = demoBlueprint.forms.map((form: any) => ({
      ...form,
      fields: form.fields || extractFieldsFromSchema(form.field_schema)
    }));
    
    const transformedGlobal = Array.isArray(globalSources)
      ? globalSources.map((source: any) => ({
          ...source,
          fields: source.fields || extractFieldsFromSchema(source.field_schema)
        }))
      : [{
          ...globalSources,
          fields: globalSources.fields || extractFieldsFromSchema(globalSources.field_schema)
        }];
    
    return [...transformedDemo, ...transformedGlobal];
  }

  const graph = await res.json();
  const forms = extractFormsFromGraph(graph.nodes ?? [], graph.forms ?? []);

  console.log(
    '[Field labels]',
    forms.flatMap(f => f.fields.map(field => field.label))
  );

  return forms;
}