/* eslint-disable import/no-extraneous-dependencies */
import {
  Table,
  TableContainer,
  SxProps,
  TableBody,
  TableCell,
  TableRow,
  Container,
  Card,
  Stack,
  Typography,
  Button,
} from '@mui/material';
import React, { useState, useEffect, MouseEvent } from 'react';
import moment, { Moment } from 'moment';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import { Theme } from '@mui/material/styles';
import {
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable,
} from 'src/components/table';
import { useDispatch, useSelector } from 'src/redux/store';
import { useSettingsContext } from 'src/components/settings';
import { LoadingButton } from '@mui/lab';
import { DatePicker, Space } from 'antd';
import Iconify from 'src/components/iconify/Iconify';
import dayjs from 'dayjs';

import UsersDropDown from 'src/components/all-users-dropdown';
import { useAuthContext } from 'src/auth/useAuthContext';
import { downLoadReportCSV, generateCSV, getAllReportsData } from './slice/action';
import { slice } from './slice';

type Props = {
  columns: any[];
  rowCount?: number;
  rows: any[];
  tableType?: string;
  reportType: string;
};

function TableComponent({ columns, rowCount = 0, rows, tableType = '', reportType }: Props) {
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
  } = useTable({
    defaultRowsPerPage: 10,
  });

  const { isGenerateCsvLoading, isDownloadCSVSuccess } = useSelector((state) => state.report);

  const dispatch = useDispatch();

  const { RangePicker } = DatePicker;

  const { themeStretch } = useSettingsContext();

  const { user } = useAuthContext();

  const { users } = useSelector((state) => state.user);

  const [currentSelectedUser, setCurrentSelectedUser] = useState<any>(user?.UserId);

  const [dateRange, setDateRange] = useState<any>([dayjs().startOf('day'), dayjs()]);

  // useEffect(() => {
  //   if (!initialValuesSet) {
  //     const startOfDay = moment().startOf('day');
  //     const currentDateTime = moment();

  //     // Set the initial value
  //     const initialValues = [startOfDay, currentDateTime];

  //     setDateRange(initialValues);
  //     setInitialValuesSet(true);
  //   }
  // }, [dateRange, initialValuesSet]);

  useEffect(() => {
    dispatch(slice.actions.startGetReportsLoading());
    dispatch(
      getAllReportsData({
        topicName: users?.rows?.find((item: any) => item?.UserId === currentSelectedUser)
          ?.UserTopicName?.send,
        page: page + 1,
        limit: rowsPerPage,
        startDate: dateRange[0] ? dateRange[0] : '',
        endDate: dateRange[1] ? dateRange[1] : '',
        userId: currentSelectedUser,
      })
    );

    const intervalId = setInterval(() => {
      dispatch(
        getAllReportsData({
          topicName: users?.rows?.find((item: any) => item?.UserId === currentSelectedUser)
            ?.UserTopicName?.send,
          page: page + 1,
          limit: rowsPerPage,
          startDate: dateRange[0] ? dateRange[0] : '',
          endDate: dateRange[1] ? dateRange[1] : '',
          userId: currentSelectedUser,
        })
      );
      // Update last call time during each interval
      // setLastLoadingTime(moment().format('YYYY-MM-DD HH:mm:ss'));
    }, 60000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, rowsPerPage, page, dateRange, currentSelectedUser]);

  const handleDateChange = (dates: any) => {
    console.log(dates[0], dates[1]);
    setDateRange([dates?.[0], dates?.[1]]);
  };

  const onResetFilter = () => setDateRange([]);

  // useEffect(() => {
  //   if (isDownloadCSVSuccess) setDateRange([]);
  // }, [isDownloadCSVSuccess]);

  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <Card>
        <Stack
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          textAlign="center"
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          sx={{ px: 2.5, py: 3 }}
        >
          <Stack
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
            direction={{
              xs: 'column',
              sm: 'row',
            }}
          >
            {user?.UserTypeCode !== 'CU' && (
              <UsersDropDown
                size="small"
                currentSelectedUser={currentSelectedUser}
                setCurrentSelectedUser={setCurrentSelectedUser}
              />
            )}
            <RangePicker
              showTime={{ format: 'HH:mm:ss' }}
              format="YYYY-MM-DD HH:mm:ss"
              size="large"
              value={dateRange}
              onChange={handleDateChange}
              allowClear={false}
            />
            {dateRange?.length > 0 && (
              <Button
                color="error"
                sx={{ flexShrink: 0 }}
                onClick={onResetFilter}
                startIcon={<Iconify icon="eva:trash-2-outline" />}
              >
                Clear
              </Button>
            )}
          </Stack>
          <Stack
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
            direction={{
              xs: 'column',
              sm: 'row',
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              onClick={() =>
                dispatch(
                  // downLoadReportCSV({
                  //   startDate: dateRange[0] ? dateRange[0] : '',
                  //   endDate: dateRange[1] ? dateRange[1] : '',
                  //   type: 'all',
                  //   userId: currentSelectedUser,
                  //   topicName: users?.rows?.find(
                  //     (item: any) => item?.UserId === currentSelectedUser
                  //   )?.UserTopicName?.send,
                  // })
                  generateCSV({
                    topicName: users?.rows?.find(
                      (item: any) => item?.UserId === currentSelectedUser
                    )?.UserTopicName?.send,
                    startDate: dateRange[0] ? dateRange[0] : '',
                    endDate: dateRange[1] ? dateRange[1] : '',
                    userId: currentSelectedUser,
                    reportType,
                  })
                )
              }
              loading={isGenerateCsvLoading}
              disabled={dateRange?.length === 0}
            >
              Download CSV
            </LoadingButton>
          </Stack>
        </Stack>
        <TableContainer
          sx={{ position: 'relative', overflow: 'unset', maxHeight: '65vh', overflowY: 'scroll' }}
        >
          <Scrollbar>
            <Table size="small" sx={{ minWidth: 800 }}>
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
          rowsPerPageOptions={[10, 20, 30, 40, 50]}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
          dense={dense}
          onChangeDense={onChangeDense}
        />
      </Card>
    </Container>
  );
}

export default TableComponent;
