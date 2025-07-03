// components/SourcePickerModal.tsx
import type { FormNode } from '../types/formTypes'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSelect: (formId: string, fieldId: string) => void
  groupedCandidates: {
    label: string
    forms: FormNode[]
  }[]
}


const SourcePickerModal = ({ isOpen, onClose, onSelect, groupedCandidates }: Props) => {
  if (!isOpen) return null

  return (
    <div className="sourcePickerContainer">    
      <div className="sourcePickerItem">
        <h3>🔗 Choose a source field</h3>
        {groupedCandidates.map(group => (
          <div key={group.label}>
            <h4>{group.label}</h4>
            {group.forms.map(form => (
              <div key={form.id}>
                <strong>{form.name}</strong>
                <ul>
                  {form.fields.map(field => (
                    <li key={field.id}>
                      <button onClick={() => {
                        onSelect(form.id, field.id)
                        onClose()
                      }}>
                        {field.label} ({field.type})
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}

        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  )
}

export default SourcePickerModal