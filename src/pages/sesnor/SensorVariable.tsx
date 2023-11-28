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
import SensorVariableTableRow from './SensorVariableTableRow';
import { getSensorDataByID } from './slice/action';
import Page403 from '../Page403';
import UserTableToolbar from './UserTableToolbar';
import { slice } from './slice';
import { getAllReportsData } from '../reports/slice/action';

const TABLE_HEAD = [
  // { id: 'data_types', label: 'Data Types', align: 'left' },
  { id: 'variable', label: 'Variable', align: 'left' },
  { id: 'value', label: 'Value', align: 'left' },
  { id: 'unit', label: 'Unit', align: 'left' },
  { id: 'range', label: 'Range', align: 'left' },
  { id: 'description', label: 'Description', align: 'left' },
  // { id: 'action', label: 'Action', align: 'left' },
];

const SETTINGS_TABLE_HEAD = [
  // { id: 'data_types', label: 'Data Types', align: 'left' },
  { id: 'group', label: 'Group', align: 'left' },
  { id: 'identifier', label: 'Identifier', align: 'left' },
  { id: 'value', label: 'Value', align: 'left' },
  { id: 'description', label: 'Description', align: 'left' },
  { id: 'location', label: 'Location', align: 'left' },
];

const ROWS = [
  {
    id: 1,
    variables: 'Cycles counts',
    unit: 'INT',
    range: '0-9999',
    description: 'Cycle Counter',
    value: '1191',
  },
];

interface ISensorVariableListing {
  isUpdateRights: boolean;
  isDeleteRights?: boolean;
  isCreateRights?: boolean;
  SensorVariableType?: boolean;
}

// ----------------------------------------------------------------------

function SensorVariableAccess({
  isUpdateRights,
  isDeleteRights,
  isCreateRights,
  SensorVariableType,
}: ISensorVariableListing) {
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
    defaultRowsPerPage: 25,
  });

  const dispatch = useDispatch();

  const { isSensorLoading, sensorData } = useSelector((state) => state?.sensor);

  console.log('sensorData', sensorData);

  const { themeStretch } = useSettingsContext();

  const { user } = useAuthContext();
  const { users } = useSelector((state) => state.user);

  console.log('user', user);

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
      getSensorDataByID({
        userId: currentSelectedUser,
        sensorType: SensorVariableType ? 'variable' : 'setting',
        searchValue: filterName,
        page: String(page + 1),
        limit: String(rowsPerPage),
      })
    );
    dispatch(
      getAllReportsData({
        topicName: users?.rows?.find((item: any) => item?.UserId === currentSelectedUser)
          ?.UserTopicName?.send,
        page: 1,
        limit: 1,
        userId: currentSelectedUser,
      })
    );

    const intervalId = setInterval(() => {
      dispatch(
        getSensorDataByID({
          userId: currentSelectedUser,
          sensorType: SensorVariableType ? 'variable' : 'setting',
          searchValue: '',
          page: '1',
          limit: '25',
        })
      );
      // Update last call time during each interval
    }, 60000);
    dispatch(
      getAllReportsData({
        topicName: users?.rows?.find((item: any) => item?.UserId === currentSelectedUser)
          ?.UserTopicName?.send,
        page: 1,
        limit: 1,
        userId: currentSelectedUser,
      })
    );
    setLastLoadingTime(moment().format('YYYY-MM-DD HH:mm:ss'));

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page, SensorVariableType, rowsPerPage, filterName, currentSelectedUser]);

  useEffect(() => {
    setPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SensorVariableType]);

  // useEffect(() => {
  //   dispatch(slice.actions.startGetReportsLoading());
  //   dispatch(
  //     getAllReportsData({
  //       topicName: users?.rows?.find((item: any) => item?.UserId === currentSelectedUser)
          // ?.UserTopicName?.send,
  //       page: 1,
  //       limit: 1,
  //       userId: currentSelectedUser,
  //     })
  //   );

  //   const intervalId = setInterval(() => {
  //     dispatch(
  //       getAllReportsData({
  //         topicName: users?.rows?.find((item: any) => item?.UserId === currentSelectedUser)
          // ?.UserTopicName?.send,
  //         page: 1,
  //         limit: 1,
  //         userId: currentSelectedUser,
  //       })
  //     );
  //     setLastLoadingTime(moment().format('YYYY-MM-DD HH:mm:ss'));
  //     // Update last call time during each interval
  //   }, 60000);

  //   setLastLoadingTime(moment().format('YYYY-MM-DD HH:mm:ss'));

  //   // Clear the interval when the component unmounts
  //   return () => clearInterval(intervalId);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentSelectedUser]);

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
      <Helmet>
        <title> Sensor Variable: List | Soblue</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
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
            sx={{ position: 'relative', overflow: 'unset', maxHeight: '60vh', overflowY: 'scroll' }}
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
                  headLabel={SensorVariableType ? TABLE_HEAD : SETTINGS_TABLE_HEAD}
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
                  {isSensorLoading ? (
                    <TableSkeleton colums={6} />
                  ) : (
                    sensorData?.rows?.map((row: any, index: any) => (
                      <SensorVariableTableRow
                        key={row.UserId}
                        row={row}
                        selected={selected.includes(row.UserId)}
                        SensorVariableType={SensorVariableType}
                      />
                    ))
                  )}
                  {/* <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, users.rows.length)}
                  /> */}
                  {!isSensorLoading && <TableNoData isNotFound={sensorData?.count?.length === 0} />}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={sensorData?.count}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[25, 50, 100]}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
        {user?.UserTypeCode !== 'CU' && (
          <Typography variant="body2" mt="8px" textAlign="right" paragraph>
            {`Last data loaded time: ${lastLoadingTime}`}
          </Typography>
        )}
      </Container>
    </>
  );
}

export default function SensorVariable({
  SensorVariableType = false,
}: {
  SensorVariableType?: boolean;
}) {
  const { accessControlCRUD } = useAuthContext();

  console.log('accessControlCRUD', accessControlCRUD);

  const { isView, isUpdate } = accessControlCRUD[types.PG006] || {};

  return isView ? (
    <SensorVariableAccess isUpdateRights={isUpdate} SensorVariableType={SensorVariableType} />
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
