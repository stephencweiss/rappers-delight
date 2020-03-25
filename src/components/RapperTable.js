import React from 'react'
import { useTable } from 'react-table'
import CssBaseline from '@material-ui/core/CssBaseline'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { EditableCell } from './EditableCell'

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

const defaultColumn = { Cell: EditableCell }
export function RapperTable({ columns, data, updateData, setData }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
    defaultColumn,
    updateData,
  })

  return (
    <>
      <CssBaseline />
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
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
