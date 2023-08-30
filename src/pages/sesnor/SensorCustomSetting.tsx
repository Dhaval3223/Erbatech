/* eslint-disable import/no-extraneous-dependencies */
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
import { getSensorDataByID } from './slice/action';
import Page403 from '../Page403';
import UserTableToolbar from './UserTableToolbar';

const TABLE_HEAD = [
  { id: 'SensorCustomSettingDescription', label: 'SensorCustomSettingDescription', align: 'left' },
  { id: 'SensorCustomSettingParameter', label: 'SensorCustomSettingParameter', align: 'left' },
  { id: 'SensorCustomSettingRange', label: 'SensorCustomSettingRange', align: 'left' },
  { id: 'SensorCustomSettingUnit', label: 'SensorCustomSettingUnit', align: 'left' },
  { id: 'SensorCustomSettingValue', label: 'SensorCustomSettingValue', align: 'left' },
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
  } = useTable();

  const dispatch = useDispatch();

  const { isSensorLoading, sensorData } = useSelector((state) => state.sensor);

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
    dispatch(
      getSensorDataByID({
        userId: user?.UserId,
        sensorType: 'custome-setting',
        searchValue: '',
        page: '1',
        limit: '25',
      })
    );

    setLastLoadingTime(moment().format('YYYY-MM-DD HH:mm:ss'));

    const intervalId = setInterval(() => {
      dispatch(
        getSensorDataByID({
          userId: user?.UserId,
          sensorType: 'custome-setting',
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
  }, [dispatch]);

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
                    sensorData?.SensorCustomSettingData?.map((row: any) => (
                      <SensorCustomSettingsTableRows
                        key={row.UserId}
                        row={row}
                        selected={selected.includes(row.UserId)}
                        onSelectRow={() => onSelectRow(row.UserId)}
                        onEditRow={() => handleEditRow(row.UserId)}
                        onDeleteRow={() => handleDeleteRow(row.UserId)}
                        isDeleteRights={isDeleteRights}
                        isUpdateRights={isUpdateRights}
                      />
                    ))
                  )}
                  {/* <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, users.rows.length)}
                  /> */}
                  {!isSensorLoading && <TableNoData isNotFound={ROWS?.length === 0} />}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={ROWS?.length}
            page={page}
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
