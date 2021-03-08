import { useState } from 'react';
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
} from 'carbon-components-react';

const ResultTable = ({ rowData, headerData }) => {
  const [hightLight, setHightLight] = useState(null);

  function clearString(str) {
    return str.replace(/[^\w]/g, '').toLowerCase().split(',').sort().join(', ');
  }
  const fnSearch = (e) => {
    const { value } = e.target;
    if (value) {
      const isMatch = rowData.find((item) =>
        clearString(item.name).includes(clearString(value))
      );
      if (!isMatch) {
        setHightLight(null);
        return;
      }
      setHightLight(isMatch);
    } else {
      setHightLight(null);
    }
  };

  return (
    <DataTable rows={rowData} headers={headerData}>
      {({ rows, headers, getHeaderProps, getTableProps }) => (
        <TableContainer title='DataTable'>
          <TableToolbar>
            <TableToolbarContent>
              {/* pass in `onInputChange` change here to make filtering work */}
              <TableToolbarSearch onChange={(e) => fnSearch(e)} />
            </TableToolbarContent>
          </TableToolbar>
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={
                    row.id === (hightLight && hightLight.id) ? 'highlight' : ''
                  }
                >
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DataTable>
  );
};
export default ResultTable;
