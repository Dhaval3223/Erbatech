/* eslint-disable import/no-extraneous-dependencies */
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from 'src/auth/useAuthContext';
import * as types from 'src/pages/Roles/slice/action_type';
import { useSnackbar } from 'src/components/snackbar';
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
import { useDispatch, useSelector } from 'src/redux/store';
import TableSkeleton from 'src/components/table-skeleton';
import moment from 'moment';
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
import SensorCustomSettingsTableRows from './SensorCustomSettingsTableRows';
import { deleteSensorById, getSensorDataByID, updateSensorByID } from './slice/action';
import Page403 from '../Page403';
import UserTableToolbar from './UserTableToolbar';
import { slice } from './slice';
import AddParamsSettingsModel from './models/AddParamsSettingsModel';

const TABLE_HEAD = [
  // { id: 'data_types', label: 'Data Types', align: 'left' },
  { id: 'variables', label: 'Variables', align: 'left' },
  { id: 'Value', label: 'Value', align: 'left' },
  { id: 'Unit', label: 'Unit', align: 'left' },
  { id: 'Range', label: 'Range', align: 'left' },
  { id: 'Description', label: 'Description', align: 'left' },
  { id: 'Action', label: 'Action', align: 'left' },
];

const ROWS = [
  {
    parameter: 'Cycles to recal',
    unit: 'INT',
    range: '0-1000',
    description: 'No. Of cycles units',
    value: '80.00',
  },
];

interface IUserListing {
  isUpdateRights: boolean;
  isDeleteRights: boolean;
  isCreateRights: boolean;
}

// ----------------------------------------------------------------------

