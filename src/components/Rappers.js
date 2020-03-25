import React, { useReducer, useEffect } from 'react'
import { useAsync } from 'react-use'
import { RapperTable } from './RapperTable'
import { SubmitRapper } from './SubmitRapper'

const columns = [
  { Header: 'Name', accessor: 'name' },
  { Header: 'Active', accessor: 'active' },
  { Header: 'Birthday', accessor: 'birthday' },
  { Header: 'Songs', accessor: 'songs' },
]

const reducer = (state, action) => {
  console.log({ state, action })
  switch (action.TYPE) {
    case 'LOAD':
      console.log(`loading!`, { action })
      return action.PAYLOAD

    case 'UPDATE':
      const { rowIndex, columnId, value } = action.PAYLOAD
      return state.map((row, index) => {
        console.log({ row, index, action })
        if (index === rowIndex) {
          const newValue = columnId === 'songs' ? value.split(', ') : value

          const newRowValue = {
            ...row,
            [columnId]: newValue,
          }
          fetch(`/api/rappers/${newRowValue.id}`, {
            method: 'PATCH',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(newRowValue),
          })

          return newRowValue
        }
        return row
      })
  }
}
const initialState = []
export function Rappers() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const rappers = useAsync(async () => await fetch('/api/rappers').then(res => res.json()), [])

  useEffect(() => {
    dispatch({ TYPE: 'LOAD', PAYLOAD: rappers.value })
  }, [rappers.value])

  return (
    <>
      {rappers.loading ? (
        <div>Loading...</div> // replace with a loader
      ) : state ? (
        <RapperTable columns={columns} data={state} updateData={dispatch} setData={dispatch} />
      ) : (
        <div>Error! Please try again! </div>
      )}
      <SubmitRapper />
    </>
  )
}
