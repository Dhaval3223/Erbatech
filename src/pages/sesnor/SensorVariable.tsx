import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import { useAuthContext } from 'src/auth/useAuthContext';
import * as types from 'src/pages/Roles/slice/action_type';
// @mui
import {
  Tab,
  Tabs,
  Card,
  Table,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  Radio,
  TableCell,
  TableRow,
  Dialog,
  MenuItem,
} from '@mui/material';
// routes
import MenuPopover from 'src/components/menu-popover/MenuPopover';
import { useDispatch, useSelector } from 'src/redux/store';
import TableSkeleton from 'src/components/table-skeleton';
import { PATH_DASHBOARD } from '../../routes/paths';
// @types
import { IUserAccountGeneral } from '../../@types/user';
// _mock_
import { _userListData } from '../../_mock/arrays';
// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import ConfirmDialog from '../../components/confirm-dialog';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '../../components/table';
// sections
import SensorVariableTableRow from './SensorVariableTableRow';
import { getSensorDataByID, updateSensorByID } from './slice/action';
import { slice } from './slice';
import Page403 from '../Page403';
import UserTableToolbar from './UserTableToolbar';

const TABLE_HEAD = [
  { id: 'variables', label: 'Variables', align: 'left' },
  { id: 'value', label: 'Value', align: 'left' },
  { id: 'unit', label: 'Unit', align: 'left' },
  { id: 'range', label: 'Range', align: 'left' },
  { id: 'description', label: 'Description', align: 'left' },
  // { id: 'action', label: 'Action', align: 'left' },
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
}

// ----------------------------------------------------------------------

function SensorVariableAccess({
  isUpdateRights,
  isDeleteRights,
  isCreateRights,
}: ISensorVariableListing) {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const dispatch = useDispatch();

  const { isSensorLoading, isSensorUpdateLoading, sensorData, sensorUpdateData } = useSelector(
    (state) => state?.sensor
  );

  console.log('sensorData', sensorData);

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

  useEffect(() => {
    dispatch(getSensorDataByID({
      UserId: user?.UserId,
      SensorType: 'variable'
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

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
                    ROWS.map((row: any, index: any) => (
                      <SensorVariableTableRow
                        key={row.UserId}
                        row={row}
                        selected={selected.includes(row.UserId)}
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

export default function SensorVariable() {
  const { accessControlCRUD } = useAuthContext();

  console.log('accessControlCRUD', accessControlCRUD);

  const { isView, isUpdate } = accessControlCRUD[types.PG006] || {};

  return isView ? <SensorVariableAccess isUpdateRights={isUpdate} /> : <Page403 />;
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
