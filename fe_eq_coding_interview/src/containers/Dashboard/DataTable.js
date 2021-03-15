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
import 'carbon-components/css/carbon-components.min.css';
const ResultTable = ({ rowData, headerData }) => {
  const [highLight, sethighLight] = useState([]);

  const fnSearch = (e) => {
    const keyWord = e.target.value.toLowerCase().trim();

    if (keyWord === '') {
      sethighLight([]);
      return;
    }
    const isMatch = rowData.filter(
      (item) => item.name.toLowerCase().trim().indexOf(keyWord) !== -1
    );
    sethighLight(isMatch);
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
                    highLight && highLight.some((item) => item.id === row.id)
                      ? 'highlight'
                      : ''
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
