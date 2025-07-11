
import { useMappings } from '../contexts/MappingContext'
import MappingRow from './MappingRow'
import { useState } from 'react'
import SourcePickerModal from './SourcePickerModal'
import type { PrefillMapping } from '../types/formTypes'
 
import { getTransitiveDependencies } from '../engine/graphHelpers'
import { useFormData } from '../contexts/FormDataContext'
import { normalizeForms } from '../engine/graphHelpers'



type TransformType = PrefillMapping['transform'];


export const PrefillEditor = ({ formId }: { formId: string }) => {
    const [modalFieldId, setModalFieldId] = useState<string | null>(null)
    const isOpen = modalFieldId !== null
    const { graph,  getFormFieldValue } = useFormData()
    const normalizedGraph = normalizeForms(graph)
    const { mappings, setMappings } = useMappings()

    // Move all logic BEFORE the return statement
    const form = normalizedGraph[formId]
    if (!form) return null

    const formMappings = mappings[formId] ?? []

    const getMapping = (fieldId: string) =>
        formMappings.find((m: PrefillMapping) => m.targetFieldId === fieldId)

    const getSourceFieldValue = (mapping: PrefillMapping): string => {
        if (mapping.source.type === 'form' && mapping.source.formId) {
            return getFormFieldValue(mapping.source.formId, mapping.source.fieldId) ?? ''
        }
        return ''
    }

    const clearMapping = (fieldId: string) => {
        setMappings((prev: typeof mappings) => ({
            ...prev,
            [formId]: prev[formId]?.filter((m: PrefillMapping) => m.targetFieldId !== fieldId) ?? [],
        }))
    }

    const transitiveIds = getTransitiveDependencies(formId, normalizedGraph)
    const candidateForms = transitiveIds
        .map(id => normalizedGraph[id])
        .filter(Boolean)
    console.log('🔍 Candidates for', formId, candidateForms)

    const groupedCandidates = [
        {
            label: "Available Forms",
            forms: candidateForms
        },
        {
            label: 'Global Fields',
            forms: [normalizedGraph['global']],
        },

    ];
  const handleSelect = (sourceFormId: string, sourceFieldId: string) => {
        if (!modalFieldId) return
        const newMapping = {
            targetFieldId: modalFieldId,
            source: { type: 'form' as const, formId: sourceFormId, fieldId: sourceFieldId },
        }
        setMappings(prev => ({
            ...prev,
            [formId]: [...(prev[formId] ?? []), newMapping as PrefillMapping]
        }))
        setModalFieldId(null) // Close modal after selection
    }

    const handleClose = () => {
        setModalFieldId(null)
    }

    const updateTransform = (fieldId: string, transform: TransformType) => {
        setMappings(prev => ({
            ...prev,
            [formId]: (prev[formId] ?? []).map(m =>
                m.targetFieldId === fieldId ? { ...m, transform } : m
            )
        }))
    }

    // Single return statement with all JSX
    return (
        <div className="displayGrid">
           <div className="formCard">
            <h3>📥 Prefill Mappings for {form.name}</h3>
            {(!form.fields || form.fields.length === 0) && (
                <div style={{ color: 'orange' }}>
                    Warning: [form {form.id}] is missing fields
                </div>
            )}
            {(form.fields ?? []).map(field => {
                const mapping = getMapping(field.id)
                const sourceValue = mapping ? getSourceFieldValue(mapping) : undefined

                return (
                    <MappingRow
                        key={field.id}
                        field={field}
                        mapping={mapping}
                        sourceFieldValue={sourceValue}
                        onEdit={() => setModalFieldId(field.id)}
                        onClear={() => clearMapping(field.id)}
                        onTransformChange={updateTransform}
                    />
                )
            })}
            <SourcePickerModal
                isOpen={isOpen}
                onClose={handleClose}
                onSelect={handleSelect}
                groupedCandidates={groupedCandidates}
            />
          
          </div>
        </div>
    )
}
 
export default PrefillEditor