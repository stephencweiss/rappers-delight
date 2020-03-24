import React from 'react'
import styled from 'styled-components'
import { useTable, useFilters } from 'react-table'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :nth-child(even) {
        background: rgba(0, 0, 0, 0.1);
      }
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th {
        background:papayawhip;
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

function formatCellValue(cell) {
  let value
  if (cell.column.Header === 'Active') {
    value = String(cell.value)
  } else if (cell.column.Header === 'Songs') {
    value = cell.value.join(', ')
  } else if (cell.column.Header === 'Birthday') {
    value = new Date(cell.value).toLocaleDateString()
  } else {
    value = cell.value
  }
  return value
}

function DefaultColumnFilter({ column: { filterValue, preFilteredRows, setFilter } }) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={event => setFilter(event.target.value || undefined)}
      placeholder={`Search ${count} records`}
    />
  )
}

export function RapperTable({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const defaultColumn = React.useMemo(() => ({ Filter: DefaultColumnFilter }), [])
  console.log({ columns, data })
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters
  )

  return (
    <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  cell.column.Header === 'Active' && console.log({ cell })
                  cell.value = formatCellValue(cell)

                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </Styles>
  )
}
