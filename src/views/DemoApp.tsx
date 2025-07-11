// views/DemoApp.tsx
import { useState } from 'react'
import { useLocalGraph } from '../adapters/useLocalGraph'
import { FormDataProvider } from '../contexts/FormDataContext'
import { PrefillEditor } from '../components/PrefillEditor'
import { FormSwitcher } from '../components/FormSwitcher'

export const DemoApp = () => {
  const { graph } = useLocalGraph()
  console.log('🧪 Graph:', graph)

  const [formId, setFormId] = useState(graph[0]?.id || '')

  return (
    <FormDataProvider>
      <div style={{ padding: '2rem' }}>
        <h2>🔧 Local Prefill Editor</h2>
        <FormSwitcher
          formIds={graph.map((f) => f.id)}
          selectedFormId={formId}
          onSelect={setFormId}
        />
        <PrefillEditor formId={formId} />
      </div>
    </FormDataProvider>
  )
}