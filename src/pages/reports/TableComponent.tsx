import { Table, TableContainer, SxProps, TableBody, TableCell, TableRow } from '@mui/material';
import React, { useState, useEffect, MouseEvent } from 'react';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import { Theme } from '@mui/material/styles';
import {
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable,
} from 'src/components/table';
import { useDispatch, useSelector } from 'src/redux/store';
import { getAllReportsData } from './slice/action';

type Props = {
  columns: any[];
  rowCount?: number;
  rows: any[];
  tableType?:string;
};

export default function TableComponent({ columns, rowCount = 0, rows,tableType = '' }: Props) {
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getAllReportsData({
        TransactionTopicName: tableType,
        page: page + 1,
        limit: rowsPerPage,
      })
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, rowsPerPage, page]);
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
              {rows?.map((item) => (
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
        count={rowCount}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
        
        dense={dense}
        onChangeDense={onChangeDense}
      />
    </>
  );
}
