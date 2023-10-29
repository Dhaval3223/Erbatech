import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import { useAuthContext } from 'src/auth/useAuthContext';
import * as types from 'src/pages/Roles/slice/action_type';
// @mui
import {
  Card,
  Table,
  Tooltip,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  Typography,
} from '@mui/material';
// routes
import { useDispatch, useSelector } from 'src/redux/store';
import TableSkeleton from 'src/components/table-skeleton';
// @types
import { IUserAccountGeneral } from '../../@types/user';
// _mock_
import { _userListData } from '../../_mock/arrays';
// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import { useSettingsContext } from '../../components/settings';
import {
  useTable,
  getComparator,
  TableNoData,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '../../components/table';
// sections
import { getAlarmData2 } from './slice/action';
import Page403 from '../Page403';
import UserTableToolbar from './UserTableToolbar';
import { slice } from './slice';
import { getAllReportsData } from '../reports/slice/action';
import AlarmRows from './AlarmRows';

const TABLE_HEAD = [
  { id: 'label', label: 'Label', align: 'left' },
  { id: 'description', label: 'Description', align: 'left' },
  { id: 'date', label: 'Date', align: 'left' },
  { id: 'acknowledgeTime', label: 'Acknowledge Time', align: 'left' },
];

const TABLE_HEAD_1 = [
  { id: 'label', label: 'Label', align: 'left' },
  { id: 'description', label: 'Description', align: 'left' },
  { id: 'date', label: 'Date', align: 'left' },
  { id: 'acknowledge', label: 'Acknowledge', align: 'left' },
  { id: 'Acknowledge_time', label: 'Acknowledge Time', align: 'left' },
];

interface IAlarmListing {
  isUpdateRights: boolean;
  isDeleteRights?: boolean;
  isCreateRights?: boolean;
  refreshAPI?: boolean;
}

// ----------------------------------------------------------------------

function AlarmAccess({
  isUpdateRights,
  isDeleteRights,
  isCreateRights,
  refreshAPI,
}: IAlarmListing) {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    selected,
    onSelectAllRows,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({
    defaultRowsPerPage: 5,
  });

  const dispatch = useDispatch();

  const { isSensorLoading, sensorData } = useSelector((state) => state?.sensor);
  const {
    alarmData2Loading,
    alarmData2,
    checkAlarmData,
    checkAlarmDataLoading,
    alarmAcknowledgementDataLoading,
    alarmAcknowledgementData,
  } = useSelector((state) => state?.alarm);

  const { themeStretch } = useSettingsContext();

  const { user } = useAuthContext();

  const [tableData, setTableData] = useState(_userListData);

  const [filterName, setFilterName] = useState('');

  const [isEdit, setIsEdit] = useState(false);

  const [filterRole, setFilterRole] = useState('all');

  const [currentSelectedUser, setCurrentSelectedUser] = useState(user?.UserId);

  const [filterStatus, setFilterStatus] = useState('all');

  const [openDrawer, setOpenDrawer] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [lastLoadingTime, setLastLoadingTime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));

  useEffect(() => {
    dispatch(slice.actions.startLoading());
    dispatch(
      getAlarmData2({
        userId: currentSelectedUser,
        page: page + 1,
        limit: rowsPerPage,
        status: false,
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentSelectedUser, page, currentSelectedUser, rowsPerPage, refreshAPI]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
  });

  const isFiltered = filterName !== '' || filterRole !== 'all' || filterStatus !== 'all';

  useEffect(() => {
    setOpenDrawer(false);
  }, []);

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterRole(event.target.value);
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterRole('all');
    setFilterStatus('all');
  };

  const handleOpenDrawer = () => {
    setIsEdit(false);
    setOpenDrawer(true);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };
  return (
    <>
      {/* <Helmet>
        <title> Sensor Variable: List | Soblue</title>
      </Helmet> */}

      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ my: 2 }}>
        <Card>
          <UserTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            filterRole={filterRole}
            optionsRole={[]}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            onResetFilter={handleResetFilter}
            // createButtonLable="+"
            handleCreateClick={handleOpenDrawer}
            // isCreateButton
            lastUpdateStatus
            lastLoadingTime={lastLoadingTime}
            setCurrentSelectedUser={setCurrentSelectedUser}
            currentSelectedUser={currentSelectedUser}
          />

          <TableContainer
            sx={{
              position: 'relative',
              overflow: 'unset',
              maxHeight: '350px',
              overflowY: 'scroll',
            }}
          >
            <TableSelectedAction
              dense={dense}
              numSelected={selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={handleOpenConfirm}>
                    <Iconify icon="eva:trash-2-outline" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size="small" sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={dataFiltered.length}
                  numSelected={selected.length}
                  // onSort={onSort}
                  /*  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  } */
                />
                <TableBody>
                  {alarmData2Loading ? (
                    <TableSkeleton colums={4} />
                  ) : (
                    alarmData2?.rows?.map((row: any, index: any) => (
                      <AlarmRows
                        key={row.TransactionAlarmId}
                        row={row}
                        selected={selected.includes(row.TransactionAlarmId)}
                        table2
                      />
                    ))
                  )}
                  {/* <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, users.rows.length)}
                  /> */}
                  {!alarmData2Loading && <TableNoData isNotFound={alarmData2?.count === 0} />}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={alarmData2?.count}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 20]}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
        {/* {user?.UserTypeCode !== 'CU' && (
          <Typography variant="body2" mt="8px" textAlign="right" paragraph>
            {`Last data loaded time: ${lastLoadingTime}`}
          </Typography>
        )} */}
      </Container>
    </>
  );
}

export default function Alarm(props: any) {
  const { accessControlCRUD } = useAuthContext();

  const { isView, isUpdate } = accessControlCRUD[types.PG006] || {};

  return isView ? (
    <AlarmAccess isUpdateRights={isUpdate} refreshAPI={props?.refreshAPI} />
  ) : (
    <Page403 />
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filterName,
  filterRole,
}: {
  inputData: IUserAccountGeneral[];
  comparator: (a: any, b: any) => number;
  filterName: string;
  filterRole: string;
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  /*  if (filterStatus !== 'all') {
    inputData = inputData.filter((user) => user.status === filterStatus);
  } */

  if (filterRole !== 'all') {
    inputData = inputData.filter((user) => user.role === filterRole);
  }

  return inputData;
}
