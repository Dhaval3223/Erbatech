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
import { getSensorDataByID, updateSensorByID } from './slice/action';
import Page403 from '../Page403';
import UserTableToolbar from './UserTableToolbar';
import { slice } from './slice';

const TABLE_HEAD = [
  { id: 'Description', label: 'Description', align: 'left' },
  { id: 'Value', label: 'Value', align: 'left' },
  { id: 'Parameter', label: 'Parameter', align: 'left' },
  { id: 'Range', label: 'Range', align: 'left' },
  { id: 'Unit', label: 'Unit', align: 'left' },
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

  const { isSensorLoading, sensorData, sensorUpdateData } = useSelector((state) => state.sensor);

  const { themeStretch } = useSettingsContext();

  const { user } = useAuthContext();

  const [tableData, setTableData] = useState(_userListData);

  const [filterName, setFilterName] = useState('');

  const [isEdit, setIsEdit] = useState(false);

  const [filterRole, setFilterRole] = useState('all');

  const [filterStatus, setFilterStatus] = useState('all');

  const [openDrawer, setOpenDrawer] = useState(false);

  const [EditopenDrawer, setEditOpenDrawer] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [editingId, setEditingId] = useState(-1);

  const [updateData, setUpdateData] = useState({
    userId: '',
    index: 1,
    sensorType: 'custom-setting',
    data: {
      SensorCustomSettingUnit: '',
      SensorCustomSettingRange: '',
      SensorCustomSettingValue: -1,
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
        userId: user?.UserId,
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
          userId: user?.UserId,
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
  }, [dispatch, filterName, rowsPerPage, page]);

  useEffect(() => {
    if (sensorUpdateData?.success) {
      enqueueSnackbar(sensorUpdateData?.message, {
        variant: 'success',
      });
      dispatch(slice.actions.resetSensorUpdatedRecords());
      dispatch(slice.actions.startLoading());
      dispatch(
        getSensorDataByID({
          userId: user?.UserId,
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
      dispatch(
        getSensorDataByID({
          userId: user?.UserId,
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

  const handleDeleteRow = (id: string) => {};

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

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCellDoubleClick = (id: number, row: any) => {
    setEditingId(id);
    setUpdateData({
      userId: user?.UserId,
      index: rowsPerPage * page + (id + 1),
      sensorType: 'custom-setting',
      data: { ...row },
    });
  };

  const handleOnChangeUpdate = (e: any) => {
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
    dispatch(updateSensorByID({ ...updateData }));
  };

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
            createButtonLable="+"
            handleCreateClick={handleOpenDrawer}
            isCreateButton
            isCreateRights={isCreateRights}
            lastLoadingTime={lastLoadingTime}
            lastUpdateStatus
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
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
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
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
                      <SensorCustomSettingsTableRows
                        key={row.UserId}
                        row={row}
                        selected={selected.includes(row.UserId)}
                        onSelectRow={() => onSelectRow(row.UserId)}
                        onEditRow={() => handleEditRow(row.UserId)}
                        onDeleteRow={() => handleDeleteRow(row.UserId)}
                        isDeleteRights={isDeleteRights}
                        isUpdateRights={isUpdateRights}
                        editingId={editingId}
                        handleBlur={handleBlurApiCall}
                        handleCellDoubleClick={handleCellDoubleClick}
                        index={index}
                        handleOnChangeUpdate={handleOnChangeUpdate}
                      />
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
      </Container>
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
