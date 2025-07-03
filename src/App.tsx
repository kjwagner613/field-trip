// App.tsx
import { useState } from 'react'
import { useFormGraph } from './hooks/useFormGraph'
import PrefillEditor from './components/PrefillEditor'


const App = () => {
  const { formGraph } = useFormGraph()
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null)

  if (!formGraph.length) return <div>Loading graph...</div>

  const sortedForms = [...formGraph].sort((a, b) => a.name.localeCompare(b.name))


  return (
    <div className="displayGrid" >
      <h2>🧭 Form Graph Prefiller</h2>

      {!selectedFormId ? (
        <>

          <h4>Select a form to configure prefills:</h4>
          <div className="formCard">
           <ul className="form-list">
              {sortedForms.map((form) => (
                <li key={form.id}>
                  <button onClick={() => setSelectedFormId(form.id)}>
                    {form.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </>
      ) : (
        <>
          <button onClick={() => setSelectedFormId(null)}>← Back</button>
          <PrefillEditor formId={selectedFormId} />
        </>
      )}
    </div>
  )
}

export default App