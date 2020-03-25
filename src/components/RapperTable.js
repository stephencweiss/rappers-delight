import React from 'react'
import { useTable, useFilters } from 'react-table'
import CssBaseline from '@material-ui/core/CssBaseline'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'


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
    <>
      <CssBaseline />
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => {
                  cell.column.Header === 'Active' && console.log({ cell })
                  cell.value = formatCellValue(cell)

                  return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </MaUTable>
    </>
  )
}