function SensorCustomSettingAccess({
  isUpdateRights,
  isDeleteRights,
  isCreateRights,
}: IUserListing) {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    onSelectRow,
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
    sensorUpdateData,
    isDeleteSensorError,
    isDeleteSensorSuccess,
    deleteSensorMsg,
    isCreateSensorSuccess,
    isCreateSensorError,
    createSensorMsg,
  } = useSelector((state) => state.sensor);

  const { themeStretch } = useSettingsContext();

  const { user } = useAuthContext();

  const [tableData, setTableData] = useState(_userListData);

  const [filterName, setFilterName] = useState('');

  const [currentSelectedUser, setCurrentSelectedUser] = useState(user?.UserId);

  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const [filterRole, setFilterRole] = useState('all');

  const [filterStatus, setFilterStatus] = useState('all');

  const [openDrawer, setOpenDrawer] = useState(false);
  const [editOpenDrawer, setEditOpenDrawer] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [editingId, setEditingId] = useState(-1);

  const [refresh, setRefresh] = useState(false);

  const [updateData, setUpdateData] = useState({
    userId: '',
    sensorType: 'custom-setting',
    sensorId: '',
    data: {
      SensorCustomSettingUnit: '',
      SensorCustomSettingRange: '',
      SensorCustomSettingValue: '',
      SensorCustomSettingMasterId: '',
      SensorCustomSettingParameter: '',
      SensorCustomSettingDescription: '',
    },
  });

  const [lastLoadingTime, setLastLoadingTime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));

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

  useEffect(() => {
    dispatch(slice.actions.startLoading());
    dispatch(
      getSensorDataByID({
        userId: currentSelectedUser,
        sensorType: 'custom-setting',
        searchValue: filterName,
        page: String(page + 1),
        limit: String(rowsPerPage),
      })
    );

    setLastLoadingTime(moment().format('YYYY-MM-DD HH:mm:ss'));

    const intervalId = setInterval(() => {
      dispatch(
        getSensorDataByID({
          userId: currentSelectedUser,
          sensorType: 'custom-setting',
          searchValue: '',
          page: '1',
          limit: '25',
        })
      );
      // Update last call time during each interval
      setLastLoadingTime(moment().format('YYYY-MM-DD HH:mm:ss'));
    }, 60000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, filterName, rowsPerPage, page, currentSelectedUser, refresh]);

  useEffect(() => {
    if (sensorUpdateData?.success) {
      enqueueSnackbar(sensorUpdateData?.message, {
        variant: 'success',
      });
      dispatch(slice.actions.resetSensorUpdatedRecords());
      dispatch(slice.actions.startLoading());
      dispatch(
        getSensorDataByID({
          userId: currentSelectedUser,
          sensorType: 'custom-setting',
          searchValue: filterName,
          page: String(page + 1),
          limit: String(rowsPerPage),
        })
      );
    }
    if (sensorUpdateData?.success === false) {
      enqueueSnackbar(sensorUpdateData?.message, {
        variant: 'error',
      });
      dispatch(slice.actions.resetSensorUpdatedRecords());
      dispatch(slice.actions.startLoading());
      dispatch(
        getSensorDataByID({
          userId: currentSelectedUser,
          sensorType: 'custom-setting',
          searchValue: filterName,
          page: String(page + 1),
          limit: String(rowsPerPage),
        })
      );
    }
    console.log(sensorUpdateData, 'sensorUpdateData');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sensorUpdateData]);

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterRole(event.target.value);
  };

  const handleDeleteRows = (selectedRows: string[]) => {
    const deleteRows = tableData.filter((row) => !selectedRows.includes(row.id));
  };

  const handleEditRow = (id: string) => {
    setEditOpenDrawer(true);
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

  const handleCloseDrawer = (event: any, reason: any) => {
    if (reason && reason === 'backdropClick') {
      return;
    }
    setOpenDrawer(false);
  };

  const handleEditCloseDrawer = (event: any, reason: any) => {
    if (reason && reason === 'backdropClick') {
      return;
    }
    setEditOpenDrawer(false);
    setEditIndex(-1);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCellDoubleClick = (id: number, row: any) => {
    console.log('row', row);
    setEditingId(id);
    setUpdateData({
      userId: currentSelectedUser,
      sensorType: 'custom-setting',
      sensorId: row?.sensorId || row?.SensorId,
      data: { ...row, userId: currentSelectedUser },
    });
  };

  const handleEditClick = (id: number, row: any) => {
    // setEditingId(id);
    setEditOpenDrawer(true);
    setEditIndex(id);
    setUpdateData({
      userId: currentSelectedUser,
      sensorType: 'custom-setting',
      sensorId: row?.SensorId || row?.sensorId,
      data: { ...row, userId: currentSelectedUser },
    });
  };
  const handleOnChangeUpdate = (e: any) => {
    if (e.target.value?.length > 10) return;
    setUpdateData({
      ...updateData,
      data: {
        ...updateData.data,
        SensorCustomSettingValue: e.target.value,
      },
    });
  };

  const handleBlurApiCall = () => {
    setEditingId(-1);
    console.log(updateData, 'updateData');
    if (updateData.data.SensorCustomSettingValue === '') return;
    dispatch(updateSensorByID({ ...updateData }));
  };

  const handleDeleteRow = (data: any, index: number) => {
    console.log('sensorData', sensorData);
    dispatch(
      deleteSensorById({
        sensorId: data?.SensorId,
        sensorType: 'custom-setting',
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
          sensorType: 'custom-setting',
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
          sensorType: 'custom-setting',
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
        <title> Sensor Custom Settings: List | Soblue</title>
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
            lastLoadingTime={lastLoadingTime}
            lastUpdateStatus
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
                  {isSensorLoading ? (
                    <TableSkeleton colums={6} />
                  ) : (
                    sensorData?.rows?.map((row: any, index: number) => (
                      <>
                        <SensorCustomSettingsTableRows
                          key={row.UserId}
                          row={row}
                          selected={selected.includes(row.UserId)}
                          onSelectRow={() => onSelectRow(row.UserId)}
                          onEditRow={handleEditClick}
                          onDeleteRow={() => handleDeleteRow(row, index)}
                          isDeleteRights={isDeleteRights}
                          isUpdateRights={isUpdateRights}
                          editingId={editingId}
                          handleBlur={handleBlurApiCall}
                          handleCellDoubleClick={handleCellDoubleClick}
                          index={index}
                          handleOnChangeUpdate={handleOnChangeUpdate}
                          updatedData={updateData}
                        />
                        {index === editIndex && editOpenDrawer && (
                          <Dialog
                            open={editOpenDrawer}
                            onClose={handleEditCloseDrawer}
                            // aria-labelledby="parent-modal-title"
                            // aria-describedby="parent-modal-description"
                          >
                            <AddParamsSettingsModel
                              onClose={handleEditCloseDrawer}
                              currentUser={updateData}
                              id={rowsPerPage * page + (index + 1)}
                              isEdit
                              setRefresh={setRefresh}
                            />
                          </Dialog>
                        )}
                      </>
                    ))
                  )}
                  {/* <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, users.rows.length)}
                  /> */}
                  {!isSensorLoading && <TableNoData isNotFound={sensorData?.count === 0} />}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={sensorData?.count}
            page={page}
            rowsPerPageOptions={[25, 50, 100]}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>

        {user?.UserTypeCode !== 'CU' && (
          <Typography variant="body2" mt="8px" textAlign="right" color="#637381" paragraph>
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
          <AddParamsSettingsModel
            setRefresh={setRefresh}
            onClose={handleCloseDrawer}
            id={currentSelectedUser}
          />
        </Dialog>
      )}
    </>
  );
}

export default function SensorCustomSetting() {
  const { accessControlCRUD } = useAuthContext();

  const {
    isView: isUserView,
    isCreate: isUserCreate,
    isDelete: isUserDelete,
    isUpdate: isUserUpdate,
  } = accessControlCRUD[types.PG008] || {};

  return isUserView ? (
    <SensorCustomSettingAccess
      isUpdateRights={isUserUpdate}
      isDeleteRights={isUserDelete}
      isCreateRights={isUserCreate}
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
