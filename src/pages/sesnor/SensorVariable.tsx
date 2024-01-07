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
  Dialog,
} from '@mui/material';
// routes
import { useDispatch, useSelector } from 'src/redux/store';
import TableSkeleton from 'src/components/table-skeleton';
import { useSnackbar } from 'notistack';
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
import { deleteSensorById, getSensorDataByID } from './slice/action';
import Page403 from '../Page403';
import UserTableToolbar from './UserTableToolbar';
import { slice } from './slice';
import { getAllReportsData } from '../reports/slice/action';
import AddSensorVariableModel from './models/AddSensorVariableModel';
import AddVariableModel from './models/AddVariableModel';

const TABLE_HEAD = [
  { id: 'variable', label: 'Variable', align: 'left' },
  { id: 'value', label: 'Value', align: 'left' },
  { id: 'unit', label: 'Unit', align: 'left' },
  { id: 'range', label: 'Range', align: 'left' },
  { id: 'description', label: 'Description', align: 'left' },
  { id: 'Action', label: 'Action', align: 'left' },
];

const SETTINGS_TABLE_HEAD = [
  { id: 'group', label: 'Group', align: 'left' },
  { id: 'identifier', label: 'Identifier', align: 'left' },
  { id: 'value', label: 'Value', align: 'left' },
  { id: 'description', label: 'Description', align: 'left' },
  { id: 'location', label: 'Location', align: 'left' },
  { id: 'Action', label: 'Action', align: 'left' },
];

interface ISensorVariableListing {
  isUpdateRights: boolean;
  isDeleteRights: boolean;
  isCreateRights: boolean;
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

  const { enqueueSnackbar } = useSnackbar();

  const {
    isSensorLoading,
    sensorData,
    createSensorMsg,
    deleteSensorMsg,
    isCreateSensorError,
    isCreateSensorSuccess,
    isDeleteSensorError,
    isDeleteSensorSuccess,
    isSensorCreateLoading,
    error,
    isSensorUpdateLoading,
    sensorUpdateData,
  } = useSelector((state) => state?.sensor);

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

  const [updateData, setUpdateData] = useState({});

  const [editOpenDrawer, setEditOpenDrawer] = useState(false);

  const [editIndex, setEditIndex] = useState(-1);

  const [refresh, setRefresh] = useState(false);

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
  }, [dispatch, page, SensorVariableType, rowsPerPage, filterName, currentSelectedUser, refresh]);

  useEffect(() => {
    setPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SensorVariableType]);

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

  const handleCloseDrawer = (event: any, reason: any) => {
    if (reason && reason === 'backdropClick') {
      return;
    }
    setOpenDrawer(false);
  };

  const handleEditClick = (id: number, row: any) => {
    setEditOpenDrawer(true);
    setEditIndex(id);
    setUpdateData({
      userId: currentSelectedUser,
      index: rowsPerPage * page + (id + 1),
      sensorType: 'custom-setting',
      data: { ...row },
    });
  };

  const handleEditCloseDrawer = (event: any, reason: any) => {
    if (reason && reason === 'backdropClick') {
      return;
    }
    setEditOpenDrawer(false);
    setEditIndex(-1);
  };

  const handleDeleteRow = (data: any, index: number) => {
    dispatch(
      deleteSensorById({
        index: String(index),
        sensorType: SensorVariableType ? 'variable' : 'setting',
        userId: sensorData?.UserId,
      })
    );
  };

  useEffect(() => {
    if (isDeleteSensorSuccess) {
      enqueueSnackbar(deleteSensorMsg, {
        variant: 'success',
      });
      dispatch(slice.actions.resetDeleteSensorEventError());
      dispatch(
        getSensorDataByID({
          userId: currentSelectedUser,
          sensorType: SensorVariableType ? 'variable' : 'setting',
          searchValue: filterName,
          page: String(page + 1),
          limit: String(rowsPerPage),
        })
      );
    }
    if (isDeleteSensorError) {
      enqueueSnackbar(deleteSensorMsg, {
        variant: 'error',
      });
      dispatch(slice.actions.resetDeleteSensorEventError());
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteSensorSuccess, isDeleteSensorError]);

  useEffect(() => {
    if (isCreateSensorSuccess) {
      enqueueSnackbar(createSensorMsg, {
        variant: 'success',
      });
      dispatch(slice.actions.resetSensorCreatedRecords());
      dispatch(
        getSensorDataByID({
          userId: currentSelectedUser,
          sensorType: SensorVariableType ? 'variable' : 'setting',
          searchValue: filterName,
          page: String(page + 1),
          limit: String(rowsPerPage),
        })
      );
    }
    if (isCreateSensorError) {
      enqueueSnackbar(createSensorMsg, {
        variant: 'error',
      });
      dispatch(slice.actions.resetSensorCreatedRecords());
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateSensorSuccess, isCreateSensorError]);

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
            isCreateButton
            isCreateRights={isCreateRights}
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
                      <>
                        <SensorVariableTableRow
                          key={row.UserId}
                          row={row}
                          selected={selected.includes(row.UserId)}
                          SensorVariableType={SensorVariableType}
                          isDeleteRights={isDeleteRights}
                          isUpdateRights={isUpdateRights}
                          onEditRow={handleEditClick}
                          onDeleteRow={() => handleDeleteRow(row.UserId, index)}
                          index={index}
                        />
                        {index === editIndex && editOpenDrawer && (
                          <Dialog
                            open={editOpenDrawer}
                            onClose={handleEditCloseDrawer}
                            // aria-labelledby="parent-modal-title"
                            // aria-describedby="parent-modal-description"
                          >
                            {SensorVariableType ? (
                              <AddVariableModel
                                onClose={handleEditCloseDrawer}
                                currentUser={updateData}
                                id={rowsPerPage * page + (index + 1)}
                                setRefresh={setRefresh}
                                isEdit
                              />
                            ) : (
                              <AddSensorVariableModel
                                onClose={handleEditCloseDrawer}
                                currentUser={updateData}
                                id={rowsPerPage * page + (index + 1)}
                                setRefresh={setRefresh}
                                isEdit
                              />
                            )}
                          </Dialog>
                        )}
                      </>
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
      {openDrawer && (
        <Dialog
          open={openDrawer}
          onClose={handleCloseDrawer}
          // aria-labelledby="parent-modal-title"
          // aria-describedby="parent-modal-description"
        >
          {SensorVariableType ? (
            <AddVariableModel
              setRefresh={setRefresh}
              onClose={handleCloseDrawer}
              id={currentSelectedUser}
            />
          ) : (
            <AddSensorVariableModel
              setRefresh={setRefresh}
              onClose={handleCloseDrawer}
              id={currentSelectedUser}
            />
          )}
        </Dialog>
      )}
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

  const { isView, isUpdate, isCreate, isDelete } = accessControlCRUD[types.PG006] || {};

  return isView ? (
    <SensorVariableAccess
      isUpdateRights={isUpdate}
      SensorVariableType={SensorVariableType}
      isCreateRights={isCreate}
      isDeleteRights={isDelete}
    />
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
