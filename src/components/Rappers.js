import React, { useState } from 'react'
import { useAsync } from 'react-use'
import { RapperTable } from './RapperTable'
import { SubmitRapper } from './SubmitRapper'
// import { updateData } from './EditableCell'
const columns = [
  { Header: 'Name', accessor: 'name' },
  { Header: 'Active', accessor: 'active' },
  { Header: 'Birthday', accessor: 'birthday' },
  { Header: 'Songs', accessor: 'songs' },
]

export function Rappers() {
  const [data, setData] = useState()
  const rappers = useAsync(async () => await fetch('/api/rappers').then(res => res.json()), [])

  const updateData = (rowIndex, columnId, value) => {
    setData(data =>
      data.map((row, index) => {
        if (index === rowIndex) {
          console.log(data[rowIndex])
          return {
            ...data[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
    fetch(`/api/rappers/${data[rowIndex].id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data[rowIndex]),
    })
  }

  return (
    <>
      {rappers.loading ? (
        <div>Loading...</div> // replace with a loader
      ) : rappers.value ? (
        <RapperTable
          columns={columns}
          data={data || rappers.value}
          updateData={updateData}
          setData={setData}
        />
      ) : (
        <div>
          Error!
          <pre>
            <code>{JSON.stringify(rappers.error, null, 4)}</code>
          </pre>
        </div>
      ) // replace with a true error handler}
      }
      <SubmitRapper />
    </>
  )
}
