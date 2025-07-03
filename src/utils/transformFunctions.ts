export const calculateAge = (dob: string): string => {
  const birth = new Date(dob)
  if (isNaN(birth.getTime())) return '[Invalid date]'

  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()

  const hasHadBirthday =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate())

  if (!hasHadBirthday) age--

  return `${age}`
}

export const applyTransform = (value: string, transform?: string): string => {
  if (!value) return ''
  switch (transform) {
    case 'calculateAge':
      return calculateAge(value)
    case 'uppercase':
      return value.toUpperCase()
    default:
      return value
  }
}