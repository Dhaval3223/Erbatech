import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
  Checkbox,
  MenuItem,
  TextField,
  Stack,
} from '@mui/material';
// routes
import UserRolesDropDown from 'src/components/userRolesDropdown';
import TableSkeleton from 'src/components/table-skeleton';
import { useDispatch, useSelector } from 'src/redux/store';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'src/components/snackbar/index';

import { useAuthContext } from 'src/auth/useAuthContext';
import localStorageAvailable from 'src/utils/localStorageAvailable';
import { PATH_DASHBOARD } from '../../routes/paths';
// @types
import { IUserAccountGeneral } from '../../@types/user';
// _mock_
import { _userList, _userListData } from '../../_mock/arrays';
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
import { UserTableToolbar, UserTableRow } from '../../sections/@dashboard/user/list';
import { getAllMenuByRoleId, updateMenuById } from './slice/action';
import { getAllMenus } from '../Menu/slice/action';
import { slice } from './slice';
import Page403 from '../Page403';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['all', 'active', 'banned'];

const ROLE_OPTIONS = [
  'all',
  'ux designer',
  'full stack designer',
  'backend developer',
  'project manager',
  'leader',
  'ui designer',
  'ui/ux designer',
  'front end developer',
  'full stack developer',
];
const UserList = [
  'all',
  'Jayvion Simon',
  'Lucian Obrien',
  'Deja Brady',
  'Harrison Stein',
  'Reece Chung',
  'Lainey Davidson',
  'Cristopher Cardenas',
  'Melanie Noble',
  'Chase Day',
  'Shawn Manning',
];

const TABLE_HEAD = [
  { id: 'module', label: 'Module', align: 'left' },
  { id: 'create', label: 'Create', align: 'left' },
  { id: 'view', label: 'View', align: 'left' },
  { id: 'edit', label: 'Edit', align: 'left' },
  { id: 'delete', label: 'Delete', align: 'left' },
];

// ----------------------------------------------------------------------

