import React, { useEffect, useState } from 'react'
import { useAsync } from 'react-use'
import { RapperTable } from './RapperTable'

const columns = [
  {
    Header: `Rapper's Delight`,
    columns: [
      { Header: 'Name', accessor: 'name' },
      { Header: 'active', accessor: 'active' },
      { Header: 'Birthday', accessor: 'birthday' },
      { Header: 'songs', accessor: 'songs' },
    ],
  },
]

export function Rappers() {
  const rappers = useAsync(async () => await fetch('/api/rappers').then(res => res.json()), [])
    console.log({rappers})
  return rappers.loading ? (
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
  ) // replace with a true error handler
}
