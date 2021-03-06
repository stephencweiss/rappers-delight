import React, { useEffect, useState } from 'react'

export function EditableCell({
  cell: { value: initialValue },
  row: { index },
  column: { id },
  updateData,
}) {
  const [value, setValue] = useState(initialValue)
  const handleChange = event => {
    setValue(event.target.value)
  }
  const handleBlur = () =>
    updateData({ PAYLOAD: { rowIndex: index, columnId: id, value }, TYPE: 'UPDATE' })

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <input value={value} onChange={handleChange} onBlur={handleBlur} />
}
