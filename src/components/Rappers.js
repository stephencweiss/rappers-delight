import React from 'react'
import { useAsync } from 'react-use'
import { RapperTable } from './RapperTable'
import { SubmitRapper } from './SubmitRapper'

const columns = [
  { Header: 'Name', accessor: 'name' },
  { Header: 'Active', accessor: 'active' },
  { Header: 'Birthday', accessor: 'birthday' },
  { Header: 'Songs', accessor: 'songs' },
]

export function Rappers() {
  const rappers = useAsync(async () => await fetch('/api/rappers').then(res => res.json()), [])
  return (
    <>
      {rappers.loading ? (
        <div>Loading...</div> // replace with a loader
        ) : rappers.value ? (
          <RapperTable columns={columns} data={rappers.value} />
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
