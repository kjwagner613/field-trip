import React from 'react'

interface FormSwitcherProps {
  formIds: string[]
  selectedFormId: string
  onSelect: (id: string) => void
}

export const FormSwitcher = ({
  formIds,
  selectedFormId,
  onSelect,
}: FormSwitcherProps) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label htmlFor="form-select">🧭 Select a Form: </label>
      <select
        id="form-select"
        value={selectedFormId}
        onChange={(e) => onSelect(e.target.value)}
      >
        {formIds.map((id) => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>
    </div>
  )
}