// utils/graphHelpers.ts
import type { FormNode } from "../types/formTypes";

export const getTransitiveDependencies = (
  formId: string,
  graph: Record<string, FormNode>,
  visited = new Set<string>()
): string[] => {
  if (visited.has(formId)) return [];

  visited.add(formId);
  const form = graph[formId];
  if (!form) return [];

  const directDeps = form.dependsOn ?? [];
  const transitiveDeps = directDeps.flatMap((depId) =>
    getTransitiveDependencies(depId, graph, visited)
  );

  const result = [...directDeps, ...transitiveDeps];
  console.log(`[Deps for ${formId}]`, result);
  return result;
};

export type DependencyBuckets = {
  direct: FormNode[];
  transitive: FormNode[];
};

export const getGroupedDependencies = (
  formId: string,
  graph: Record<string, FormNode>
): DependencyBuckets => {
  const visited = new Set<string>();
  const directIds = graph[formId]?.dependsOn ?? [];

  visited.add(formId);

  const collectTransitive = (id: string): string[] => {
    if (visited.has(id)) return [];
    visited.add(id);

    const depIds = graph[id]?.dependsOn ?? [];
    return depIds.flatMap((dep) => [dep, ...collectTransitive(dep)]);
  };

  const transitiveIds = directIds.flatMap(collectTransitive);
  const allDirect = directIds.map((id) => graph[id]).filter(Boolean);
  const allTransitive = [...new Set(transitiveIds)]
    .map((id) => graph[id])
    .filter(Boolean);

  return { direct: allDirect, transitive: allTransitive };
};

export const normalizeForms = (
  forms: FormNode[]
): Record<string, FormNode & { fields: any[] }> => {
  const result: Record<string, FormNode & { fields: any[] }> = {};

  forms.forEach((form) => {
    const fieldProps = form.field_schema?.properties || {};
    const fields = Object.entries(fieldProps).map(([id, field]: [string, any]) => ({
      id,
      label: field.title ?? field.label ?? '',
      type: field.type ?? '',
      ...field,
    }));
    result[form.id] = {
      ...form,
      fields,
    };
  });

  return result;
};
