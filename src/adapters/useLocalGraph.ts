// adapters/useLocalGraph.ts
import type { FormNode } from '../types/formTypes'
import { globalSources } from '../data/globalSources'
import { demoBlueprint } from '../data/dataBlueprint'

export const useLocalGraph = (): { graph: FormNode[] } => {
  return {
    graph: [...demoBlueprint.forms, globalSources],
  }
}
