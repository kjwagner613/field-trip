// components/MappingRow.tsx
import type { Field, PrefillMapping } from '../types/formTypes'
import { applyTransform } from '../utils/transformFunctions'
import type { TransformType } from '../types/formTypes'

interface Props {
    field: Field
    mapping?: PrefillMapping
    onEdit: () => void
    onClear: () => void
    onTransformChange: (fieldId: string, transform: TransformType) => void
    // Add this new prop to receive actual field values
    sourceFieldValue?: string
}

const MappingRow = ({ field, mapping, onEdit, onClear, onTransformChange, sourceFieldValue }: Props) => {
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ flex: 1 }}>
                    <strong>{field.label}</strong> <small>({field.type})</small>
                    {mapping ? (
                        <div style={{ fontSize: '0.9rem', color: '#555' }}>
                            ← {mapping.source.fieldId} from {mapping.source.type === 'form' ? mapping.source.formId : 'global'}
                        </div>
                    ) : (
                        <div style={{ fontSize: '0.9rem', color: '#aaa' }}>No mapping set</div>
                    )}
                </div>
                <div>
                    <button onClick={onEdit}>Edit</button>{' '}
                    {mapping && <button onClick={onClear}>×</button>}
                </div>
            </div>
            {mapping && (
                <>
                    <div style={{ fontSize: '0.85rem', color: '#888' }}>
                        Preview: {applyTransform(sourceFieldValue ?? '[No data available]', mapping.transform)}
                    </div>
                    <select
                        value={mapping.transform ?? 'none'}
                        onChange={(e) => onTransformChange(field.id, e.target.value as TransformType)}
                        style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}
                    >
                        <option value="none">No Transform</option>
                        <option value="calculateAge">🧮 Calculate Age</option>
                        <option value="uppercase">🔠 Uppercase</option>
                    </select>
                </>
            )}
        </>
    )
}

export default MappingRow