export default function UserListing() {
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

  const storageAvailable = localStorageAvailable();

  const user = storageAvailable ? JSON.parse(localStorage.getItem('user') || '{}') : '';

  const { themeStretch } = useSettingsContext();

  const { initialize } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const {
    accessControlData,
    isUpdateRoleLoading,
    isAccessControlLoading,
    updateRoleDataSuccess,
    updateRoleDataError,
    updateRoleDataMsg,
  } = useSelector((state) => state.accesControl);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [tableData, setTableData] = useState(_userListData);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('');

  const [openConfirm, setOpenConfirm] = useState(false);

  const [filterStatus, setFilterStatus] = useState('all');

  const [allMenusData, setAllMenusData] = useState<any[]>([]);

  const [programCodesArr, setProgramCodesArr] = useState<any[]>([]);

  useEffect(() => {
    dispatch(getAllMenus());
  }, [dispatch]);

  useEffect(() => {
    if (filterRole !== '' && filterRole !== undefined) dispatch(getAllMenuByRoleId(filterRole));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterRole]);

  // useEffect(() => {
  //   const tempArr: any[] = [];
  //   const program = accessControlData?.map(item => {
  //     const { ProgramCode, ProgramPrivilege } = item?.Program || {};
  //     tempArr.push(ProgramCode);
  //     return {
  //       ProgramCode,
  //       RolePrivilege: ProgramPrivilege,
  //     }
  //   });
  //   setCheckedMenus(program);
  //   setProgramCodesArr(tempArr);
  // }, [accessControlData])

  useEffect(() => {
    const tempData = accessControlData?.map(
      (item: {
        ProgramCode: string;
        ProgramName: string;
        RolePrivilege: string;
        ProgramParentCode: any;
        ProgramOrder: number;
      }) => {
        const { ProgramName, ProgramCode, RolePrivilege } = item || {};
        return {
          ProgramCode,
          RolePrivilege,
          ProgramName,
        };
      }
    );
    setAllMenusData(tempData);
    console.log('accessControlData', accessControlData);
    console.log('accessControlData', tempData);
  }, [accessControlData]);

  useEffect(() => {
    if (updateRoleDataSuccess) {
      enqueueSnackbar(updateRoleDataMsg, {
        variant: 'success',
      });
      dispatch(slice.actions.resetUpdatRoleData());
      initialize();
    }
    if (updateRoleDataError) {
      enqueueSnackbar(updateRoleDataMsg, {
        variant: 'error',
      });
      dispatch(slice.actions.resetUpdatRoleData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateRoleDataError, updateRoleDataSuccess]);

  const dataFiltered = [
    {
      module: 'Dashboard',
      create: true,
      view: false,
      edit: true,
      delete: false,
    },
    {
      module: 'Role',
      create: false,
      view: true,
      edit: false,
      delete: true,
    },
    {
      module: 'User',
      create: true,
      view: false,
      edit: true,
      delete: false,
    },
    {
      module: 'Access Control',
      create: false,
      view: true,
      edit: false,
      delete: true,
    },
  ];

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterName !== '' || filterRole !== 'all' || filterStatus !== 'all';

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered.length && !!filterStatus);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterStatus = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
    setPage(0);
    setFilterStatus(newValue);
  };

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterRole(event.target.value);
  };

  const handleDeleteRow = (id: string) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleDeleteRows = (selectedRows: string[]) => {
    const deleteRows = tableData.filter((row) => !selectedRows.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);

    if (page > 0) {
      if (selectedRows.length === dataInPage.length) {
        setPage(page - 1);
      } else if (selectedRows.length === dataFiltered.length) {
        setPage(0);
      } else if (selectedRows.length > dataInPage.length) {
        const newPage = Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }
  };

  const handleEditRow = (id: string) => {
    navigate(PATH_DASHBOARD.user.edit(paramCase(id)));
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterRole('all');
    setFilterStatus('all');
  };

  const handleUpdateRole = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.checked) {
      const tempArr = [...allMenusData];
      tempArr[index].RolePrivilege += e.target.value;
      setAllMenusData([...tempArr]);
    } else {
      const tempArr = [...allMenusData];
      const regex = new RegExp(e.target.value, 'g');
      tempArr[index].RolePrivilege = tempArr[index].RolePrivilege.replace(regex, '');
      setAllMenusData([...tempArr]);
    }
  };

  const handleSave = () => {
    console.log(
      'allMenusData',
      allMenusData?.map((item) => {
        const { ProgramCode, ProgramPrivilege } = item || {};
        return {
          ProgramCode,
          RolePrivilege: ProgramPrivilege,
        };
      })
    );
    const tempData: {
      ProgramCode: string;
      RolePrivilege: string;
    }[] = allMenusData?.map((item) => {
      const { ProgramCode, RolePrivilege } = item || {};
      return {
        ProgramCode,
        RolePrivilege,
      };
    });
    console.log(tempData);
    dispatch(
      updateMenuById({
        RoleId: filterRole,
        data: tempData,
      })
    );
  };

  const handleChacked = (ProgramCode: string, operation: string) => {};

  return user?.UserTypeCode === 'SA' ? (
    <>
      <Helmet>
        <title> Access control | Soblue</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Card>
          <Stack
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
            direction={{
              xs: 'column',
              sm: 'row',
            }}
            sx={{ px: 2.5, py: 3 }}
          >
            <UserRolesDropDown
              onFilterRole={handleFilterRole}
              setFilterRole={setFilterRole}
              filterRole={filterRole}
              addAllRole={false}
            />
            <LoadingButton
              variant="contained"
              sx={{ flexShrink: 0 }}
              onClick={handleSave}
              loading={isUpdateRoleLoading}
              // startIcon={<Iconify icon="eva:trash-2-outline" />}
            >
              Save Changes
            </LoadingButton>
          </Stack>
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
                  {isAccessControlLoading ? (
                    <TableSkeleton colums={5} />
                  ) : (
                    allMenusData?.map((row, i) => (
                      <TableRow hover>
                        <TableCell>{row.ProgramName}</TableCell>
                        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                          <Checkbox
                            value="A"
                            checked={allMenusData[i].RolePrivilege.includes('A')}
                            onChange={(e) => handleUpdateRole(e, i)}
                          />
                        </TableCell>
                        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                          <Checkbox
                            value="V"
                            checked={allMenusData[i].RolePrivilege.includes('V')}
                            onChange={(e) => handleUpdateRole(e, i)}
                          />
                        </TableCell>
                        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                          <Checkbox
                            value="M"
                            checked={allMenusData[i].RolePrivilege.includes('M')}
                            onChange={(e) => handleUpdateRole(e, i)}
                          />
                        </TableCell>
                        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                          <Checkbox
                            value="D"
                            checked={allMenusData[i].RolePrivilege.includes('D')}
                            onChange={(e) => handleUpdateRole(e, i)}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                  {/* <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  /> */}

                  <TableNoData isNotFound={allMenusData?.length === 0 && !isAccessControlLoading} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          {/* <TablePaginationCustom
            count={dataFiltered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            
            dense={dense}
            onChangeDense={onChangeDense}
          /> */}
        </Card>
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows(selected);
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  ) : <Page403 />;
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filterName,
  filterStatus,
  filterRole,
}: {
  inputData: IUserAccountGeneral[];
  comparator: (a: any, b: any) => number;
  filterName: string;
  filterStatus: string;
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
