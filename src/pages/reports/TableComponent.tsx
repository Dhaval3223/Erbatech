import { Table, TableContainer, SxProps, TableBody, TableCell, TableRow } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import { Theme } from '@mui/material/styles';
import {
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable,
} from 'src/components/table';

type Props = {
  columns: any[];
  rowCount?: number;
  rows: any[];
};

export default function TableComponent({ columns, rowCount, rows }: Props) {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  return (
    <>
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Scrollbar>
          <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
            <TableHeadCustom
              order={order}
              orderBy={orderBy}
              headLabel={columns}
              rowCount={0}
              numSelected={selected.length}
            />
            <TableBody>
              { rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((item) => (
                <TableRow>
                  {Object?.keys(item)?.map((key) => (
                    <TableCell headers={key}>{item[key]}</TableCell>
                  ))}
                </TableRow>
              ))}

              <TableNoData isNotFound={rows?.length === 0} />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
      <TablePaginationCustom
        count={rows?.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
        //
        dense={dense}
        onChangeDense={onChangeDense}
      />
    </>
  );
}
